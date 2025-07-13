import React from 'react';
// import Header from './Header';
import Hero from './Hero';
// import Features from './Features';
import HackathonList from './HackathonList';
import Stats from './Stats';
import Footer from './Footer';
import Features from '../Features';

// import './Header.css';
import './Hero.css';
// import './Features.css';
import './HackathonList.css';
import './Stats.css';
import './Footer.css';
import './App.css'
import CreateHackathonBox from './CreateHackathonBox';

function App() {
  return (
  <div className="container">
      {/* <Header /> */}
      <Hero />
      {/* <Features /> */}
      <Features/>
      <CreateHackathonBox/>
      <div className="main-content hackathon-stats-section">
        <HackathonList />
        <Stats />
      </div>
      <Footer />
    </div>
  );
}

export default App;