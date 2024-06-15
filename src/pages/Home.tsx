// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Welcome to the Quiz Platform</h1>
      <Link to="/quiz" className="mr-4 btn btn-primary">Take Quiz</Link>
      {/* <Link to="/admin" className="btn btn-secondary">Admin Panel</Link> */}
    </div>
  );
};

export default Home;

