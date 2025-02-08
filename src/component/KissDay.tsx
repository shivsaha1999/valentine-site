import React from 'react';

const KissDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-purple-100 text-center">
      <h1 className="text-4xl text-purple-500 mb-4">Happy Kiss Day!</h1>
      <p className="text-xl text-purple-400 mb-6">A kiss for you!</p>
      <button className="m-2 px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600">Kiss Back</button>
    </div>
  );
};

export default KissDay;