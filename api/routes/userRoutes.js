import express from "express";
import { updateUser, userController } from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifiedUser.js";

const router=express.Router()

// router.route('/').get()

// router.get('/test',userController)
router.post('/update/:id',verifyToken,updateUser)

export default router


