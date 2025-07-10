import { getAnalytics } from "../controllers/analyticsController.js";
import { Router } from "express";
const router = Router();
router.get('/:shortId', getAnalytics); 


export default router;