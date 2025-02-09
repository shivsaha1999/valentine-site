import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("");

  const getBackgroundColor = () => {
    switch (location.pathname) {
      case "/rose-day":
        return { bg: "bg-red-600", hover: "hover:bg-red-400" };
      case "/propose-day":
        return { bg: "bg-pink-600", hover: "hover:bg-pink-400" };
      case "/chocolate-day":
        return { bg: "bg-[#5C4033]", hover: "hover:bg-[#C4A484]" };
      case "/teddy-day":
        return { bg: "bg-yellow-600", hover: "hover:bg-yellow-400" };
      case "/promise-day":
        return { bg: "bg-blue-600", hover: "hover:bg-blue-400" };
      case "/hug-day":
        return { bg: "bg-green-600", hover: "hover:bg-green-400" };
      case "/kiss-day":
        return { bg: "bg-purple-600", hover: "hover:bg-purple-400" };
      case "/valentines-day":
        return { bg: "bg-red-600", hover: "hover:bg-red-400" };
      default:
        return { bg: "bg-pink-600", hover: "hover:bg-pink-400" };
    }
  };

  const { bg, hover } = getBackgroundColor();

  const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const day = today.getDate();
    return { month, day };
  };

  const isValidDate = (link: string) => {
    const { month, day } = getCurrentDate();
    switch (link) {
      case "/rose-day":
        return month === 2 && day >= 7;
      case "/propose-day":
        return month === 2 && day >= 8;
      case "/chocolate-day":
        return month === 2 && day >= 9;
      case "/teddy-day":
        return month === 2 && day >= 10;
      case "/promise-day":
        return month === 2 && day >= 11;
      case "/hug-day":
        return month === 2 && day >= 12;
      case "/kiss-day":
        return month === 2 && day >= 13;
      case "/valentines-day":
        return month === 2 && day >= 14;
      default:
        return false;
    }
  };

  const sendEmail = (pageName: string) => {
    const templateParams = {
      to_email: 'socialshivangi.2806@gmail.com',
      message: `${pageName} page is clicked by him!`
    };

    emailjs.send('service_f87hucr', 'template_ycfj3yh', templateParams, 'ke3RwZ5WCHfBcWjCd')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (isValidDate(link)) {
      setActiveLink(link);
      sendEmail(link);
    } else {
      event.preventDefault();
      navigate("/come-back-later");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-full w-48 text-white flex flex-col items-center justify-center shadow-lg ${bg} transition-all duration-1000`}
    >
      <Link
        to="/rose-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/rose-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/rose-day")}
      >
        🌹 Rose Day
      </Link>
      <Link
        to="/propose-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/propose-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/propose-day")}
      >
        💍 Propose Day
      </Link>
      <Link
        to="/chocolate-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/chocolate-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/chocolate-day")}
      >
        🍫 Chocolate Day
      </Link>
      <Link
        to="/teddy-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/teddy-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/teddy-day")}
      >
        🧸 Teddy Day
      </Link>
      <Link
        to="/promise-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/promise-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/promise-day")}
      >
        🤞 Promise Day
      </Link>
      <Link
        to="/hug-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/hug-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/hug-day")}
      >
        🤗 Hug Day
      </Link>
      <Link
        to="/kiss-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full ${activeLink === "/kiss-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/kiss-day")}
      >
        💋 Kiss Day
      </Link>
      <Link
        to="/valentines-day"
        className={`p-4 ${hover} transition-all duration-1000 w-full font-bold ${activeLink === "/valentines-day" ? "animate-pulse" : ""}`}
        onClick={(event) => handleClick(event, "/valentines-day")}
      >
        ❤️ Valentine's Day 
      </Link>
    </nav>
  );
};

export default NavBar;