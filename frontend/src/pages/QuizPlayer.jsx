import { useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios";

function QuizPlayer() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await instance.get(`/quizzes/${id}`);
      setQuiz(response.data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };
  useState(() => {
    fetchQuiz();
  }, [id]);
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!quiz) {
    return <div>Quiz not found.</div>;
  }
  return (
    <div>
      <h2>{quiz.title}</h2>
      {showScore ? (
        <div>
          You scored {score} out of {quiz.questions.length}
        </div>
      ) : (
        <div>
          <div>
            <span>Question {currentQuestionIndex + 1}</span>/
            {quiz.questions.length}
          </div>
          <div>
            <div>{quiz.questions[currentQuestionIndex].text}</div>
          </div>
          <div>
            {quiz.questions[currentQuestionIndex].type === "mcq" && (
              <>
                <div>Choose the correct option:</div>
                {quiz.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerOptionClick(
                          index ===
                            Number(
                              quiz.questions[currentQuestionIndex].correctAnswer
                            )
                        )
                      }
                    >
                      {option}
                    </button>
                  )
                )}
              </>
            )}
            {quiz.questions[currentQuestionIndex].type === "tf" && (
              <>
                {["True", "False"].map((val, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswerOptionClick(
                        index ===
                          Number(
                            quiz.questions[currentQuestionIndex].correctAnswer
                          )
                      )
                    }
                  >
                    {val}
                  </button>
                ))}
              </>
            )}
            {quiz.questions[currentQuestionIndex].type === "text" && (
              <>
                <div>
                  <label>Your Answer:</label>
                  <input type="text" id="textAnswer" />
                </div>
                <button
                  onClick={() => {
                    const userAnswer =
                      document.getElementById("textAnswer").value;
                    handleAnswerOptionClick(
                      userAnswer ===
                        quiz.questions[currentQuestionIndex].correctAnswer
                    );
                  }}
                >
                  Submit Answer
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default QuizPlayer;
