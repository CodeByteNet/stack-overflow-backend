import authorizationRouter from "@routes/Authorization/index";
import { Router } from "express";

const router = Router();

router.use("/auth", authorizationRouter);

export default router; 