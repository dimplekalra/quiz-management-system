import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../api/axios.js";
import QuizEditor from "../components/QuizEditor.jsx";

function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await instance.get("/quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <QuizEditor />
      {quizzes.length === 0 ? (
        <p>No quizzes available. Please create a new quiz.</p>
      ) : (
        <>
          <h3>Existing Quizzes</h3>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
