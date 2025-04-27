import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/common/ProtectedRoute";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
// import Dashboard from "./pages/common/Dashboard";
import Layout from "./pages/common/Layout";
import PageNotFound from "./pages/common/PageNotFound";
import ChatScreen from "./pages/chat/ChatScreen";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/signup/SignUpPage";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* <Route path="/dashboard" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/dashboard/chat" element={<ChatScreen />} /> */}
            <Route path="/chat" element={<ChatScreen />} />
          </Route>
        </Route>

        {/* Fallback Route (404) */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
