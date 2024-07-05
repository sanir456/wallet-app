import { JWT_SECRET } from "./config";

const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next) {
    const authHeader = res.headers.authorization

    if(!authHeader || !authHeader.startsWith("Beared ")){
        return res.status(401).json({error:"Authentication required"})
    }
    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, JWT_SECRET)
        req.userId = decode.userId
        next()
    } catch(error) {
        return res.status(401).json({error:"Invalid authentication token"})
    }
}

module.exports = {
    authMiddleware
}