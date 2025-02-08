import React from 'react';

const TeddyDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-yellow-100 text-center">
      <h1 className="text-4xl text-yellow-500 mb-4">Happy Teddy Day!</h1>
      <p className="text-xl text-yellow-400 mb-6">Here's a cute teddy for you!</p>
      <img src="/path/to/teddy-image.jpg" alt="Teddy" className="mb-6" />
      <button className="m-2 px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">Hug</button>
    </div>
  );
};

export default TeddyDay;