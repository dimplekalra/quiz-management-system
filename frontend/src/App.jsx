import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PublicQuizList from "./pages/PublicQuizList.jsx";
// import QuizPlayer from "./pages/QuizPlayer.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PublicQuizList />} />
        <Route path="/quiz/:id" element={<QuizPlayer />} /> */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
