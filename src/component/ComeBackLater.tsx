import React, { useState, useEffect } from 'react';

const ComeBackLater: React.FC = () => {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeDiff = nextDay.getTime() - now.getTime();

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to set the countdown immediately

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl text-gray-500 mb-4">Come Back Later</h1>
      <p className="text-xl text-gray-400 mb-6">This page is not available yet. Please come back later.</p>
      <p className="text-lg text-gray-500">Time until next page to open: {countdown}</p>
    </div>
  );
};

export default ComeBackLater;