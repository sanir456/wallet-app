import express from "express"
import mongoose from "mongoose"
import authMiddleware from "../middleware.js"
import { Account } from "../db.js"

const accountRouter = express.Router()

accountRouter.get("/balance", authMiddleware, async (req,res) => {
    const userAcc = await Account.findOne({user:req.userID})
    if(!userAcc){
        res.status(404).json({success:false, message:"Account not found"})
    }
    res.status(200).json({success:true, balance:userAcc.balance/100})
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const {toUser, amount} =  req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const fromAccount = await Account.findOne({userId:req.userId}).session(session)
        if(!fromAccount || (fromAccount.balance)/100 < amount){
            throw new Error("Insufficient balance")
        }
        fromAccount.balance = fromAccount.balance/100

        const toAccount =  await Account.findOne({userId:toUser}).session(session)
        if(!toAccount){
            throw new Error("Invalid account")
        }
        toAccount.balance = toAccount.balance/100

        await Account.updateOne({userId:req.userId},{
            $inc: {
                balance:-amount
            }
        }).session(session)
        await Account.updateOne({userId:toUser},{
            $inc: {
                balance:amount
            }
        }).session(session)

        await session.commitTransaction()
        return res.status(200).json({success:true, message:"Transfer successful"})
    } catch(error) {
        await session.abortTransaction()
        return res.status(400).json({success:false, message:error})
    } 
    finally {
        session.endSession()
    }
})

export default accountRouter