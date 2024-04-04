import express from "express";
import { updateUser, userController } from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifiedUser.js";
import { getUserListing } from "../controllers/UserController.js";

const router=express.Router()

// router.route('/').get()

// router.get('/test',userController)
router.post('/update/:id',verifyToken,updateUser)


router.get('/listing/:id',getUserListing)

export default router


