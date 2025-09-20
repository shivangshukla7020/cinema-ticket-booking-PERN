import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = ({ initialMinute = 1 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinute * 60);
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate('/');
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-center text-red-600 font-bold text-xl">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default Timer;
