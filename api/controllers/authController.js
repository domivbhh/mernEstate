import User from "../models/UserModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup=async (req,res,next)=>{
    
      const { username, email, password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({ username, password: hashedPassword, email }); /// idhu dha andha model ku anupudhu
    
      try {
      await newUser.save(); ///idhu dha db la andha model create panna use aaagudhu
      res.status(201).json("user created successfully");
    } 
    catch (error) {
      next(error);
    }
}



export const signin= async (req,res,next)=>{
  const{email,password}=req.body;
  try{
    const validUser=await User.findOne({email})
    if(!validUser){
      return next(errorHandler(404,'user not found'))
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password)
    if(!validPassword){
      return next(errorHandler(401, "password does not match"));
    }

    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)

    // const{password:pass,...rest}=validUser._doc///destructure password and other info(I.E -- in REST)

    const sendingData = await User.findOne({email:email }).select("username");
    
    res.cookie('token',token,{httpOnly:true}).status(200).json(sendingData)


  }
  catch(err){
      next(err);
  }
}




export const google=async(req,res,next)=>{
  try{
    const user=await User.findOne({email:req.body.email})
    if(user){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user);
    }
    else{
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); ;
      const hashedPassword=bcryptjs.hashSync(generatePassword,10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar:req.body.photo
      });
      await newUser.save()
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
      
      
      const sendingData = await User.findOne({ email: email }).select("username");

      res.cookie("token", token, {
          httpOnly: true}) .status(200).json(sendingData);
    }

  }
  catch(err){
    next(err)

  }
}