const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT, () =>
    console.log(`Server Started on Port http://localhost:${PORT}/ `)
);

/* MONGODB CONNECTION*/
const credentials = {
    username: "mongodb",
    password: "mongodb",
};
const mongoConnString = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.v3vj7wd.mongodb.net/?retryWrites=true&w=majority`;

new MongoClient(mongoConnString)
    .connect()
    .catch((error) => console.error(error))
    .then(function onDBConnection(mongoClient) {

        console.log("Connected to MongoDB!");

        const db = mongoClient.db("sae-server");
        const users = db.collection("users");
        const todos = db.collection("todos");

        routes(app);
        todoRoutes(app, { todos })
        authRoutes(app, { users })
    })