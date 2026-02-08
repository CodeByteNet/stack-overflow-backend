import topicsRouter from "@routes/Topic/index";
import threadsRouter from "@routes/Thread/index";
import ThreadCommentRouter from "@routes/ThreadComment/index";
import authorizationRouter from "@routes/Authorization/index";
import threadStatisticRouter from "@routes/ThreadStatistic/index";
import { Router } from "express";

const router = Router();

router.use("/auth", authorizationRouter);

router.use("/topics", topicsRouter);

router.use("/threads", threadsRouter);

router.use("/thread/comments", ThreadCommentRouter);

router.use("/thread", threadStatisticRouter);

export default router; 