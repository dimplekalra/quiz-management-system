import { useEffect } from "react";
import axios from "axios";
import QuizEditor from "../components/QuizEditor.jsx";

function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/quizzes", {
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

      <h3>Existing Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
