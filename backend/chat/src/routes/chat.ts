import Express  from "express";
import isAuth from "../middlewares/isAuth.js";
import { createNewChat } from "../controllers/chat.js";
const router = Express.Router();
export default router;

router.post("/chat/new",isAuth,createNewChat)
