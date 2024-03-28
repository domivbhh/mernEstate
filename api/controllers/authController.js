import User from "../models/UserModel.js"
import bcryptjs from 'bcryptjs'

export const signup=async (req,res)=>{
    const {username,email,password}=req.body
    const hashedPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,password:hashedPassword,email})/// idhu dha andha model ku anupudhu
    
    try{
    await newUser.save()        ///idhu dha db la andha model create panna use aaagudhu
    res.status(201).json('user created successfully')
    }
    catch(err){
        res.status(500).send(err.message)
    }
}