const ai = require("../ai/gemini");
const axios = require("axios");
const { image } = require("../config/cloudinary");

const generateDescription=async(req,res)=>{
    try{
        const {foodName, imageURL} = req.body;
        if(!foodName || !imageURL){
            return res.status(400).json({
                message:"Food name and image are required required"
            });
        }

        const imageResponse = await axios.get(imageURL,{
            responseType:"arraybuffer",
        });
        const base64Image = Buffer.from(imageResponse.data).toString("base64")
        const prompt = `

The uploaded image is of "${foodName}".

Analyze the food image carefully and generate a professional food description.

Rules:

- Maximum 20 words.
- Mention ingredients or appearance if visible.
- Suitable for a food donation platform.
- Return ONLY the description.
`;
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:[
                {
                    role:"user",
                    parts:[
                        {
                            text:prompt
                        },
                       {   
                            inlineData:{
                                mimeType:"image/jpeg",
                                data: base64Image,                       
                            }
                        }
                    ]
                }
            ]
        })
        const description = response.text;
        res.status(200).json({
            description,
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