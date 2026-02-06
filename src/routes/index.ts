import authorizationRouter from "@routes/Authorization/index";
import topicsRouter from "@routes/Topic/index";
import { Router } from "express";

const router = Router();

router.use("/auth", authorizationRouter);

router.use("/topics", topicsRouter);

export default router; 