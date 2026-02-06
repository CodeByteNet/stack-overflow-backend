import TopicController from "@controllers/Topic";
import { Router } from "express";

const router = Router();

router.get("/", TopicController.getAllTopics);

router.post("/", TopicController.createTopic);

export default router;