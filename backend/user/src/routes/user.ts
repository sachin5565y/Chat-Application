import express from "express";
import { getAllUsers, getAUser, loginUser, myprofile, updateName, verifyUser } from "../cantrollers/user.js"
import { isAuth } from "../middleware/isAuth.js";

 const router = express.Router();

router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me", isAuth, myprofile);
router.get("/user/all", isAuth, getAllUsers);
router.get("/user/:id", getAUser);
router.post("/update/user", isAuth, updateName);

export default router;