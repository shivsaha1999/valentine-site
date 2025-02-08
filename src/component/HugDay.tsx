import React from 'react';

const HugDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-100 text-center">
      <h1 className="text-4xl text-green-500 mb-4">Happy Hug Day!</h1>
      <p className="text-xl text-green-400 mb-6">Sending you a warm hug!</p>
      <button className="m-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Hug Back</button>
    </div>
  );
};

export default HugDay;