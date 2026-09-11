import { Router } from "express";
import { costumerRoute, employeeRoute, adminRoute } from "../controllers/protectedController.js";

const protectedRouter = Router()

protectedRouter.post('/costumer', costumerRoute)

protectedRouter.post('/employee', employeeRoute)

protectedRouter.post('/admin', adminRoute)

export default protectedRouter