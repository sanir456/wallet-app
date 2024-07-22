import express from "express"
import jwt from "jsonwebtoken"
import  authMiddleware  from "../middleware.js"
import { JWT_TOKEN } from "../config.js"
import { Account, User } from "../db.js"
import { signupSchema, updateSchema, signinSchema } from "../types.js"

const userRouter = express.Router()



userRouter.post("/signup", async (req,res) => {
    const body = req.body;
    console.log(body);
    const {success} = signupSchema.safeParse(body)
    if(!success){
        return res.status(400).json({success:false, error:"Bad request"})
    }
    const user =  await User.findOne({
        username:body.username
    })
    if(user){
        return res.status(400).json({success:false, error:"User already exits"})
    }
    let newUser = new User(body)
    newUser = await newUser.save() 
    const userAcc = await Account.create({
        userId:newUser._id,
        balance: (Math.floor(Math.random() * 10000) + 1)
    })
    const token = jwt.sign({
        userId:newUser._id
    }, JWT_TOKEN)
    return res.status(200).json({
        success:true, 
        message: "User created",
        token: token
    })
})

userRouter.post("/signin", async (req,res) => {
    const body = req.body

    const {success} = signinSchema.safeParse(body)
    if(!success){
        return res.status(400).json({success:false, error:"Bad request"})
    }

    const user = await User.findOne({username:body.username})
    const isMatch = user.comparePassword(body.password)
    if(!isMatch){
        return res.status(401).json({success:false, error:"Invalid password"})
    }

    const token = jwt.sign({
        userId:user._id
    },JWT_TOKEN)
    res.status(200).json({success:true, message:"signin successful", token: token})
})

userRouter.put("/update", authMiddleware, async (req,res) => {
    const body = req.body
    const {success} = updateSchema.safeParse(body)
    if(!success){
        return res.status(400).json({success:false, error:"Bad request"})
    }
    console.log(body)
    console.log(req.userId);
    await User.findByIdAndUpdate(req.userId,body)
    res.status(200).json({success:true, message:"User updated"})
})

userRouter.get("/searchUser", authMiddleware, async (req,res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $and:[
            {$or:[
                {firstName:{$regex:filter}},
                {lastName:{$regex:filter}}
            ]},
            {_id:{$ne:req.userId}}
        ]
    })
    
    res.status(200).json({
        success:true,
        users:users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id:user._id
        }))
    })
})

export default userRouter