
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const maxAge = 86400
//Authentication Methods
//Create Token
const createToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            firstName: user.FirstName,
            userType: user.isMerchant ? "Merchant" : "Customer"
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.TOKEN_EXPIRATION}
    )
}

//Create Account (Sign Up)
const signUp = async (req, res) => {
    try {
        const {firstName, middleName, lastName, email, password} = req.body;
        console.log(req.body);

        //check if user already exists in the DB
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({error: "User already exists"});
        }

        //Create user 
        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            FirstName: firstName,
            MiddleName: middleName,
            LastName: lastName,
            email,  
            password: hashedPassword,
            isMerchant: false, //not a merchant by default
            Cart: [] //empty cart
        });

        console.log(user);
        //save user in database.
        await user.save();

        const token = createToken(user);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            maxAge: maxAge * 1000,
            sameSite: 'Lax'
        });
        res.status(201).json({message: "User created sucessfully!"})
    } catch (error) {
        res.status(500).json({error: "An error has occured"})
    }
};

//Function for Logging In
const login = async (req, res) => {

    try {
        const {email, password} = req.body;
        console.log(`email: ${email}, password: ${password}`);
        if(!email || !password){
            return res.status(401).json({message: 'All fields are Required'});
        }
        //Look for user in database
        const user = await User.findOne({email});

        //Validate credentials
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        //Generate Token
        const token = createToken(user);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            maxAge: maxAge * 1000,
            sameSite: 'Lax'
        });

        res.status(201).json({message: "Logged In Successfully"})

    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}

const logout = (req,res) => {
    res.clearCookie('token');
    res.status(200).json({message:"Logged out Successfully"})
}

//Function for retrieve user info 
const getProfile = (req,res) => {
    res.status(201).json({
        message: "Access Granted",
        user: {
            name: req.user.firstName,
            userType: req.user.userType,
            email: req.user.email
        }
    })
}

export {signUp, login, logout, getProfile};
