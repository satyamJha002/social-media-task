import React from "react";
import UserSubmissionForm from "./component/UserSubmission";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./component/AdminLoginForm";
import AdminDashboard from "./component/Dashboard/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserSubmissionForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
