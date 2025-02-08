import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Confetti from 'react-confetti';
import '../index.css'; // Make sure to import the CSS file where the animation is defined
import rosedayGif from '../assets/roseday.gif'; // Import the gif

const RoseDay: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility

  const handleButtonClick = () => {
    setShowConfetti(true);
    setShowModal(true); // Show the modal
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    sendEmail(); // Send email when button is clicked
  };

  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: 'socialshivangi.2806@gmail.com',
      message: 'He said Yes For Rose Day!!'
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-pink-100 text-center p-4">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold text-red-700 mb-4 z-10">Happy Rose Day!</h1>
      <p className="text-xl font-semibold text-red-600 mb-6 z-10">Will you accept this rose?</p>

      {/* Personal Message */}
      <section className="mb-6 z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dear SATYAM,</h2>
        <p className="text-lg font-medium text-gray-700">You are special to me because I really do care about you a lot. I want to celebrate Rose Day with you because I remember the first time you gave me a rose and now it's my time to show and give you the love you gave me.</p>
      </section>

      {/* Why Roses? */}
      <section className="mb-6 z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Roses?</h2>
        <p className="text-lg font-medium text-gray-700">Obviously Because it's ROSE Day .... Duhhhhh!!!!! </p>
      </section>

      {/* Rose Day Proposal */}
      <section className="mb-6 z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Rose Day Proposal</h2>
        <p className="text-lg font-medium text-gray-700">Would you like to celebrate Rose Day together?&nbsp;
        <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-4"
            onClick={handleButtonClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            Yes!
          </button>
        </p>
        <p className={`text-lg font-medium text-gray-700 mt-2 ${showMessage ? 'fade-in visible' : 'invisible'}`}>
          What are you waiting for? Searching for a No??? That's not an option.
        </p>
      </section>

      {/* Add cute gif */}
      <img src={rosedayGif} alt="Rose Day Gif" className="absolute bottom-0 w-full h-auto blur" />

      {/* Disclaimer */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg border border-gray-300 shadow-lg">
        <p className="text-sm text-gray-600">
          Yeah, I know Rose Day is passed, but better late than never. Right?
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform translate-x-10">
            <h2 className="text-2xl font-bold mb-4">Whoa, You Actually Said Yes?!</h2>
            <p className="text-lg">Congratulations! You've signed up for an exclusive, one-time, non refundable , lifelong supply of imaginary roses. </p>
            <button 
              className="mt-4 bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={closeModal}
            >
              Close (But not you Heart 🩷)
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default RoseDay;