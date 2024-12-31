import { MongoClient } from "mongodb";

const uri = process.env.DB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export const database = client.db(process.env.DB_NAME || "test");


export const DbConnection = async () => {
    try {
        await client.connect();
        console.log("Connected to the database");
        return client.db(database);
    } catch (e) {
        console.log(e);
    }
}

