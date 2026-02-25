import express from "express";
import { loginUser } from "../cantrollers/user.js"

 const router = express.Router();

 router.post("/login", loginUser);

export default router;