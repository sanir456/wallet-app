import express from "express"
import jwt from "jsonwebtoken"
import  authMiddleware  from "../middleware.js"
import { JWT_TOKEN } from "../config.js"
import { User } from "../db.js"
import { signupSchema, updateSchema, signinSchema } from "../types.js"

const userRouter = express.Router()



userRouter.post("/signup", async (req,res) => {
    const body = req.body;
    console.log(body);
    const {success} = signupSchema.safeParse(body)
    if(!success){
        return res.status(400).json({message:"Bad request"})
    }

    const user =  await User.findOne({
        username:body.username
    })
    if(user){
        return res.status(400).json({message:"User already exits"})
    }

    const newUser = await User.create(body)
    const token = jwt.sign({
        userId:newUser._id
    }, JWT_TOKEN)
    return res.status(200).json({
        message: "User created",
        token: token
    })
})

userRouter.post("/signin", async (req,res) => {
    const body = req.body

    const {success} = signinSchema.safeParse(body)
    if(!success){
        return res.status(400).json({message:"Bad request"})
    }

    const user = await User.findOne({username:body.username})
    const isMatch = user.comparePassword(body.password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid password"})
    }

    const token = jwt.sign({
        userId:user._id
    },JWT_TOKEN)
    res.status(200).json({message:"signin successful", token: token})
})

userRouter.put("/update", authMiddleware, async (req,res) => {
    const body = req.body
    const {success} = updateSchema.safeParse(body)
    if(!success){
        return res.status(400).json({message:"Bad request"})
    }
    console.log(body)
    console.log(req.userId);
    await User.findByIdAndUpdate(req.userId,body)
    res.status(200).json({message:"User updated"})
})

userRouter.get("/searchUser", authMiddleware, async (req,res) => {
    console.log(req.query);
    const filter = req.query.filter || ""

    const users = await User.find({
        $or:[
            {firstName:{$regex:filter}},
            {lastName:{$regex:filter}}
        ]
    })
    res.status(200).json({users:users})
})

export default userRouter