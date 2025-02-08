import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoseDay from './component/RoseDay';
import ProposeDay from './component/ProposeDay';
import ChocolateDay from './component/ChocolateDay';
import TeddyDay from './component/TeddyDay';
import PromiseDay from './component/PromiseDay';
import HugDay from './component/HugDay';
import KissDay from './component/KissDay';
import ValentinesDay from './component/ValentinesDay';
import ComeBackLater from './component/ComeBackLater';
import NavBar from './NavBar/nav';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <NavBar />
        <div className="flex-grow ml-48">
          <Routes>
            <Route path="/rose-day" element={<RoseDay />} />
            <Route path="/propose-day" element={<ProposeDay />} />
            <Route path="/chocolate-day" element={<ChocolateDay />} />
            <Route path="/teddy-day" element={<TeddyDay />} />
            <Route path="/promise-day" element={<PromiseDay />} />
            <Route path="/hug-day" element={<HugDay />} />
            <Route path="/kiss-day" element={<KissDay />} />
            <Route path="/valentines-day" element={<ValentinesDay />} />
            <Route path="/come-back-later" element={<ComeBackLater />} />
            <Route path="/" element={<ProposeDay />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;