const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const admin = require("firebase-admin");
const serviceAccount = require("./FbKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


function generateTrackingId() {
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timePart = Date.now().toString(36).toUpperCase();
  return `ZAP-${timePart}-${randomPart}`;
}

// console.log(generateTrackingId());

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE);
app.use(cors())
app.use(express.json())

const verifyFbToken = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send({ messege: "Unauthorize Access" })
  }

  try {
    const idToken = token.split(' ')[1]
    const decoded = await admin.auth().verifyIdToken(idToken)
    // console.log(decoded);
    req.decodedEmail = decoded.email

    next()
  }
  catch {
    return res.status(401).send({ messege: "Unauthorize Access" })
  }
}

app.get('/', (req, res) => {
  res.send('ZapShift server is running....')
})

const uri = process.env.URI
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db('zap_shift')
    const parcels = db.collection('parcels')
    const paymentCollections = db.collection('payment')
    const usersCollections = db.collection('users')
    const ridersCollections = db.collection('riders')
    const trackingCollections = db.collection('trackings')

    const verifyAdmin = async (req, res, next) => {
      const email = req.decodedEmail
      const query = { email }
      const user = await usersCollections.findOne(query)

      if (!user || user.role !== 'Admin') {
        return res.status(403).send({ messege: 'Forbidden Access' })
      }

      next()
    }

    const logTracking = async (trackingId, status) => {
      const log = {
        trackingId,
        status,
        details: status.split('-').join(' '),
        creadtedAt: new Date()
      }

      const result = await trackingCollections.insertOne(log)
      return result
    }

    app.post("/parcels", async (req, res) => {
      try {
        const parcel = req.body
        const result = await parcels.insertOne(parcel)
        res.send(result)
      }
      catch {
        res.status(400).json({ error: "Internal server error" })
      }
    })

    app.get('/parcels/rider', async (req, res) => {
      const { riderEmail, deliveryStatus } = req.query
      const query = {}

      if (riderEmail) {
        query.riderEmail = riderEmail
      }

      if (deliveryStatus !== 'Parcel-Delivered') {
        query.deliveryStatus = { $nin: ['Parcel-Delivered'] }
      }
      else {
        query.deliveryStatus = deliveryStatus
      }

      const cursor = parcels.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/parcels', async (req, res) => {
      try {
        const query = {}
        const { email, deliveryStatus } = req.query
        // console.log(email);

        if (email) {
          query.senderEmail = email
        }

        if (deliveryStatus) {
          query.deliveryStatus = deliveryStatus
        }

        const cursor = parcels.find(query).sort({ createdAt: -1 })
        const result = await cursor.toArray()
        res.send(result)
      }
      catch {
        res.status(400).json({ error: "Internal server error" })
      }
    })

    app.delete('/parcels/:id', async (req, res) => {
      try {
        const { id } = req.params
        const result = await parcels.deleteOne({ _id: new ObjectId(id) })
        res.send(result)
      }
      catch {
        res.status(400).json({ error: 'Internal server error' })
      }
    })

    app.patch('/parcels/:id', async (req, res) => {
      const { riderId, riderName, riderEmail, trackingId } = req.body
      const { id } = req.params
      const query = { _id: new ObjectId(id) }

      const updatedDoc = {
        $set: {
          deliveryStatus: 'Driver-Assigned',
          riderId: riderId,
          riderName: riderName,
          riderEmail: riderEmail
        }
      }

      logTracking(trackingId, 'Driver-Assigned')

      const result = await parcels.updateOne(query, updatedDoc)

      const riderQuery = { _id: new ObjectId(riderId) }
      const riderDoc = {
        $set: {
          workStatus: 'Going for pickup'
        }
      }
      const riderResult = await ridersCollections.updateOne(riderQuery, riderDoc)
      res.send(riderResult)
    })

    app.patch('/parcels/:id/status', async (req, res) => {
      const { deliveryStatus, riderId, trackingId } = req.body
      // console.log(deliveryStatus);
      const query = { _id: new ObjectId(req.params.id) }
      const updatedDoc = {
        $set: {
          deliveryStatus: deliveryStatus
        }
      }

      if (deliveryStatus === 'Parcel-Delivered') {
        const riderQuery = { _id: new ObjectId(riderId) }
        const riderDoc = {
          $set: {
            workStatus: 'Available'
          }
        }
        const riderResult = await ridersCollections.updateOne(riderQuery, riderDoc)
      }

      const result = await parcels.updateOne(query, updatedDoc)
      logTracking(trackingId, deliveryStatus)
      res.send(result)
    })

    // Payment
    app.post('/create-checkout-session', async (req, res) => {
      const paymentInfo = req.body;
      // console.log(paymentInfo);
      const amount = parseInt(paymentInfo.price) * 100

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'USD',
              unit_amount: amount,
              product_data: {
                name: `Please pay for ${paymentInfo.parcelName}`,
              }
            },
            quantity: 1,
          },
        ],
        customer_email: paymentInfo.senderEmail,
        mode: 'payment',
        metadata: {
          parcelId: paymentInfo.parcelId,
          parcelName: paymentInfo.parcelName
        },
        success_url: `${process.env.SITE_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SITE_URL}/dashboard/payment-cancel`
      });

      // console.log(session);
      res.send({ url: session.url })
    })

    app.patch('/payment-success', async (req, res) => {
      const { session_id } = req.query
      // console.log(session_id);
      const session = await stripe.checkout.sessions.retrieve(session_id);
      // console.log(session);

      const transcationId = session.payment_intent
      const query = { transcationId: transcationId }
      const paymentExist = await paymentCollections.findOne(query)

      if (paymentExist) {
        return res.send({ messege: "Already exist" })
      }

      if (session.payment_status === 'paid') {
        const id = session.metadata.parcelId
        const trackingId = generateTrackingId()
        const query = { _id: new ObjectId(id) }
        const update = {
          $set: {
            status: 'Paid',
            deliveryStatus: 'Pending-Pickup',
            trackingId: trackingId
          }
        }

        const result = await parcels.updateOne(query, update)

        const paymentDet = {
          amount: session.amount_total / 100,
          customerEmail: session.customer_email,
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transcationId: session.payment_intent,
          paymentStatus: session.payment_status,
          paidAt: new Date(),
        }
        // console.log(paymentDet);
        if (session.payment_status === 'paid') {
          const payment = await paymentCollections.insertOne(paymentDet)

          logTracking(trackingId, 'Pending-Pickup')

          res.send(payment, result)
        }

        // res.send(result)
      }

      res.send({ success: false })
    })

    app.get('/payment-history', verifyFbToken, async (req, res) => {
      const query = {}
      const { email } = req.query

      // console.log(req.decodedEmail);

      if (email) {
        if (email !== req.decodedEmail) {
          return res.status(403).send({ messege: 'Forbidden access' })
        }
        query.customerEmail = email
      }

      const cursor = paymentCollections.find(query).sort({ paidAt: -1 })
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/users', async (req, res) => {
      const users = req.body
      users.role = 'User'
      users.createdAt = new Date()

      const email = users.email
      const userExist = await usersCollections.findOne({ email })
      if (userExist) {
        return res.send({ messege: 'user exist' })
      }

      const result = await usersCollections.insertOne(users)
      res.send(result)
    })

    app.get('/users', verifyFbToken, async (req, res) => {
      const cursor = usersCollections.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.patch('/users/:id/role', verifyFbToken, verifyAdmin, async (req, res) => {
      const { id } = req.params
      const roleInfo = req.body
      const updatedDoc = {
        $set: {
          role: roleInfo.role
        }
      }
      const result = await usersCollections.updateOne({ _id: new ObjectId(id) }, updatedDoc)
      res.send(result)
    })

    app.get('/users/:email/role', verifyFbToken, async (req, res) => {
      const { email } = req.params
      const result = await usersCollections.findOne({ email })
      // console.log({ role: result.role });
      res.send({ role: result?.role || 'User' })
    })

    app.post('/riders', verifyFbToken, async (req, res) => {
      const riders = req.body
      riders.status = 'Pending'
      riders.createdAt = new Date()

      const result = await ridersCollections.insertOne(riders)
      res.send(result)
    })

    app.get('/riders', verifyFbToken, async (req, res) => {
      const { status, district, workStatus } = req.query
      // console.log(req.query);

      const query = {}
      if (status) {
        query.status = status
      }
      if (district) {
        query.riderDistrict = district
      }
      if (workStatus) {
        query.workStatus = workStatus
      }

      const cursor = ridersCollections.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.patch('/riders/:id', verifyFbToken, verifyAdmin, async (req, res) => {
      const id = req.params.id
      const status = req.body.status
      const update = {
        $set: {
          status: status,
          workStatus: 'Available'
        }
      }
      const result = await ridersCollections.updateOne({ _id: new ObjectId(id) }, update)

      if (status === 'Approved') {
        const { email } = req.body
        const updateUser = {
          $set: {
            role: 'Rider'
          }
        }
        const userResult = await usersCollections.updateOne({ email }, updateUser)
      }

      res.send(result)
    })

    app.get('/tracking/:trackingId/logs', async (req, res) => {
      const trackingId = req.params.trackingId
      const query = { trackingId }
      const result = await trackingCollections.find(query).toArray()
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
