import React from 'react';

const ChocolateDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-brown-100 text-center">
      <h1 className="text-4xl text-brown-500 mb-4">Happy Chocolate Day!</h1>
      <p className="text-xl text-brown-400 mb-6">Enjoy this sweet treat!</p>
      <img src="/path/to/chocolate-image.jpg" alt="Chocolate" className="mb-6" />
      <button className="m-2 px-4 py-2 text-white bg-brown-500 rounded hover:bg-brown-600">Yum!</button>
    </div>
  );
};

export default ChocolateDay;