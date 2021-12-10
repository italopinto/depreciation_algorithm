const mongo = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const client = new mongo.MongoClient(process.env.MONGO_URI);

async function allCollections(collection) {
  try {
    await client.connect();
    const coll = await client.db().collection(collection).find({}).toArray();
    return coll;
  } catch (error){
    return new Error(error);
  } finally {
    await client.close();
  }
}

module.exports = allCollections;

