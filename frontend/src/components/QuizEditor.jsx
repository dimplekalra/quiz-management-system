import { useState } from "react";
import instance from "../api/axios";

function QuizEditor() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", type: "mcq", options: ["", ""], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await instance.post(
        "/quizzes",
        { title, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Quiz created successfully!");
      setTitle("");
      setQuestions([]);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
  };

  return (
    <div>
      <h2>Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Questions</h3>
          {questions.map((q, index) => (
            <div key={`q-${index}`}>
              <label>Question {index + 1}:</label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestion(index, "text", e.target.value)}
                required
              />
              <select
                name=""
                value={q.type}
                onChange={(e) => updateQuestion(index, "type", e.target.value)}
              >
                <option value="mcq">Multiple Choice</option>
                <option value="tf">True/False</option>
                <option value="text">Text</option>
              </select>

              {q.type === "mcq" && (
                <div>
                  <h4>Options</h4>
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(index, oIndex, e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index, oIndex)}
                      >
                        Remove Option
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addOption(index)}>
                    Add Option
                  </button>
                  Correct Answer Index:
                  <input
                    type="number"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(
                        index,
                        "correctAnswer",
                        parseInt(e.target.value, 10)
                      )
                    }
                    required
                  />
                </div>
              )}
              {q.type === "tf" && (
                <div>
                  Correct Answer:
                  <select
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(
                        index,
                        "correctAnswer",
                        e.target.value === "0" ? 0 : 1
                      )
                    }
                  >
                    <option value={0}>True</option>
                    <option value={1}>False</option>
                  </select>
                </div>
              )}
              {q.type === "text" && (
                <div>
                  Correct Answer:
                  <input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(index, "correctAnswer", e.target.value)
                    }
                    required
                  />
                </div>
              )}
              <button onClick={() => removeQuestion(index)}>
                {" "}
                Remove Question
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default QuizEditor;
