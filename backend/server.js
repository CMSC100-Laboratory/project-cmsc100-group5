import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import shopRouter from './routers/ShopRoutes.js';

dotenv.config();    

// Middleware
const uri = "mongodb+srv://farmtotable:5nuANTz8Mu8ext6U@cluster0.nfgraqz.mongodb.net/Farm-to-Table?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3000;
console.log("MongoDB URI: ", uri);

//Initialize MongoDB connection
async function connectDB() {
    try {
        console.log("Establishing connection with MongoDB...");    
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoose has successfully connected to MongoDB");
        const verifyConnection = mongoose.connection;
        verifyConnection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });
        verifyConnection.once('open', () => {
            console.log("MongoDB connection is open");
        });
        verifyConnection.on('disconnected', () => {
            console.log("MongoDB connection is disconnected");
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
}
const app = express();


// Cors configuration
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
shopRouter(app);

//start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

