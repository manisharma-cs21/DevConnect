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
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Referrals from "./pages/Referrals";
import Notifications from "./pages/Notifications";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-job" element={<AdminRoute><CreateJob /></AdminRoute>} />
        <Route path="/jobs/:id" element={<JobDetails/>} />
        <Route path="/jobs/:id/applicants" element={<Applicants/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile/>} />
        <Route path="/referrals" element={<AdminRoute><Referrals/></AdminRoute>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;