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

    export const getListing=async (req,res,next)=>{
        try {
            const listing=await Listing.findById(req.params.id)
            if(!listing){
                return next(errorHandler(404,'Listing not Found'))
            }    
            res.status(200).json(listing)
        } 
        catch (error) {
            next(error)
        }
    }


    export const getListings=async (req,res,next)=>{
        try {
                let limit=parseInt(req.query.limit) || 9;

                let startIndex=parseInt(req.query.startIndex)||0;

                let offer=req.query.offer;


                if(offer === undefined || offer === false){
                    offer={$in :[false,true]};
                }

                let furnished=req.query.furnished;
                if(furnished === undefined || furnished ==='false'){
                    furnished={$in:[false,true]};
                }

                let parking=req.query.parking
                if (parking === undefined || parking === "false") {
                  parking={ $in:[false, true]};
                }

                let type=req.query.type

                if(type === undefined || type ==='false'){
                    type={$in :['sale','rent']};
                }

                const searchTerm=req.query.searchTerm || '';

                const sort=req.query.sort || 'createdAt';

                const order=req.query.order || 'desc';

                const listings=await Listing.find({
                    name:{$regex : searchTerm,$options:'i'},
                    offer,furnished,parking,type
                }).sort({[sort]:order}).limit(limit).skip(startIndex);
                
                // console.log(listings)
                return res.status(200).json(listings)
        } 
        catch (error) {
            next(error)
            
        }
    }