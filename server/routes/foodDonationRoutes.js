const express=require("express");
const router = express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const roleMiddleware=require("../middleware/roleMiddleware")
const {
    createFoodDonation,
    getAllFoodDonations,
    getRestaurantDonations,
    getFoodDonationById,
    updateFoodDonation,
    deleteFoodDonation,
    claimFoodDonation,
    getNGODonations
}=require("../controllers/foodDonationController")

router.post("/",authMiddleware,roleMiddleware("Restaurant"),createFoodDonation)
router.get("/",getAllFoodDonations)
router.get("/my-donations",authMiddleware,roleMiddleware("Restaurant"),getRestaurantDonations)
router.get("/ngo/my-donations",authMiddleware,roleMiddleware("NGO"),getNGODonations)
router.get("/:donationId",getFoodDonationById)
router.put("/:id",authMiddleware,roleMiddleware("Restaurant"),updateFoodDonation)
router.delete("/:id",authMiddleware,roleMiddleware("Restaurant"),deleteFoodDonation)
router.patch("/:id/claim",authMiddleware,roleMiddleware("NGO"),claimFoodDonation)
module.exports=router