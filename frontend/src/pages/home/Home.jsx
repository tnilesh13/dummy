import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";

const HomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = getTokenFromLocalStorage();
      token ? navigate("/chat") : navigate("/login"); // /dashboard
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-800 text-white text-4xl font-bold">
      <h1 className="animate-fade-in">Welcome</h1>
    </div>
  );
};

export default HomeScreen;
