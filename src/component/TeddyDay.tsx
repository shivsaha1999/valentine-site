import React, { useState, useEffect } from "react";
import emailjs from 'emailjs-com';
import pinkiOctopusGif from '../assets/pinki-octopus.gif'; // Import the gif

const TeddyDay: React.FC = () => {
  const numTeddies = 7;
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const [clickedTeddies, setClickedTeddies] = useState<{ index: number; hint: string }[]>([]);
  const [attempts, setAttempts] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const resetGame = () => {
    setPrizeIndex(Math.floor(Math.random() * numTeddies));
    setClickedTeddies([]);
    setAttempts(5);
    setGameOver(false);
    setWon(false);
    setShowModal(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const getHint = (index: number) => {
    if (prizeIndex === null) return "🐾 Oops!";
    const distance = Math.abs(prizeIndex - index);
    if (distance === 0) return "🎁";
    if (distance === 1) return "💖";
    return "❄️";
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: 'socialshivangi.2806@gmail.com',
      message: 'He won himself the octopus gift!'
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  const handleClick = (index: number) => {
    if (gameOver || clickedTeddies.some(teddy => teddy.index === index)) return;

    const hint = getHint(index);
    setClickedTeddies([...clickedTeddies, { index, hint }]);

    if (hint === "🎁") {
      setWon(true);
      setGameOver(true);
      setShowModal(true);
      sendEmail(); // Send email when the user wins
    } else {
      setAttempts(attempts - 1);
      if (attempts - 1 === 0) setGameOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-yellow-100 text-center p-6 relative font-cute">
      <h1 className="text-5xl text-yellow-800 mb-4 font-bold">🎀 Teddy Hug Hunt 🧸💕</h1>
      
      {/* How to Play Section */}
      <div className="bg-white p-4 rounded-lg shadow-md text-yellow-700 mb-4 w-100 text-lg border-2 border-yellow-300">
        <h2 className="text-xl font-bold">✨ How to Play ✨</h2>
        <p>1️⃣ Click on a Teddy to give it a hug! 🤗</p>
        <p>2️⃣ It'll tell you if you're close to finding the **PRIZE** 🎁.</p>
        <p>3️⃣ You have **{attempts} hugs** left. Use them wisely! 💖</p>
      </div>

      {/* Attempts Counter */}
      <p className="text-2xl font-bold text-red-600 mb-2">Hugs Left: {attempts} 🤗</p>

      {/* Floating Teddy Bears */}
      <div className="relative w-full h-[60vh] flex justify-center items-center">
        {Array.from({ length: numTeddies }).map((_, index) => {
          const clickedTeddy = clickedTeddies.find(teddy => teddy.index === index);
          return (
            <button
              key={index}
              className={`absolute w-28 h-28 text-3xl font-bold bg-yellow-300 rounded-full flex justify-center items-center shadow-lg transform transition-all duration-300
                ${gameOver ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400"}
                `}
              onClick={() => handleClick(index)}
              disabled={gameOver}
              style={{
                top: `${Math.random() * 60 + 20}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
            >
              {clickedTeddy ? (
                <span className="text-xl">{clickedTeddy.hint}</span>
              ) : (
                <span className="text-3xl">🧸</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Game Over Message */}
      {gameOver && !won && <p className="text-2xl text-red-600 mt-4">Game Over! Try Again! 😢</p>}

      {/* Try Again Button */}
      {gameOver && (
        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600"
          onClick={resetGame}
          disabled={won}
        >
          {won ? "Already Won" : "🔄 Try Again"}
        </button>
      )}

      {/* Prize Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-4 border-yellow-300">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              🎉 Yay! You Found the Prize! 🎁🧸
            </h2>
            <img
              src={pinkiOctopusGif}
              alt="Prize"
              className="w-48 h-48 mx-auto"
            />
            <button
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600"
              onClick={() => setShowModal(false)}
            >
              🎀 Close
            </button>
          </div>
        </div>
      )}

      {/* Hint Guide */}
      <div className="bg-white p-4 rounded-lg shadow-md text-yellow-700 mt-2 w-100 text-lg border-2 border-yellow-300">
        <h2 className="text-mg font-bold">🐻 Hint Guide 🧸</h2>
        <p>💖 **Hug Warmer!** → You are **very close** to win!</p>
        <p>❄ **Too Cold!** → You are **far away** from the prize .</p>
        <p>🎁 **You found it!** → Yay! 🎉</p>
      </div>
    </div>
  );
};

export default TeddyDay;