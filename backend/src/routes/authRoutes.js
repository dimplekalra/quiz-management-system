import { Router } from "express";
import { adminLogin, adminSignup } from "../controllers/authController.js";

const router = Router();

router.post("/admin/login", adminLogin);
router.post("/admin/signup", adminSignup);

export default router;
