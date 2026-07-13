const cloudinary = require("../config/cloudinary");

const uploadImage = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No image Uploaded"
            });
        }
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(base64,{
            folder: "FoodShare/FoodImages",
        });

        return res.status(200).json({
            message:"image uploaded successfully",
            imageUrl: result.secure_url,
            publicId: result.public_id,
        })
    }catch(error){
        return res.status(500).json({
            message:"Image upload failed",
            error:error.message
        })
    };
}

module.exports={
    uploadImage,
};