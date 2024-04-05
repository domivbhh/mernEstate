import Listing from '../models/ListingModel.js'
import { errorHandler } from '../utils/error.js';

export const createListing=async(req,res,next)=>{
    try{
            const listing=await Listing.create(req.body);
            return res.status(201).json(listing)        
    }
    catch(err){
        next(err)
    }


};


export const deleteListing= async(req,res,next)=>{
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
          return next(errorHandler(404, "Listing npt found..!"));
        }
        res.status(200).json("Listing has been successfully deleted");

    } 
    catch (error) {
        
    }
}

export const updateListing=async(req,res,next)=>{
    try {
      const listing = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if (!listing) {
        return next(errorHandler(404, "Listing not found"));
      }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
    


}
