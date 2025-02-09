import React, { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import loveHeartGif from '../assets/love-heart.gif'; // Import the gif

const PromiseDay: React.FC = () => {
  const [showPromise, setShowPromise] = useState(false);
  const [hisPromise, setHisPromise] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBackground, setShowBackground] = useState(false); // State variable for background visibility
  const promiseRef = useRef<HTMLDivElement>(null);

  const sendEmail = (message: string) => {
    setLoading(true);
    const templateParams = {
      to_email: 'socialshivangi.2806@gmail.com',
      message: message
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setLoading(false);
      }, (err) => {
        console.log('FAILED...', err);
        setLoading(false);
      });
  };

  const handlePromise = (promise: string) => {
    sendEmail(`He promised: ${promise}`);
    setShowPromise(true);
    setShowBackground(true); // Show the background image
    setTimeout(() => {
      promiseRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hisPromise.trim()) {
      sendEmail(`He wrote: ${hisPromise}`);
      setShowConfirmation(true);
      setTimeout(() => {
        promiseRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const promises = [
    "I promise to make you feel wanted, valued, and important in my life. no more Taking you for Granted. I have done that in the past and I definetely wont do it in the future",
    "I promise not to hide my feelings, avoid conversations. I do overthink a lot but I will try to communicate more.",
    "I promise to give you the priority rather than just thinking about myself.",
    "I promise to not hurt you. I know I have done that in the past. Maybe it is too late. But I wont repeat my mistakes",
    "I promise to be there for you and support you even if you just want us to be friends."
  ];

  const circlePositions = [
    { top: '10%', left: '20%' },
    { top: '30%', left: '70%' },
    { top: '60%', left: '90%' },
    { top: '50%', left: '10%' },
    { top: '95%', left: '45%' }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center p-6">
      {showBackground && (
        <img src={loveHeartGif} alt="Love Heart Background" className="absolute inset-0 w-full h-full object-cover z-0" />
      )}
      <div className="absolute top-0 right-0 m-4 p-2 bg-white text-blue-500 rounded-lg shadow-lg z-10">
        Hover over the floating hearts
      </div>
      <div className="relative w-full h-[60vh] flex justify-center items-center z-10">
        {/* Centered Text */}
        <div className="bg-blue-200 p-6 rounded-lg shadow-lg border-4 border-blue-300 w-full max-w-lg relative z-10 mt-[-20px]">
          <div className="absolute top-[-15px] left-[-15px] w-6 h-6 bg-blue-400 rounded-full"></div>
          <div className="absolute top-[-15px] right-[-15px] w-6 h-6 bg-blue-400 rounded-full"></div>

          <h2 className="text-3xl text-red-600 font-bold mb-4 font-[Dancing Script]">
            My Promise to You ❤️
          </h2>
          
          <p className="text-lg text-gray-700 font-[Dancing Script] text-center">
            <b>Dear Satyam</b>,<br></br>  
            I know both of our mindset is very different. You think very humourously and I am more into deep thinking, You try to solve things realistically and I need something emotional. But If you want I am ready to go throught all the fights, laughs, love and even maybe some days hate each other and time's if I say I want you to leave is the exact moment I need you by my side. So will you give me a chance and Promise? 
            <br></br>
          </p>
          <button
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-bold hover:bg-blue-600 transition-all"
            onClick={() => handlePromise("I promise to be there for you and support you even if you just want us to be friends.")}
          >
            Promise
          </button>
        </div>

        {/* Floating Circles */}
        {promises.map((promise, index) => (
          <button
            key={index}
            className="absolute w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center shadow-lg text-white text-lg font-bold hover:bg-blue-600 transition-all z-20"
            onClick={() => handlePromise(promise)}
            style={circlePositions[index]}
            title={promise}
          >
            💖
          </button>
        ))}
      </div>

      {/* His Promise Section */}
      {showPromise && (
        <div className="mt-12 w-full max-w-md z-10">
          <h2 className="text-xl text-blue-600 font-bold mb-4 font-[Dancing Script]">
            Something you got to say me (Optional)
          </h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border-4 border-blue-300">
            <textarea
              className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows={5}
              placeholder="Write here..."
              value={hisPromise}
              onChange={(e) => setHisPromise(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-bold hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </form>
          {showConfirmation && (
            <p className="mt-1 text-green-600 font-bold">
              Your feelings have been sent to her.
            </p>
          )}
          {loading && (
            <div className="mt-4" style={{ marginLeft: '20px' }}>
              <div className="loader"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromiseDay;