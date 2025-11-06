const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const admin = require('firebase-admin')
const jwt = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 5000

const serviceAccount = require("./auth-integration.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middlewere
app.use(cors())
app.use(express.json())

const verifyFirebaseToken = async (req, res, next) => {
    // console.log('Header ', req.headers.authoraization)
    const authoraization = req.headers.authoraization;
    if (!authoraization) {
        return res.status(401).send({ messege: 'Unauthorized access' })
    }

    const token = authoraization.split(' ')[1]
    if (!token) {
        return res.status(401).send({ messege: 'Unauthorized access' })
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token)
        // console.log(tokenInfo);
        req.tokenEmail = decoded.email
        next()
    }
    catch {
        return res.status(401).send({ messege: 'Unauthorized access' })
    }
}

// Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3wuuvwl.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

async function run() {
    try {
        await client.connect()

        const db = client.db('smart_deals')
        const products = db.collection('products')
        const bids = db.collection('bids')

        // All Products
        app.get('/products', async (req, res) => {
            const userEmail = req.query.email
            // console.log(userEmail);
            const query = {}
            if (userEmail) {
                query.email = userEmail
            }

            const cursor = products.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // Recent Products
        app.get('/recent-products', async (req, res) => {
            const cursor = products.find().limit(6).sort({ created_at: -1 })
            const result = await cursor.toArray()
            res.send(result)
        })

        // Get product details by id
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await products.findOne(query)
            res.send(result)
        })

        // Get Bids from user
        app.post('/bids', async (req, res) => {
            const newBid = req.body
            const result = await bids.insertOne(newBid)
            res.send(result)
        })

        // Get Bids by Per Product
        app.get('/products/bids/:productId', async (req, res) => {
            const productId = req.params.productId
            const query = { product: productId }
            const cursor = bids.find(query).sort({ bid_price: -1 })
            const result = await cursor.toArray()
            res.send(result)
        })

        // Get Bids of User
        app.get('/bids', verifyFirebaseToken, async (req, res) => {
            const email = req.query.email
            // const token = req.headers.authoraization
            // console.log(token);
            // console.log("Token email", req.tokenEmail);

            const query = {}
            if (email) {
                if (email !== req.tokenEmail) {
                    return res.status(403).send({ messege: "Forbidden access" })
                }
                query.buyer_email = email
            }

            const cursor = bids.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // Delete Bid
        app.delete('/bids/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await bids.deleteOne(query)
            res.send(result)
        })

        // Create Product
        app.post('/products', verifyFirebaseToken, async (req, res) => {
            // console.log(req.headers);

            const newProduct = req.body
            // console.log(newProduct);
            const result = await products.insertOne(newProduct)
            res.send(result)
        })

        // Created Product by User
        // app.get('/products', async (req, res) => {
        //     const userEmail = req.query.email
        //     console.log(userEmail);
        // })

        // Delete Product
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id
            // console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await products.deleteOne(query)
            res.send(result)
        })

        // JWT
        app.post('/getToken', (req, res) => {
            const loggedUser = req.body;
            const token = jwt.sign(loggedUser, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.send({ token: token })
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    finally {

    }
}
run().catch(console.dir)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})