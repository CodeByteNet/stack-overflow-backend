import ThreadStatisticController from "@controllers/ThreadStatistic";
import { Router } from "express";

const router = Router();

router.get("/:threadId/statistic", ThreadStatisticController.getThreadStatisticByThreadId);

router.patch("/thead/:threadId/user/:userId/statistic", ThreadStatisticController.updateThreadStatisticByThreadId);

export default router;