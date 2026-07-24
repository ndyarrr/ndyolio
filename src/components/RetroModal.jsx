import React from 'react';
import './css/modal.css';

export default function RetroModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="retro-modal-overlay" onClick={onClose}>
      <div className="retro-modal-window neobrutal-card" onClick={(e) => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="window-header">
          <div className="window-dots">
            <span className="dot red" onClick={onClose} title="Close window"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="window-title">{title}</div>
          <button className="window-close-x" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        {/* Body content */}
        <div className="window-body">
          {children}
        </div>
      </div>
    </div>
  );
}
