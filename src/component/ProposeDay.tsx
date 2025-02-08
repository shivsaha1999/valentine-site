import React from 'react';
import PuzzleGame from './PuzzleGame'; // Import the PuzzleGame component

const ProposeDay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pink-100 text-center">
      <h1 className="text-4xl text-pink-500 mb-4">Piece Together Our Love</h1>
      <PuzzleGame /> {/* Render the PuzzleGame component */}
    </div>
  );
};

export default ProposeDay;