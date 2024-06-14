require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = 5000;
// const port = process.env.PORT;

app.use(cors());
app.use(express.json());



const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const taskManagementDB = client.db("taskManagement");
    const taskCollection = taskManagementDB.collection("taskCollection");

    // fruits routes
    app.post("/task", async (req, res) => {
      const taskData = req.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
      // console.log(result);
    });

    app.get("/task", async (req, res) => {
      const taskData = taskCollection.find();
      const result = await taskData.toArray();
      res.send(result);
      console.log(result);
    });

    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const taskData = await taskCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(taskData);
      console.log(taskData);
    });

    app.patch("/task/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result);
    });

    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log("You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("WelCome To Our Task ManagementDB");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



// 1572BUWYIXfY22cn