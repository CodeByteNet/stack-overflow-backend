import TopicController from "@controllers/Topic";
import { Router } from "express";

const router = Router();

router.get("/", TopicController.getAllTopics);

router.post("/new-topic", TopicController.createTopic);

export default router;