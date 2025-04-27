import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold mb-4 animate-bounce text-blue-600">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-2">Oops! Page not found.</p>
      <p className="text-base md:text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist or might have been moved.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-600 text-white text-sm md:text-base font-medium rounded shadow hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
