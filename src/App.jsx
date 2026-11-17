import { useState } from 'react';
import './App.css';
import BottomNav from "./components/BottomNavbar";
import ProfileCard from "./components/ProfileCard";
import TypeText from './components/typeText.jsx';
import LogoGallery from './components/logoClick.jsx';
import AboutCard from './components/aboutcard1.jsx';
import QuotesCard from './components/aboutcard2.jsx';
import MusicCard from './components/musiccard.jsx';
import CardAchiv from './components/cardAchiv.jsx';
import CardEdu from './components/cardEducation.jsx';
import ProjectSlider from './components/projectContainer.jsx';
import PixelBlast from './components/PixelBlast';
import ContactForm from './components/ContactForm';
import Marquee from './components/Marquee';
import RetroModal from './components/RetroModal';

const getAge = (birthDateString) => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const age = getAge("2009-11-29");

const aboutData = {
  nama: 'Fandy Ahmad Riyanto',    
  umur: `${age} Tahun`,
  alamat: 'Tulungagung, Jawa Timur, Indonesia',
  email: 'itzfanzzzzz@gmail.com',
  skill: 'Frontend Developer, Vite, React, Node',
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(null);

  const handleCvDownload = () => {
    setModalOpen('resume');
  };

  return (
    <>
      <div className="bg-canvas-wrapper">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#f43f5e"
          patternScale={2.5}
          patternDensity={1.35}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1.2}
          liquid
          liquidStrength={0.08}
          liquidRadius={1.0}
          liquidWobbleSpeed={4.0}
          speed={0.4}
          edgeFade={0}
          transparent
        />
      </div>
      <div className="content-wrapper">
        <BottomNav />
        <section id="home" className="section">
          {/* Retro OS Desktop Shortcuts Grid */}
          <div className="desktop-grid">
            <div className="desktop-shortcut" onClick={() => setModalOpen('skills')} title="Klik untuk info detail skill">
              <div className="shortcut-icon">
                <svg className="shortcut-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="var(--accent-yellow)" />
                </svg>
              </div>
              <div className="shortcut-label">skills.lnk</div>
            </div>
            <div className="desktop-shortcut" onClick={() => setModalOpen('secret')} title="Klik untuk info rahasia">
              <div className="shortcut-icon">
                <svg className="shortcut-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="var(--card-bg)" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="shortcut-label">info.txt</div>
            </div>
            <div className="desktop-shortcut" onClick={() => setModalOpen('resume')} title="Klik untuk download CV" style={{ display: 'none' }}>
              <div className="shortcut-icon">
                <svg className="shortcut-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" fill="var(--accent-pink)" />
                  <polyline points="17 21 17 13 7 13 7 21" fill="var(--card-bg)" />
                  <polyline points="7 3 7 8 15 8" fill="var(--bg-color)" />
                </svg>
              </div>
              <div className="shortcut-label">
                download.exe
              </div>
            </div>
          </div>

          <div className="text-me">
            <div className="shape">HELLO WORLD!</div>
            <h1 className="ndy">Hi, Welcome</h1>
            <TypeText className="name-me"
              text={["I'm Fandy Ahmad Riyanto", "To my Portofolio", "sheshh..."]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
            <p className="desc">I'm a passionate developer with a strong interest in creating innovative web applications.</p>
            <button className="cv-button" onClick={handleCvDownload} style={{ display: 'none' }}>
              Download CV
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
            <LogoGallery className="logo-gallery" />
          </div>
          
          <div className="profile-card-container">
            <div style={{ position: 'relative' }}>
              {/* Online Sticker badge */}
              <div className="badge-sticker sticker-online neobrutal-card">
                HIRE ME! <span className="green-dot"></span>
              </div>
              
              <ProfileCard
                title="Developer"
                handle="ndyy"
                status="Online"
                contactText="Contact Me"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled
                behindGlowColor="rgba(244, 63, 94, 0.5)"
                innerGradient="linear-gradient(145deg, #1a1a2e8c 0%, #f43f5e33 100%)"
                onContactClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </div>
        </section>

        {/* Rotated loop marquee ticker */}
        <Marquee />
        
        <section id="about" className="section about-layout">
          <div className="about-left">
            <div style={{ position: 'relative' }}>
              {/* Region Sticker badge */}
              <div className="badge-sticker sticker-about neobrutal-card">EST. 2009 ★</div>
              <AboutCard data={aboutData} />
            </div>
            
            <div className="about-bottom">
              <CardAchiv
                title="Achievements"
                items={[
                  "Coming soon",
                  "",
                  "",
                ]}
              />

              <CardEdu
                title="Education"
                items={[
                  "SDN 4 Ngunut",
                  "SMPN 1 Ngunut",
                  "SMKN 1 Boyolangu",
                ]}
              />
            </div>
          </div>

          <div className="about-right">
            <QuotesCard
              quote="Wel wel"
              author="Fan"
            />
            <MusicCard />
          </div>
        </section>

        <section id="project" className="section project">
          <ProjectSlider/>
        </section>
        
        <section id="contact" className="section contact-layout">
          <ContactForm />
        </section>
      </div>

      {/* Retro Modals definitions */}
      <RetroModal
        isOpen={modalOpen === 'secret'}
        onClose={() => setModalOpen(null)}
        title="info.txt - Notepad"
      >
        <pre className="notepad-text">
          {`Hello World! [>_<]
          
           Aku Fandy adalah pelajar berumur ${age} tahun yang memiliki hobby ya tentunya coding dong, dan aku juga suka musik dan game. Aku juga suka banget sama hal-hal yang berbau teknologi.

          - Filosofi Code: "Use what works"`}
        </pre>
        <div className="modal-actions">
          <button className="neobrutal-btn" onClick={() => setModalOpen(null)}>OK</button>
        </div>
      </RetroModal>

      <RetroModal
        isOpen={modalOpen === 'skills'}
        onClose={() => setModalOpen(null)}
        title="skills.lnk - Skill Details"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="skill-bar-wrapper">
            <div className="skill-label">
              <span>React & Vite</span>
              <span>10%</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill react" style={{ width: '10%' }}></div>
            </div>
          </div>

          <div className="skill-bar-wrapper">
            <div className="skill-label">
              <span>PHP</span>
              <span>24%</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill php" style={{ width: '24%' }}></div>
            </div>
          </div>

          <div className="skill-bar-wrapper">
            <div className="skill-label">
              <span>Node.js</span>
              <span>35%</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill node" style={{ width: '35%' }}></div>
            </div>
          </div>

          <div className="skill-bar-wrapper">
            <div className="skill-label">
              <span>C++</span>
              <span>7%</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill cpp" style={{ width: '7%' }}></div>
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="neobrutal-btn" onClick={() => setModalOpen(null)}>TUTUP</button>
        </div>
      </RetroModal>

      <RetroModal
        isOpen={modalOpen === 'resume'}
        onClose={() => setModalOpen(null)}
        title="cv_download.exe - System Prompt"
      >
        <p style={{ fontWeight: '700', fontSize: '1rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>
          Apakah Anda ingin mengunduh Curriculum Vitae (CV) dari Fandy Ahmad Riyanto?
        </p>
        <div className="modal-actions">
          <a 
            href="#" 
            className="neobrutal-btn" 
            style={{ backgroundColor: 'var(--accent-green)', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              alert("Mengunduh CV... (Simulasi sukses!)");
              setModalOpen(null);
            }}
          >
            UNDUH SEKARANG
          </a>
          <button className="neobrutal-btn" style={{ backgroundColor: 'var(--card-bg)' }} onClick={() => setModalOpen(null)}>
            BATAL
          </button>
        </div>
      </RetroModal>
    </>
  );
}
