import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";

const HomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = getTokenFromLocalStorage();
      token ? navigate("/dashboard") : navigate("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

    return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1948A6FF",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <h1>Welcome</h1>
        </div>
      );
    
};

export default HomeScreen;
