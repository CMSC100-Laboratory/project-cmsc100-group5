//Run this to initialize test data on database
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import bcrypt from "bcrypt";
import OrderTransaction from "./models/orderTransactionModel.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

const mockData = {
  users: [
    //Admin account
    {
      FirstName: "Department",
      MiddleName: "of",
      LastName: "Agriculture",
      isMerchant: true,
      email: "agriculture@da.gov.ph",
      password: "admin1234",
      Cart: [],
    },
    {
      FirstName: "Maria",
      MiddleName: "Santos",
      LastName: "Reyes",
      isMerchant: false,
      email: "mariareyes@farmers.ph",
      password: "maria1234",
      Cart: [],
    },
    {
      FirstName: "Pedro",
      MiddleName: "Magno",
      LastName: "Ramos",
      isMerchant: false,
      email: "pedroramos@farmers.ph",
      password: "pedro1234",
      Cart: [],
    },
    {
      FirstName: "Ana",
      MiddleName: "Lopez",
      LastName: "Garcia",
      isMerchant: false,
      email: "anagarcia@example.com",
      password: "ana1234",
      Cart: [],
    },
    {
      FirstName: "Liza",
      MiddleName: "Manalo",
      LastName: "Torres",
      isMerchant: false,
      email: "lizatorres@farmers.ph",
      password: "liza1234",
      Cart: [],
    },
    {
      FirstName: "Carlos",
      MiddleName: "David",
      LastName: "Silva",
      isMerchant: false,
      email: "carlossilva@example.com",
      password: "carlos1234",
      Cart: [],
    },
    {
      FirstName: "Grace",
      MiddleName: "Tiu",
      LastName: "Lim",
      isMerchant: false,
      email: "gracelim@example.com",
      password: "grace1234",
      Cart: [],
    },
    {
      FirstName: "Nico",
      MiddleName: "Ferrer",
      LastName: "Luna",
      isMerchant: false,
      email: "nicoluna@farmers.ph",
      password: "nico1234",
      Cart: [],
    },
    {
      FirstName: "Elena",
      MiddleName: "Quinto",
      LastName: "Rivera",
      isMerchant: false,
      email: "elenarivera@example.com",
      password: "elena1234",
      Cart: [],
    },
    {
      FirstName: "Mark",
      MiddleName: "Jose",
      LastName: "Fernandez",
      isMerchant: false,
      email: "markfernandez@farmers.ph",
      password: "mark1234",
      Cart: [],
    },
    {
      FirstName: "Isabel",
      MiddleName: "Tan",
      LastName: "Yu",
      isMerchant: false,
      email: "isabelyu@example.com",
      password: "isabel1234",
      Cart: [],
    },
    {
      FirstName: "Enrico",
      MiddleName: "Salazar",
      LastName: "Ocampo",
      isMerchant: false,
      email: "enricoocampo@farmers.ph",
      password: "enrico1234",
      Cart: [],
    },
    {
      FirstName: "Tina",
      MiddleName: "Go",
      LastName: "Chan",
      isMerchant: false,
      email: "tinachan@example.com",
      password: "tina1234",
      Cart: [],
    },
    {
      FirstName: "Miguel",
      MiddleName: "Aguilar",
      LastName: "Velasco",
      isMerchant: false,
      email: "miguelvelasco@example.com",
      password: "miguel1234",
      Cart: [],
    },
    {
      FirstName: "Bianca",
      MiddleName: "Roque",
      LastName: "Cabrera",
      isMerchant: false,
      email: "biancacabrera@farmers.ph",
      password: "bianca1234",
      Cart: [],
    },
  ],
  products: [
    {
      name: "Organic Carrots",
      description: "Fresh organic carrots from Benguet farms.",
      type: 0,
      price: 40,
      quantity: 100,
    },
    {
      name: "Brown Eggs (1 Dozen)",
      description: "Free-range chicken eggs, farm-fresh and nutritious.",
      type: 1,
      price: 85,
      quantity: 50,
    },
    {
      name: "Red Rice (5kg)",
      description: "Healthy red rice harvested in Ifugao.",
      type: 2,
      price: 280,
      quantity: 30,
    },
    {
      name: "Tilapia (per kg)",
      description: "Locally farmed tilapia, delivered fresh.",
      type: 3,
      price: 130,
      quantity: 70,
    },
    {
      name: "Sweet Mangoes (1kg)",
      description: "Guimaras mangoes, sweet and juicy.",
      type: 0,
      price: 120,
      quantity: 60,
    },
    {
      name: "Kangkong (bundle)",
      description: "Freshly harvested swamp cabbage.",
      type: 0,
      price: 20,
      quantity: 200,
    },
    {
      name: "Tomatoes (1kg)",
      description: "Ripe and juicy tomatoes for cooking.",
      type: 0,
      price: 35,
      quantity: 90,
    },
    {
      name: "Pineapple (per piece)",
      description: "Golden sweet pineapples from Bukidnon.",
      type: 0,
      price: 60,
      quantity: 40,
    },
    {
      name: "Chicken Breast (1kg)",
      description: "Lean and fresh chicken meat.",
      type: 1,
      price: 210,
      quantity: 45,
    },
    {
      name: "Milkfish (per kg)",
      description: "Bonuan bangus, clean and ready to cook.",
      type: 3,
      price: 150,
      quantity: 80,
    },
    {
      name: "Cabbage (1 head)",
      description: "Round cabbage good for stews.",
      type: 0,
      price: 25,
      quantity: 100,
    },
    {
      name: "Garlic (250g)",
      description: "Native garlic with strong flavor.",
      type: 0,
      price: 45,
      quantity: 60,
    },
    {
      name: "White Onions (1kg)",
      description: "Crisp and flavorful white onions.",
      type: 0,
      price: 100,
      quantity: 55,
    },
    {
      name: "Pumpkin (1kg)",
      description: "Good for soup or kalabasa fritters.",
      type: 0,
      price: 50,
      quantity: 70,
    },
    {
      name: "Eggplant (1kg)",
      description: "Perfect for tortang talong.",
      type: 0,
      price: 30,
      quantity: 75,
    },
  ],
  orderTransactions: [
    {
      productId: "PRODUCT_ID_1",
      orderQuantity: 2,
      orderStatus: 0,
      email: "juancruz@example.com",
      date: "2025-05-01T00:00:00Z",
      time: "14:45",
    },
    {
      productId: "PRODUCT_ID_2",
      orderQuantity: 1,
      orderStatus: 1,
      email: "anagarcia@example.com",
      date: "2025-04-30T00:00:00Z",
      time: "09:20",
    },
    {
      productId: "PRODUCT_ID_3",
      orderQuantity: 3,
      orderStatus: 2,
      email: "gracelim@example.com",
      date: "2025-05-02T00:00:00Z",
      time: "11:10",
    },
    {
      productId: "PRODUCT_ID_4",
      orderQuantity: 5,
      orderStatus: 1,
      email: "carlossilva@example.com",
      date: "2025-05-03T00:00:00Z",
      time: "10:00",
    },
    {
      productId: "PRODUCT_ID_5",
      orderQuantity: 1,
      orderStatus: 0,
      email: "elenarivera@example.com",
      date: "2025-05-04T00:00:00Z",
      time: "12:30",
    },
    {
      productId: "PRODUCT_ID_6",
      orderQuantity: 4,
      orderStatus: 2,
      email: "miguelvelasco@example.com",
      date: "2025-05-01T00:00:00Z",
      time: "08:45",
    },
    {
      productId: "PRODUCT_ID_7",
      orderQuantity: 2,
      orderStatus: 1,
      email: "tinachan@example.com",
      date: "2025-05-05T00:00:00Z",
      time: "16:20",
    },
    {
      productId: "PRODUCT_ID_8",
      orderQuantity: 1,
      orderStatus: 0,
      email: "isabelyu@example.com",
      date: "2025-05-06T00:00:00Z",
      time: "13:10",
    },
    {
      productId: "PRODUCT_ID_9",
      orderQuantity: 3,
      orderStatus: 1,
      email: "juancruz@example.com",
      date: "2025-05-06T00:00:00Z",
      time: "17:50",
    },
    {
      productId: "PRODUCT_ID_10",
      orderQuantity: 2,
      orderStatus: 1,
      email: "anagarcia@example.com",
      date: "2025-05-06T00:00:00Z",
      time: "07:35",
    },
    {
      productId: "PRODUCT_ID_11",
      orderQuantity: 1,
      orderStatus: 0,
      email: "miguelvelasco@example.com",
      date: "2025-05-06T00:00:00Z",
      time: "18:40",
    },
    {
      productId: "PRODUCT_ID_12",
      orderQuantity: 2,
      orderStatus: 2,
      email: "gracelim@example.com",
      date: "2025-05-07T00:00:00Z",
      time: "15:05",
    },
    {
      productId: "PRODUCT_ID_13",
      orderQuantity: 5,
      orderStatus: 1,
      email: "carlossilva@example.com",
      date: "2025-05-07T00:00:00Z",
      time: "19:00",
    },
    {
      productId: "PRODUCT_ID_14",
      orderQuantity: 1,
      orderStatus: 0,
      email: "elenarivera@example.com",
      date: "2025-05-07T00:00:00Z",
      time: "20:45",
    },
    {
      productId: "PRODUCT_ID_15",
      orderQuantity: 4,
      orderStatus: 1,
      email: "isabelyu@example.com",
      date: "2025-05-07T00:00:00Z",
      time: "21:15",
    },
  ],
};

const initializeDatabase = async () => {
  try {
    console.log("Establishing connection with MongoDB...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose has successfully connected to MongoDB");

    //Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await OrderTransaction.deleteMany({});
    console.log("Existing data cleared");

    //Hash passwords
    for (const user of mockData.users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    //Insert mock data
    console.log(mockData.users);
    await User.insertMany(mockData.users);
    console.log("Mock users inserted");
    console.log(mockData.products);
    await Product.insertMany(mockData.products);
    console.log("Mock products inserted");

    //Add actual product IDs and user emails to order transactions
    const userEmails = await User.find({}, "email");
    const productIds = await Product.find({}, "_id");
    mockData.orderTransactions.forEach((transaction) => {
      transaction.productId = productIds[Math.floor(Math.random() * productIds.length)]._id;
      transaction.email = userEmails[Math.floor(Math.random() * userEmails.length)].email;
    });
    console.log(mockData.orderTransactions);
    await OrderTransaction.insertMany(mockData.orderTransactions);
    console.log("Mock order transactions inserted");
    console.log("Database initialized with mock data");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

initializeDatabase();
