import { Router } from "express";
import { costumerRoute, employeeRoute, adminRoute } from "../controllers/protectedController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const protectedRouter = Router()

protectedRouter.post('/costumer', costumerRoute)

protectedRouter.post('/employee', authMiddleware(['employee', 'admin']), employeeRoute)

protectedRouter.post('/admin', authMiddleware(['admin']), adminRoute)

export default protectedRouter