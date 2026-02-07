import ThreadController from "@controllers/Thread";
import { Router } from "express";

const router = Router();

router.get("/:topicId", ThreadController.getAllThreadsByTopicId);

router.post("/", ThreadController.createThread);

router.get("/:threadId/content", ThreadController.getThreadContentByThreadId);

export default router;