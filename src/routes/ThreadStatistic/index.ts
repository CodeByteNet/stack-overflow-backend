import ThreadStatisticController from "@controllers/ThreadStatistic";
import { Router } from "express";

const router = Router();

router.get("/:threadId", ThreadStatisticController.getThreadStatisticByThreadId);

router.patch("/:threadId/:userId", ThreadStatisticController.updateThreadStatisticByThreadId);

export default router;