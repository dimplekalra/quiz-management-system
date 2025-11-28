import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../api/axios";
import { useEffect } from "react";

function PublicQuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const fetchQuizzes = async () => {
    try {
      const response = await instance.get("/quizzes");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching public quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Public Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicQuizList;
