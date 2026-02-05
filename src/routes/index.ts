import authorizationRouter from "@routes/Authorization";
import { Router } from "express";

const router = Router();

router.use("/auth", authorizationRouter);

export default router;