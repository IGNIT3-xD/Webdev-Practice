const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: "Ronaldo", email: "ronaldo@mail.com" },
    { id: 2, name: "Messi", email: "messi123@mail.com" },
    { id: 3, name: "Neymar", email: "ney@mail.com" },
    { id: 4, name: "Mbappe", email: "mboobie@mail.com" },
]

app.get('/', (req, res) => {
    res.send('Hola, Como estas?')
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    console.log("Post method called", req.body);
    const newUser = req.body;
    
    newUser.id = users.length + 1;
    users.push(newUser)
    res.send(newUser)
})

app.listen(port, () => {
    console.log(`Server started ${port}`)
})