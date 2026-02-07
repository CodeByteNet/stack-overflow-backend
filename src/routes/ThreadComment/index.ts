import ThreadCommentController from "@controllers/ThreadComment";
import { Router } from "express";

const router = Router();

router.post("/", ThreadCommentController.createThreadComment);

export default router;