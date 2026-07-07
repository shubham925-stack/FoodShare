const FoodDonation = require("../models/FoodDonation");
const jwt=require("jsonwebtoken");
const RestaurantProfile = require("../models/RestaurantProfile");
const User = require("../models/User");

//registering a user
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({
                message: "phone number alreadt registered"
            })
        }
        const newUser = await User.create({
            name,
            email,
            phone,
            password,
            role
        })
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

//user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        };
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
        res.status(200).json({
            message: "Login successful",
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
module.exports = {
    registerUser,loginUser
}