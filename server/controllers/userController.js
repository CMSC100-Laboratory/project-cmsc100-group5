import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      const count = users.length
      console.log(users.length);
      res.status(200).send(count);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };


export {getAllUsers};