import express from 'express'
import { createListing,deleteListing,updateListing } from '../controllers/listingController.js'
import { verifyToken } from '../utils/verifiedUser.js'


const router=express.Router()

router.post('/create',createListing)
router.delete('/delete/:id',deleteListing)
router.post('/update/:id',updateListing)


export default router

