import jwt from "jsonwebtoken"
import { JWT_TOKEN } from "./config.js"

function authMiddleware(req,res,next) {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Beared ")){
        return res.status(401).json({error:"Authentication required"})
    }
    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token, JWT_TOKEN)
        req.userId = decode.userId
        next()
    } catch(error) {
        return res.status(401).json({error:"Invalid authentication token"})
    }
}

export default authMiddleware