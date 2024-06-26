import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken=(req,res,next)=>{
    const token=req.Cookies.jwt
    console.log(token)

    if(!token){
        return next(errorHandler(401,'Unauthorized'))
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>
        {
        if(err)
        {
            return next(errorHandler(403,'Forbiddden'))
        }
        console.log(user)
        req.user=user;//token create pannum bodhu jwt sign la enna pass pannomo adhu dha varum...adhu namma kondu poi req.user la add pannirom           ******* idha nalla note pannu******
        next();
        })

    

}