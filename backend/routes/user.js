import { JWT_SECRET } from "../config.js"
import { authMiddleware }from "../middleware.js"
import { User } from "../db"
import { updateSchema, userSchema } from "../types.js"

const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userRouter = express.Router()

const saltRounds = 10



userRouter.post("/signup", signUpValidation, userExist, async (req,res) => {
    const body = req.body;
    
    const {success} = userSchema.safeParse(body)
    if(!success){
        return res.status(400).json({message:"Bad request"})
    }

    const user =  await User.findOne({
        username:body.username
    })
    if(user._id){
        return res.status(400).json({message:"User already exits"})
    }

    const newUser = await User.create(body)
    const token = jwt.sign({
        userId:newUser._id
    },JWT_SECRET)
    return res.status(200).json({
        message: "User created",
        token: token
    })
})

userRouter.post("/singin", async (req,res) => {
    
})

userRouter.put("/update", authMiddleware, async (req,res) => {
    const body = req.body
    const {success} = updateSchema.safeParse(body)
    if(!success){
        return res.status(400).json({message:"Bad request"})
    }

    await User.updateOne(body,{id:req.userId})
    res.status(200).json({message:"User updated"})
})

module.exports = userRouter