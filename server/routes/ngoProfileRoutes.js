const express=require("express");
const router = express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const roleMiddleware=require("../middleware/roleMiddleware")
const{
    createNGOProfile,
    getNGOProfileById,
    updateNGOProfile,
    getAllNGOProfiles,
    deleteNGOProfile
}=require("../controllers/ngoProfileController")

router.post("/",authMiddleware,roleMiddleware("NGO"),createNGOProfile)
router.get("/",authMiddleware,roleMiddleware("Admin"),getAllNGOProfiles)
router.get("/profile",authMiddleware,roleMiddleware("NGO"),getNGOProfileById)
router.put("/profile",authMiddleware,roleMiddleware("NGO"),updateNGOProfile)
router.delete("/profile",authMiddleware,roleMiddleware("NGO"),deleteNGOProfile)
module.exports=router