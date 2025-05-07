import { MongoClient } from 'mongodb';

// connection string
const uri = "mongodb+srv://farmtotable:5nuANTz8Mu8ext6U@cluster0.nfgraqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);

async function run() {
    try{
        await client.connect();
        const db = client.db('Farm-to-Table');
        const collection = db.collection('Products');

        //find first doc in collection
        const first = await collection.findOne();
        console.log(first);
    }finally{
        //close connection when finished or error occured
        await client.close();
    }
}
run().catch(console.error);

// HELPFUL REFERENCES:
// https://www.w3schools.com/mongodb/mongodb_nodejs_connect_database.php
// https://github.com/Saurabh-pec/Ecommerce-Management-DBMS_Project-/tree/main