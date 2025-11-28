import Quiz from "../models/Quiz.js";

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const newQuiz = new Quiz({ title, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};
