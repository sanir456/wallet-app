import express from "express"
import mongoose from "mongoose"
import authMiddleware from "../middleware.js"
import { Account } from "../db.js"

const accountRouter = express.Router()

accountRouter.get("/balance", authMiddleware, async (req,res) => {
    const userAcc = await Account.findOne({user:req.userID})
    if(!userAcc){
        res.status(404).json({success:false, error:"Account not found"})
    }
    res.status(200).json({success:true, balance:userAcc.balance})
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const {toUser, amount} =  req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const fromAccount = await Account.findOne({userId:req.userId}).session(session)
        if(!fromAccount || fromAccount.balance < amount*100){
            throw new Error("Insufficient balance")
        }

        const toAccount =  await Account.findOne({userId:toUser}).session(session)
        if(!toAccount){
            throw new Error("Invalid account")
        }

        await Account.updateOne({userId:req.userId},{
            $inc: {
                balance:-amount*100
            }
        }).session(session)
        await Account.updateOne({userId:toUser},{
            $inc: {
                balance:amount*100
            }
        }).session(session)

        await session.commitTransaction()
        return res.status(200).json({success:true, message:"Transfer successful"})
    } catch(error) {
        await session.abortTransaction()
        return res.status(400).json({success:false, error:error})
    } 
    finally {
        session.endSession()
    }
})

export default accountRouter