import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">CodeBazaar</div>
      <nav className="nav">
        <a href="#">Projects</a>
        <a href="#">Pricing</a>
        <a href="#">Hackathons</a>
        <a href="#">Membership</a>
        <button className="login">Log In</button>
      </nav>
    </header>
  );
}
