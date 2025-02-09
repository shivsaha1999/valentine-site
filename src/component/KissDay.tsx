import React, { useState } from 'react';
import Confetti from 'react-confetti';
import kissGif from '../assets/kiss.gif'; // Add a kiss GIF

const KissDay: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleKissBack = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-purple-100 text-center">
      <h1 className="text-4xl text-purple-500 mb-4">Happy Kiss Day!</h1>
      <p className="text-xl text-purple-400 mb-6">A kiss for you!</p>
      <button onClick={handleKissBack} className="m-2 px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600">Kiss Back</button>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">You kissed back! 💋</h2>
            <img src={kissGif} alt="Kiss Gif" className="w-48 h-48 mx-auto mb-4" />
            <p className="text-lg">Sending you lots of love and kisses!</p>
            <button 
              className="mt-4 bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showModal && <Confetti />}
    </div>
  );
};

export default KissDay;