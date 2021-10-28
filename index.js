
const { MongoClient } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
var ObjectId = require('mongodb').ObjectId;


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xpttu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("volunteer_network");
        const projects = database.collection("projects");

        // GET API
        app.get('/projects', async (req, res) => {
            const cursor = projects.find({});
            const result = await cursor.toArray();
            res.send(result)
        })
        
        // DELETE API
        app.delete('/projects/:id', async (req, res) => {
            const id = req?.params?.id;
            const query = {_id:ObjectId(id)};
            const result = await projects.deleteOne(query);
            res.json(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World! It is working')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
