import React from 'react';
import './css/marquee.css';

export default function Marquee() {
  const items = [
    "✦ FE + BE DEVELOPER", 
    "✦ VITE", 
    "✦ REACT", 
    "✦ NODE.JS", 
    "✦ PHP", 
    "✦ Linux",  
    "✦ AVAILABLE FOR HIRE ◆", 
    "✦ MySql ★",
    "✦ LEARN ☆"
  ];
  
  // Triple-duplicate for seamless looping animation
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="neobrutal-marquee">
      <div className="marquee-content">
        {repeatedItems.map((text, i) => (
          <span key={i} className="marquee-item">{text}</span>
        ))}
      </div>
    </div>
  );
}
