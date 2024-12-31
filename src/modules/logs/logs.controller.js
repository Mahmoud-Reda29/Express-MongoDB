import Router from "express";
import { insertOneIntoLog } from "./logs.service.js";
const router = Router();

router.post("/", insertOneIntoLog);



export default router;