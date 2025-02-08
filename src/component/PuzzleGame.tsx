import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import proposedayGif from '../assets/proposeday.gif'; // Import the proposeday.gif

const PuzzleGame: React.FC = () => {
  const [pieces, setPieces] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]); // 0 represents the empty space
  const [completed, setCompleted] = useState<boolean>(false);
  const [yesButtonSize, setYesButtonSize] = useState<number>(1);
  const [yesClicked, setYesClicked] = useState<boolean>(false);
  const [completeClickCount, setCompleteClickCount] = useState<number>(0);

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePieceClick = (index: number) => {
    const newPieces = [...pieces];
    const emptyIndex = newPieces.indexOf(0);
    if (
      index === emptyIndex - 1 ||
      index === emptyIndex + 1 ||
      index === emptyIndex - 3 ||
      index === emptyIndex + 3
    ) {
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      checkCompletion(newPieces);
    }
  };

  const checkCompletion = (pieces: number[]) => {
    if (pieces.join('') === '123456780') {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setPieces(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]));
    setCompleted(false);
    setYesButtonSize(1);
    setYesClicked(false);
    setCompleteClickCount(0);
    sendEmail('Reset Puzzle', 'PuzzleGame');
  };

  const completePuzzle = () => {
    if (completeClickCount === 2) {
      setPieces([1, 2, 3, 4, 5, 6, 7, 8, 0]);
      setCompleted(true);
    } else {
      setCompleteClickCount(completeClickCount + 1);
    }
    sendEmail('Complete Puzzle', 'PuzzleGame');
  };

  const handleNoClick = () => {
    setYesButtonSize(yesButtonSize + 1);
    sendEmail('No', 'PuzzleGame');
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setYesButtonSize(1);
    sendEmail('Yes', 'PuzzleGame');
  };

  const sendEmail = (buttonName: string, folderName: string) => {
    const templateParams = {
      to_email: 'socialshivangi.2806@gmail.com',
      message: `Button: ${buttonName}, Folder: ${folderName}`
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  const getCompleteMessage = () => {
    switch (completeClickCount) {
      case 0:
        return "Ohh you didn't try the puzzle?";
      case 1:
        return "It's Hard? but I thought you love games?";
      case 2:
        return "Ok baby, I will give you a free pass.";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-1">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`w-20 h-20 flex items-center justify-center border ${piece === 0 ? 'bg-gray-200' : 'bg-pink-300'}`}
            onClick={() => handlePieceClick(index)}
          >
            {piece !== 0 && piece}
          </div>
        ))}
      </div>
      {completed && !yesClicked && (
        <div className="mt-4 text-green-500 flex flex-col items-center">
          <p>You complete me! Will you be my Valentine?</p>
          <div className="mt-4 flex">
            <button
              onClick={handleYesClick}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              style={{ transform: `scale(${yesButtonSize})`, marginRight: '50px' }}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              No
            </button>
          </div>
        </div>
      )}
      {yesClicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <p className="text-green-500">You make me sooooo happy by saying YES.</p>
            <div className="mt-4">
              <div className="confetti">🎉🎉🎉</div>
              <img src={proposedayGif} alt="Propose Day Gif" className="mt-4" /> {/* Add the proposeday.gif */}
            </div>
            <button
              onClick={() => setYesClicked(false)}
              className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {!completed && completeClickCount > 0 && (
        <div className="mt-4 text-red-500 flex flex-col items-center">
          <p>{getCompleteMessage()}</p>
        </div>
      )}
      <button onClick={resetGame} className="mt-4 px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600">
        Reset Puzzle
      </button>
      <button onClick={completePuzzle} className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
        Complete Puzzle
      </button>
    </div>
  );
};

export default PuzzleGame;