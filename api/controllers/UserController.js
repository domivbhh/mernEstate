import User from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

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