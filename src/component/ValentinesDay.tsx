import React from 'react';

const ValentinesDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-100 text-center">
      <h1 className="text-4xl text-red-500 mb-4">Happy Valentine's Day!</h1>
      <p className="text-xl text-red-400 mb-6">Celebrating love and togetherness.</p>
      <button className="m-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Celebrate</button>
    </div>
  );
};

export default ValentinesDay;