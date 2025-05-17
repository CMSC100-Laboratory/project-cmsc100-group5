import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      const count = users.length
      console.log(users)
      console.log(users.length);
      const registeredUsers = [];

      for (let i = 0; i < users.length; i++)
      {
        if (!users[i]["isMerchant"])
        {
          registeredUsers.push([users[i]["FirstName"], users[i]["LastName"], users[i]["email"]])
        }
      }

      res.status(200).send({users: registeredUsers, count: users.length});
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };


export {getAllUsers};