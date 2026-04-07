import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CreateJob from "./pages/CreateJob";
import JobDetails from "./pages/JobDetails";
import Applicants from "./pages/Applicants";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-job" element={<AdminRoute><CreateJob /></AdminRoute>} />
        <Route path="/jobs/:id" element={<JobDetails/>} />
        <Route path="/jobs/:id/applicants" element={<Applicants/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;