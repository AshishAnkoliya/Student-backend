const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust if needed

mongoose.connect("mongodb://localhost:27017/your_db_name"); // replace with your DB

const run = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // you can change password
  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin", // ✅ important
  });

  console.log("✅ Admin created:", admin.email);
  mongoose.disconnect();
};

run();
