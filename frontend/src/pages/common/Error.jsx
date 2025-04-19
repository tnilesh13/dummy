import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
        Oops! Page not found.
      </p>
      <p style={{ fontSize: "1rem", margin: "10px 0" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={goHome}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;