import { useEffect, useState } from 'react';
import './css/navbar.css'; // We'll put some toggle styling here or keep it simple

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle light/dark theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="toggle-inner">
        {/* Retro floppy disk / switch icon */}
        <span className="toggle-icon">
          {isDark ? (
            /* Moon Icon */
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-2.8 1.9-4.3 5.2-3.8 8.6.6 4 3.9 7.1 7.9 7.5 2 .2 3.9-.3 5.4-1.4.4-.3 1-.3 1.3.1.3.4.3.9.1 1.3-1.9 3.5-5.5 5.7-9.5 5.7h-.2z" />
            </svg>
          ) : (
            /* Sun Icon */
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0-5c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55.45 1 1 1zm0 16c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1zm8-8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55.45 1 1 1zM4 12c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1zm14.24-7.06c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1 1c-.39.39-.39 1.02 0 1.41.2.2.45.3.71.3s.51-.1.71-.3l1-1zM5.64 16.95l-1 1c-.39.39-.39 1.02 0 1.41.2.2.45.3.71.3s.51-.1.71-.3l1-1c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0zm12.6-1.41c-.39-.39-1.02-.39-1.41 0l-1 1c-.39.39-.39 1.02 0 1.41.2.2.45.3.71.3s.51-.1.71-.3l1-1c.39-.39.39-1.02 0-1.41zM6.35 5.64l-1-1c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1 1c.2.2.45.3.71.3s.51-.1.71-.3c.39-.39.39-1.02 0-1.41z" />
            </svg>
          )}
        </span>
        <span className="toggle-text">{isDark ? "DARK" : "LIGHT"}</span>
      </div>
    </button>
  );
}
