import React, { useState } from 'react';
import { FaInstagram, FaPinterest } from "react-icons/fa";
import './css/contact.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Say Hi',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const topics = ['Say Hi', 'Collab', 'Project', 'Hire Me'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicClick = (topic) => {
    setFormData((prev) => ({ ...prev, subject: topic }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate API call
    console.log('Sending message:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Say Hi', message: '' });
    }, 4000);
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', flex: '1.2' }}>
        <div className="badge-sticker contact-sticker neobrutal-card">SAY HELLO! <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginLeft: '10px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div>

        <div className="contact-window neobrutal-card">
          {/* Retro OS Window Title Bar */}
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="window-title">contact_me.exe</div>
          </div>

          <div className="window-body">
            {submitted ? (
              <div className="success-message">
                <h3><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> Terkirim!</h3>
                <p>Terima kasih pesannya, Fandy akan segera menghubungi Anda kembali!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Nama Lengkap</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ketik nama Anda di sini..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Alamat Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Topik Diskusi</label>
                  <div className="topic-buttons">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        className={`topic-btn ${formData.subject === topic ? 'selected' : ''}`}
                        onClick={() => handleTopicClick(topic)}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Pesan Anda</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pesan atau detail project Anda..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="neobrutal-btn submit-btn">
                  Kirim Pesan
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Notepad status bar */}
          <div className="window-status-bar">
            <span>STATUS: READY</span>
            <span>ENCRYPTED: YES</span>
          </div>
        </div>
      </div>

      <div className="socials-container">
        <h3 className="socials-title">Mari Terhubung!</h3>
        <p className="socials-desc">Temukan saya di platform berikut untuk berkolaborasi atau sekadar menyapa.</p>

        <div className="social-links">
          <a href="mailto:itzfanzzzzz@gmail.com" className="social-card email neobrutal-card" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <span className="social-name">Email</span>
            <span className="social-key">[E]</span>
          </a>

          <a href="https://github.com/ndyarrr" className="social-card github neobrutal-card" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </span>
            <span className="social-name">GitHub</span>
            <span className="social-key">[G]</span>
          </a>

          <a href="https://instagram.com" className="social-card instagram neobrutal-card" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">
              <FaInstagram />
            </span>
            <span className="social-name">Instagram</span>
            <span className="social-key">[I]</span>
          </a>
        </div>
      </div>
    </>
  );
}
