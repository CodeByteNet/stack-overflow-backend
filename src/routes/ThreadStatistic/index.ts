import ThreadStatisticController from "@controllers/ThreadStatistic";
import { Router } from "express";

const router = Router();

router.get("/thread/:threadId", ThreadStatisticController.getThreadStatisticByThreadId);

router.patch("/thead/:threadId/user/:userId", ThreadStatisticController.updateThreadStatisticByThreadId);

export default router;