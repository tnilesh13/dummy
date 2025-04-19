import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/common/ProtectedRoute";
import Login from "./pages/common/Login";
import Home from "./pages/home/home";
import Dashboard from "./pages/common/Dashboard";
import Layout from "./pages/common/Layout";
import PageNotFound from "./pages/common/Error";
import FriendsList from "./pages/friends-list/FriendsList";
import ChatScreen from "./pages/chat/chatScreen";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/friends-list" element={<FriendsList />} />
          <Route path="/dashboard/chat/:userId/:friendId" element={<ChatScreen />} />
          {/* <Route path="/dashboard/roles" element={<Roles />} /> */}
        </Route>
      </Route>

      {/* Fallback Route (404) */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
