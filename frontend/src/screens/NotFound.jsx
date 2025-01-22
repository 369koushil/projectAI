import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={goToHome}
        className="px-6 py-2 text-white bg-orange hover:bg-darkblue rounded shadow"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
