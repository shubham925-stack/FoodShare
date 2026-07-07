const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
dotenv.config()
const connectDB=require("./config/db")
const authRoutes=require("./routes/authRoutes")
const restaurantRoutes=require("./routes/restaurantRoutes")
const foodDonationRoutes=require("./routes/foodDonationRoutes")
const ngoProfileRoutes=require("./routes/ngoProfileRoutes")
const adminRoutes=require("./routes/adminRoutes")
const aiRoutes = require("./routes/aiRoutes")
// const volunteerProfileRoutes=require("./routes/volunteerProfileRoutes")


connectDB()
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/restaurant",restaurantRoutes)
app.use("/api/food-donations",foodDonationRoutes)
app.use("/api/ngo-profiles",ngoProfileRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/ai",aiRoutes)
// app.use("/api/volunteer-profiles",volunteerProfileRoutes)
const PORT = process.env.PORT||3000;

app.get("/", (req, res) => {
    res.send("FoodShare Backend is Running ");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
