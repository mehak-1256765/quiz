import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">Welcome to the Quiz Platform</h1>
      <div className="flex space-x-4">
        <Link to="/quiz" className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
          Take Quiz
        </Link>
        <Link to="/admin" className="px-6 py-3 text-lg font-semibold text-blue-500 bg-white border border-blue-500 rounded hover:text-white hover:bg-blue-500">
          Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default Home;


