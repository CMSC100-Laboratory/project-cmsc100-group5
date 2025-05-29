
import User from "../models/userModel.js"
import bcrypt from "bcrypt"

//Authentication Methods

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
        res.status(201).json({message: "User created sucessfully!"})
    } catch (error) {
        res.status(500).json({error: "An error has occured"})
    }
};

export {signUp};
