const ai = require("../ai/gemini");

const generateDescription=async(req,res)=>{
    try{
        const {foodname} = req.body;
        if(!foodname){
            return res.status(400).json({
                message:"Food name is required"
            });
        }
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:`Generate a short description for food donation (maximum 20 words) for ${foodname}. Return only the description`
        })
        res.status(200).json({
            description:response.text
        })
    }catch(error){
        res.status(500).json({
            message:"AI Generation failed",
            error:error.message
        })
    }
}

module.exports={
    generateDescription
}