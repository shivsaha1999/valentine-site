import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import virtualHugGif from '../assets/virtual-hug.gif';
import hugBackGif from '../assets/hug-back.gif'; // Import the hug-back gif

const HugDay: React.FC = () => {
  const [huggedBack, setHuggedBack] = useState(false);

  const handleHugBack = () => {
    setHuggedBack(true);
    sendEmail(); // Send email when button is clicked
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: 'recipient@example.com',
      message: 'He sends you big big hugs!'
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div className={`flex flex-col justify-center items-center h-screen text-center ${huggedBack ? 'bg-white' : 'bg-green-100'}`}> {/* Change background color conditionally */}
      <h1 className="text-4xl text-green-500 mb-4">Happy Hug Day!</h1>
      <p className="text-xl text-green-400 mb-6">Sending you a warm hug!</p>
      <div className="relative mb-6" style={{ width: '300px', height: '300px' }}> {/* Set a fixed size for the container */}
        <img src={huggedBack ? hugBackGif : virtualHugGif} alt="Hug Gif" className="absolute inset-0 w-full h-full object-cover" /> {/* Make the gif fill the container */}
      </div>
      <button onClick={handleHugBack} className="m-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Hug Back</button>
      {huggedBack && <p className="text-xl text-green-400 mt-4">Don't you think you are hugging a little too tight. BABE 💗</p>} {/* Show message when hugged back */}
    </div>
  );
};

export default HugDay;