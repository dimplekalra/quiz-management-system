import { Router } from "express";
import {
  getAllQuizzes,
  createQuiz,
  getQuizById,
} from "../controllers/quizController.js";

const router = Router();

router.get("/", getAllQuizzes);
router.post("/", createQuiz);
router.get("/:id", getQuizById);

export default router;
