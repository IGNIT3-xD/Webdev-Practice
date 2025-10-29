const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

// Middlewere
app.use(cors())
app.use(express.json())

// MongoDB Setup
// o4eMXCZB6Dyz4epb
// user_01

const uri = "mongodb+srv://user_01:o4eMXCZB6Dyz4epb@cluster0.3wuuvwl.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send('Server is running...')
})

async function run() {
    try {
        await client.connect()

        const usersDb = client.db("usersDb")
        const usersCollection = usersDb.collection("users")

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) }
            const result = await usersCollection.findOne(query)
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            // console.log(newUser);
            const result = await usersCollection.insertOne(newUser)
            res.send(result)
        })

        app.patch('/users/:id', async (req, res) => {
            const updatedUser = req.body;
            // console.log(updatedUser);

            const query = { _id: new ObjectId(req.params.id) }
            const update = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            }
            const result = await usersCollection.updateOne(query, update)
            res.send(result)
        })

        app.delete('/users/:id', async (req, res) => {
            console.log(req.params.id);

            const query = { _id: new ObjectId(req.params.id) }
            const result = await usersCollection.deleteOne(query)
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.listen(port, () => {
    console.log(`Server listening to port - localhost:${port}`);
})