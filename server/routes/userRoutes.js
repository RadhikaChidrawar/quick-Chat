import express from 'express'
import { checkAuth, login, singup, updatedProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/singUp", singup )
userRouter.post("/login", login)
userRouter.post("/updated-profile", protectRoute, updatedProfile)
userRouter.post("/check", protectRoute, checkAuth)


export default userRouter