import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        uniqe: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    avtar:{
        type: String, // cloudnary url 
        required: true,
    },
    coverImage:{
        type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken:{
        type: String,
    }
},{ timestamps: true })

userSchema.pre("save",function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10)
        next()
    }
    else return next()
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id: this._id,
        userName: this.userName,
        fullName: this.fullName,
        email: this.email,
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn: process.env.ACCESS_TOKEN_EXPIRY
    }
}
userSchema.methods.createRefreshToken = function(){
    return jwt.sign({
        id: this._id,
    }), 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn: process.env.REFRESH_TOKEN_EXPIRY
}
}
export const User = mongoose.model("User",userSchema)

