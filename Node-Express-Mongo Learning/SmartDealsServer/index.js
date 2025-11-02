const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// smartDb
// FKXz0bEwNMO6wrLI
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
            const cursor = products.find()
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
        app.get('/bids', async (req, res) => {
            const email = req.query.email

            const query = {}
            if (email) {
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