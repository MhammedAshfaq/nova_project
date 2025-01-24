import express from "express";
import { userRegister, userlogin } from "../controllers/auth";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userlogin);

export default router;
