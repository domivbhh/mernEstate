import express from "express";
import { userController } from "../controllers/UserController.js";

const router=express.Router()

// router.route('/').get()

router.get('/test',userController)

export default router


