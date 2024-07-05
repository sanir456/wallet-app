import userRouter from "./user"

const express = require("express")
const router = express.Router()

router.get("/user",userRouter)

module.exports = {
    router
}