import CommentController from "@controllers/Comment";
import { Router } from "express";

const router = Router();

router.post("/", CommentController.createComment);

export default router;