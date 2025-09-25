import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;


const dbConnect = async (collectionName) => {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME).collection(collectionName);
};

export default dbConnect;