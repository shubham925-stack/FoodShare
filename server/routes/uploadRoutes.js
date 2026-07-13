const express=require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
upload = require("../middleware/upload");

const {
    uploadImage,
}= require("../controllers/uploadController");

router.post("/food-image",authMiddleware,upload.single("image"),uploadImage);

module.exports=router;
