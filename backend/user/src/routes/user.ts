import express from "express";
import { loginUser, myprofile, verifyUser } from "../cantrollers/user.js"
import { isAuth } from "../middleware/isAuth.js";

 const router = express.Router();

 router.post("/login", loginUser);
 router.post("/verify", verifyUser);
 router.get("/me",isAuth,myprofile);

export default router;