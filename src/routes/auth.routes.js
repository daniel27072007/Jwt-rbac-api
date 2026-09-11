import { Router } from "express";
import { registerUser } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post('/register', registerUser)

export default authRouter