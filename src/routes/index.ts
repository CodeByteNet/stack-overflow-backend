import topicsRouter from "@routes/Topic/index";
import threadsRouter from "@routes/Thread/index";
import ThreadCommentRouter from "@routes/ThreadComment/index";
import authorizationRouter from "@routes/Authorization/index";
import { Router } from "express";

const router = Router();

router.use("/auth", authorizationRouter);

router.use("/topics", topicsRouter);

router.use("/threads", threadsRouter);

router.use("/ThreadComments", ThreadCommentRouter);

export default router; 