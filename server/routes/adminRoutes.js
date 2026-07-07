const express=require("express");
const router=express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const{
    getDashboard,
    getAllRestaurants,
    getAllNGOs,
    verifyRestaurant,
    rejectRestaurant,
    verifyNGO,
    rejectNGO
}=require("../controllers/adminController")
router.get("/dashboard",authMiddleware,roleMiddleware("Admin"),getDashboard);
router.get("/restaurants",authMiddleware,roleMiddleware("Admin"),getAllRestaurants)
router.get("/ngos",authMiddleware,roleMiddleware("Admin"),getAllNGOs)
router.patch("/restaurant/:id/verify",authMiddleware,roleMiddleware("Admin"),verifyRestaurant)
router.patch("/restaurant/:id/reject",authMiddleware,roleMiddleware("Admin"),rejectRestaurant)
router.patch("/ngo/:id/verify",authMiddleware,roleMiddleware("Admin"),verifyNGO)
router.patch("/ngo/:id/reject",authMiddleware,roleMiddleware("Admin"),rejectNGO)
module.exports=router