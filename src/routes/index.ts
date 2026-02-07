import topicsRouter from "@routes/Topic/index";
import threadsRouter from "@routes/Thread/index";
import commentRouter from "@routes/Comment/index";
import authorizationRouter from "@routes/Authorization/index";
import { Router } from "express";

const router = Router();

router.use("/auth", authorizationRouter);

router.use("/topics", topicsRouter);

router.use("/threads", threadsRouter);

router.use("/comments", commentRouter);

export default router; 