import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
})

const uplodOnCloudinary = async (localfilepath) => {
    try {
        if(!localfilepath) return null;
        const response = await cloudinary.uploader.upload(localfilepath,{
        resource_type: "auto"
    })
    console.log("file uploaded on cloudinary",response.url)
    return null
    } catch (error) {
        fs.unlinksync(localfilepath)
    }
}
export default uplodOnCloudinary