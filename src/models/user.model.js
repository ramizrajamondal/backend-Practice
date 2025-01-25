import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userScema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
      type: String,
      required: true,  
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
    },
    avtar:{
        type: String,
        required: true,
    },
    coverimage:{
        type: String,
    },
    watchHistory:[
        {
           type: Schema.Types.ObjectId,
           ref: "Video",
        }
    ]
},{timestamps: true})

userScema.pre("save",async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
    next();
})
userScema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password);
}
userScema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id: this._id,
        email: this.email,
    }),
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
}
userScema.models.generateAccessToken = function(){
    return jwt.sign({
        id: this._id,
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
}
export const User = mongoose.model("User",userScema);