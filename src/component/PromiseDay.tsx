import React from 'react';

const PromiseDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-100 text-center">
      <h1 className="text-4xl text-blue-500 mb-4">Happy Promise Day!</h1>
      <p className="text-xl text-blue-400 mb-6">I promise to always be there for you.</p>
      <button className="m-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Promise</button>
    </div>
  );
};

export default PromiseDay;