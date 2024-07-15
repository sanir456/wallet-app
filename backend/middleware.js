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
        if(decode.userId){
            req.userId = decode.userId
            next()
        }
        else {
            return res.status(401).json({error:"Authentication failed"})
        }
    } catch(error) {
        return res.status(401).json({error:"Invalid authentication token"})
    }
}

export default authMiddleware