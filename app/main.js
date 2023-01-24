const { MongoClient } = require("mongodb");
const Express = require("express");

const app = Express();

const mongoClient = new MongoClient(process.env.MONGODB_ATLAS_URI);
let database, collection;

app.get("/data", async (request, response) => {
    try {
        const results = await collection.find({}).limit(5).toArray();
        response.send(results);
    } catch (error) {
        response.status(500).send({ "message": error.message });
    }
});

const server = app.listen(3000, async () => {
    try {
        await mongoClient.connect();
        database = mongoClient.db(process.env.MONGODB_DATABASE);
        collection = database.collection(`${process.env.MONGODB_COLLECTION}`);
        collection.insertOne({ "firstname": "Nic", "lastname": "Raboy" });
        console.log("Listening at :3000");
    } catch (error) {
        console.error(error);
    }
});

process.on("SIGTERM", async () => {
    console.log(`${process.env.CLEANUP_ONDESTROY}`);
    if(process.env.CLEANUP_ONDESTROY == "true") {
        console.log("CLEANING UP MONGODB...");
        await database.dropDatabase();
    }
    mongoClient.close();
    server.close(() => {
        console.log("NODE APPLICATION TERMINATED!");
    });
});