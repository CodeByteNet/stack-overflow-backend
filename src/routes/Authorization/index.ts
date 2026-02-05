import AuthorizationController from "@controllers/Authorization";
import { Router } from "express";

const router = Router();

router.post("/register", AuthorizationController.signUp);

router.post("/login", AuthorizationController.signIn);

export default router;