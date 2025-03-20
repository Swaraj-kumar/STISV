const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGO_URI  = "mongodb+srv://swarajk:XWqJRrKvUsQGNDRL@stis-v.ubj0c.mongodb.net/STISV?retryWrites=true&w=majority&appName=STIS-V";
// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

const createAdmin = async () => {
  const email = "Admin@STIS-V2025";  // ✅ Change this to your desired admin email
  const plainPassword = "Admin@STIS";  // ✅ Change this to your desired password

  // Hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newAdmin = new Admin({
    email,
    password: hashedPassword,  // ✅ Store the hashed password
  });

  await newAdmin.save();
  console.log("✅ Admin created successfully!");
  mongoose.connection.close();
};

createAdmin();
