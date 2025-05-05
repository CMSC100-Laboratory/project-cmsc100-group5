import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema for User
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    userType: { type: String, required: true }, // 'customer' or 'admin'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "Users", timestamps: true } // Automatically adds createdAt and updatedAt
);

// Hash password before saving (for security)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified or new

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(this.password, salt); // Hash the password
    this.password = hashedPassword; // Set the hashed password to the user model
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model("User", userSchema);

export { User, mongoose };
