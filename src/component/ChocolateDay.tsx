import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import chocoImage from '../assets/choco.jpg';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-[#5C4033] p-6 rounded shadow-lg z-10">
        <button className="absolute top-2 right-2 text-white font-bold" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const ChocolateDay: React.FC = () => {
  const [vote, setVote] = useState<string | null>(null);
  const [quizTaken, setQuizTaken] = useState(false);
  const [chocolateName, setChocolateName] = useState('');
  const [chocolateSubmitted, setChocolateSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoveMessage, setShowLoveMessage] = useState(false);

  const handleVote = (chocolateType: string) => {
    setVote(chocolateType);
    sendEmail('Vote', chocolateType);
  };

  const handleQuiz = () => {
    setQuizTaken(true);
    setIsModalOpen(true);
  };

  const handleChocolateSubmit = () => {
    setChocolateSubmitted(true);
    sendEmail('Chocolate Name', chocolateName);
  };

  const handleQuizAnswerChange = (question: string, answer: string) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleQuizSubmit = () => {
    const darkCount = Object.values(quizAnswers).filter((answer) => answer === 'Dark').length;
    const milkCount = Object.values(quizAnswers).filter((answer) => answer === 'Milk').length;
    const whiteCount = Object.values(quizAnswers).filter((answer) => answer === 'White').length;

    if (darkCount > milkCount && darkCount > whiteCount) {
      setQuizResult('Dark Chocolate Lover');
    } else if (milkCount > darkCount && milkCount > whiteCount) {
      setQuizResult('Milk Chocolate Lover');
    } else if (whiteCount > darkCount && whiteCount > milkCount) {
      setQuizResult('White Chocolate Lover');
    } else {
      setQuizResult('Mixed Chocolate Lover');
    }
    setIsModalOpen(false);
    sendEmail('Quiz Result', quizResult || 'No Result');
  };

  const sendEmail = (subject: string, message: string) => {
    const templateParams = {
      to_email: 'socialshivangi.2806@gmail.com',
      message: `Subject: ${subject}, Message: ${message}`
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  if (showLoveMessage) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-center">
          <p className="text-8xl text-white font-bold">YOU 😉</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p className="text-sm text-white font-bold">Did I make you BLUSH Babe? Be Honest!!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-screen text-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${chocoImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      ></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full bg-black bg-opacity-50">
        <h1 className="text-4xl text-white mb-4 font-bold">Happy Chocolate Day!</h1>
        <p className="text-xl text-white mb-6 font-bold">Enjoy this sweet treat!</p>
        <button className="m-2 px-4 py-2 text-white bg-brown-500 rounded hover:bg-brown-600 font-bold">Yum!</button>

        <div className="mt-8">
          <h2 className="text-3xl text-white mb-4 font-bold">Vote for Your Favorite Chocolate</h2>
          <div>
            <button onClick={() => handleVote('Dark')} style={{ backgroundColor: '#5C4033' }} className="m-2 px-4 py-2 text-white rounded hover:bg-opacity-75 font-bold">Dark</button>
            <button onClick={() => handleVote('Milk')} style={{ backgroundColor: '#5C4033' }} className="m-2 px-4 py-2 text-white rounded hover:bg-opacity-75 font-bold">Milk</button>
            <button onClick={() => handleVote('White')} style={{ backgroundColor: '#5C4033' }} className="m-2 px-4 py-2 text-white rounded hover:bg-opacity-75 font-bold">White</button>
          </div>
        </div>

        {vote && !chocolateSubmitted && (
          <div className="mt-8">
            <h2 className="text-3xl text-white mb-4 font-bold">Name the chocolate you like</h2>
            <input
              type="text"
              value={chocolateName}
              onChange={(e) => setChocolateName(e.target.value)}
              className="mb-4 p-2 border rounded"
              placeholder="Enter chocolate name..."
            />
            <button onClick={handleChocolateSubmit} className="m-2 px-4 py-2 text-white bg-brown-500 rounded hover:bg-brown-600 font-bold">Submit</button>
          </div>
        )}

        {chocolateSubmitted && (
          <div className="mt-8">
            <h2 className="text-3xl text-white mb-4 font-bold">Thanks for providing the details!</h2>
            <p className="text-xl text-white mb-6 font-bold">Great Choice !! Your chocolate is on the way.</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-3xl text-white mb-4 font-bold">What's Your Chocolate Personality?</h2>
          {!quizTaken ? (
            <button onClick={handleQuiz} className="m-2 px-4 py-2 text-white bg-brown-500 rounded hover:bg-brown-600 font-bold">Take the Quiz</button>
          ) : (
            <>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3 className="text-2xl mb-4 font-bold">Answer the following questions:</h3>
                <div className="mb-4">
                  <p className="text-xl font-bold">1. What type of chocolate do you like mostly?</p>
                  <button onClick={() => handleQuizAnswerChange('question1', 'Dark')} className="m-2 px-4 py-2 text-white bg-dark-500 rounded hover:bg-dark-600 font-bold">Dark</button>
                  <button onClick={() => handleQuizAnswerChange('question1', 'Milk')} className="m-2 px-4 py-2 text-white bg-milk-500 rounded hover:bg-milk-600 font-bold">Milk</button>
                  <button onClick={() => handleQuizAnswerChange('question1', 'White')} className="m-2 px-4 py-2 text-white bg-white-500 rounded hover:bg-white-600 font-bold">White</button>
                </div>
                <div className="mb-4">
                  <p className="text-xl font-bold">2. What type of chocolate do you like in desserts?</p>
                  <button onClick={() => handleQuizAnswerChange('question2', 'Dark')} className="m-2 px-4 py-2 text-white bg-dark-500 rounded hover:bg-dark-600 font-bold">Dark</button>
                  <button onClick={() => handleQuizAnswerChange('question2', 'Milk')} className="m-2 px-4 py-2 text-white bg-milk-500 rounded hover:bg-milk-600 font-bold">Milk</button>
                  <button onClick={() => handleQuizAnswerChange('question2', 'White')} className="m-2 px-4 py-2 text-white bg-white-500 rounded hover:bg-white-600 font-bold">White</button>
                </div>
                <div className="mb-4">
                  <p className="text-xl font-bold">3. What type of chocolate do you like in beverages?</p>
                  <button onClick={() => handleQuizAnswerChange('question3', 'Dark')} className="m-2 px-4 py-2 text-white bg-dark-500 rounded hover:bg-dark-600 font-bold">Dark</button>
                  <button onClick={() => handleQuizAnswerChange('question3', 'Milk')} className="m-2 px-4 py-2 text-white bg-milk-500 rounded hover:bg-milk-600 font-bold">Milk</button>
                  <button onClick={() => handleQuizAnswerChange('question3', 'White')} className="m-2 px-4 py-2 text-white bg-white-500 rounded hover:bg-white-600 font-bold">White</button>
                </div>
                <button onClick={handleQuizSubmit} className="m-2 px-4 py-2 text-white bg-brown-500 rounded hover:bg-brown-600 font-bold">Submit Quiz</button>
              </Modal>
              {quizResult && (
                <div className="mt-8">
                  <h3 className="text-2xl mb-4 font-bold">Your Chocolate Personality:</h3>
                  <p className="text-xl text-white font-bold">{quizResult}</p>
                  <p className="text-xl text-white font-bold"> Ohh so you Love thesee!!!!! But you know what I Love??</p>
                  <button onClick={() => setShowLoveMessage(true)} className="m-2 px-4 py-2 text-white bg-[#5C4033] rounded hover:bg-[#3e2a1f] font-bold transition duration-300 ease-in-out transform hover:scale-105">What?</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChocolateDay;