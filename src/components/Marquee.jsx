import React from 'react';
import './css/marquee.css';

export default function Marquee() {
  const items = [
    "✦ FRONTEND DEVELOPER", 
    "✦ VITE", 
    "✦ REACT", 
    "✦ NODE.JS", 
    "✦ PHP", 
    "✦ Linux", 
    "✦ AFTER EFFECTS", 
    "✦ AVAILABLE FOR HIRE ◆", 
    "✦ MySql ★",
    "✦ LEARNING ☆"
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
