const express=require("express")
const router=express.Router();

const{
    generateDescription
}=require("../controllers/aiController");

router.post("/description",generateDescription);

module.exports=router