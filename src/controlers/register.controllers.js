import asyncHandler from "../utils/wrapper.js";
import {User} from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js"


const registerUser = asyncHandler(async (req,res) => {
    const {userName, fullName, email, password} = req.body;
    if([userName, fullName, email, password].some((field) => field?.trim() === "")){
        throw new Error("all fields should full");
    }
    else{
        const existUser = await User.findOne({email: email})
        if(existUser){
            throw new Error("user is exist")
        }
        else{
          const avtarlocalpath = req.files?.avtar[0]?.path
          const coverlocalpath = req.files?.coverImage[0]?.path
          if(avtarlocalpath){
            const newUser = await User.create({
                userName: userName.toLowerCase(),
                email: email,
                avtar: avtarlocalpath.url,
                coverImage: coverlocalpath?.url || "",
                password: password,
                fullName: fullName,
                refreshToken: req.body.refreshToken
            })
            const createdUser = User.findById(newUser._id).select(
                "-password -refreshToken"
            )
            if(!createdUser) throw new Error("user is not created");
            res.status(201).json(
                new apiResponse(200,createdUser,"everything is working")
            )
          }
          else throw new Error("avtar image is required");
    
        }
    }
} )

export default registerUser
