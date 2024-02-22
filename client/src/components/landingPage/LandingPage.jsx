import React from 'react';
import './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

function MyButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home')
  }
  return (
    <button onClick={handleClick}>
      Home page
    </button>
  );
}

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}

