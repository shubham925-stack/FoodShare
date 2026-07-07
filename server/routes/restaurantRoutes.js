const express=require("express")
const router = express.Router()
const roleMiddleware=require("../middleware/roleMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const {
    createRestaurantProfile,
    getRestaurantProfile,
    updateRestaurantProfile,
    deleteRestaurantProfile
}=require("../controllers/restaurantController");
router.post("/profile",authMiddleware,roleMiddleware("Restaurant"),createRestaurantProfile)
router.get("/profile",authMiddleware,roleMiddleware("Restaurant"),getRestaurantProfile)
router.put("/profile",authMiddleware,roleMiddleware("Restaurant"),updateRestaurantProfile)
router.delete("/profile",authMiddleware,roleMiddleware("Restaurant"),deleteRestaurantProfile)

module.exports=router