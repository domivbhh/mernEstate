import User from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import Listing from '../models/ListingModel.js'


export const userController = (req, res) => {
  res.json({
    message: "hello vb",
  });
};


export const updateUser=async (req,res,next)=>{
  console.log(req.params)
  if(req.user.id !== req.params.id) {
    return next(errorHandler(401,'you can update your own account only'))
  }
    try {
    if(req.body.password){
      req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
      $set:{
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        avatar:req.body.avatar,
      }
    },{new:true})


    const sendingData=updatedUser.username

    res.status(200).json(sendingData);

    

  }   
  catch (error) {
    next(error)    
  }

}


export const getUserListing=async (req,res,next)=>{
  if(req.params.id){
    try {
      const listings=await Listing.find({userRef:req.params.id});
      res.status(200).json(listings);
      
    } catch (err) {
      next(err)
      
    }
  }
  else{
    return next(errorHandler(401,'You can only view your own listings'))
  }
}