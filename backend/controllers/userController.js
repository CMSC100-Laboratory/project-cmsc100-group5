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

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({email: req.body.email})
    res.status(200).send("success");
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.updateOne(
      {email: req.body.email},
      { $set: {FirstName: req.body.FirstName, email: req.body.newEmail, LastName: req.body.LastName}}
      )
      console.log("yes")
    res.status(200).send("success");
  } catch (error) {
    console.log("no")
    res.status(500).json({ message: 'Error deleting user', error });
  }
};


export {getAllUsers, deleteUser, updateUser};