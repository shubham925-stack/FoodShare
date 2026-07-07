// const VolunteerProfile=require("../models/VolunteerProfile");
// const User=require("../models/User");
// const { create } = require("../models/Claim");

// const createVolunteerProfile=async(req,res)=>{
//     try{
//         const {
//             userId,
//             address,
//             vehicleType,
//             isAvailble,
//             verificationDocuments
//         }=req.body;

//         const user=await User.findById(userId);

//         if(!user){
//             return res.status(404).json({
//                 message:"User not found"
//             })
//         }
//         if(user.role!=="Volunteer"){
//             return res.status(409).json({
//                 message:"Only volunteer user can create volunteer profile"
//             })
//         }
//         const existingVolunteer=await VolunteerProfile.findOne({userId});
//         if(existingVolunteer){
//             return res.status(409).json({
//                 message:"Volunteer profile already exists"
//             })
//         }
//         const volunteerProfile=await VolunteerProfile.create({
//             userId,
//             address,
//             vehicleType,
//             isAvailble,
//             verificationDocuments
//         })
//         res.status(201).json({
//             message:"Volunteer profile created successfully",volunteerProfile
//         })
//     }catch(error){
//         res.status(500).json({
//             message:"internal server error",
//             error:error.message
//         })
//     }
// }

// module.exports={
//     createVolunteerProfile
// }