import { Router } from "express";
import {
  userLogin,
  userSignUp,
} from "../controller/authController";
import { validateSignupBody,validateLoginBody } from "../middleware/bodyValidator/signUpValidator";

const router = Router();
router.post("/signup", validateSignupBody, userSignUp);
router.post("/login", validateLoginBody, userLogin);

export default router;
