import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import kissMusic from "../assets/kiss-music.mp4"; // Import the video file

const ValentinesDay: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showCelebrateMessage, setShowCelebrateMessage] = useState(false);

  // Play the video and hide messages
  const handlePlayAgain = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    setShowMessage(false);
    setShowCelebrateMessage(false);
  };

  // Show celebration message when video ends
  const handleVideoEnd = () => {
    setShowMessage(true);
    setTimeout(() => setShowCelebrateMessage(false), 5000); // Hide message after 5s
  };

  // Handle Celebrate Button Click
  const handleCelebrate = () => {
    setShowCelebrateMessage(true);

    // Fire Emoji Confetti
    const duration = 3 * 1000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const confettiLoop = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      confetti({
        particleCount: 2,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      requestAnimationFrame(confettiLoop);
    };

    confettiLoop();
  };

  return (
    <div className={`relative flex flex-col justify-center items-center h-screen bg-white text-center ${showCelebrateMessage ? 'love-bg' : ''}`}>
      <video 
        ref={videoRef}
        src={kissMusic} 
        autoPlay 
        controls
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      {showCelebrateMessage && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-red-500 text-white text-center z-20">
          Don't you think you should call me to celebrate?
        </div>
      )}
      {showMessage && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white z-10">
          <h1 className="text-4xl text-red-500 mb-4">Happy Valentine's Day!</h1>
          <p className="text-xl text-red-400 mb-6">I will for sure won't stop until I make you mine</p>
          <button 
            onClick={handleCelebrate} 
            className="m-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Celebrate
          </button>
          <button 
            onClick={handlePlayAgain} 
            className="m-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Play Again
          </button>
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div> {/* Add a dark overlay */}
    </div>
  );
};

export default ValentinesDay;