import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

export default router;
