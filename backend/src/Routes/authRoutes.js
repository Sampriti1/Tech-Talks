import { Router } from "express";
import { signup, login, me } from "../controller/authController.js";
import { protect } from "../middleware/auth.js";
import {upload} from "../middleware/upload.js";

const router = Router();

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);
router.get("/me", protect, me);

export default router;
