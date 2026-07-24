import { useEffect, useRef, useState } from 'react';
import './css/LazyWrapper.css';

export default function LazyWrapper({ children, placeholderHeight = '300px', className = '' }) {
  const [hasRendered, setHasRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasRendered(true);
        }
      },
      {
        rootMargin: '200px', // Render 200px before entering viewport
        threshold: 0.01
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimationDone(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimationDone(false);
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`lazy-wrapper ${isVisible ? 'lazy-visible' : 'lazy-hidden'} ${animationDone ? 'lazy-animation-done' : ''} ${className}`.trim()}
      style={!hasRendered ? { minHeight: placeholderHeight } : undefined}
    >
      {hasRendered ? (
        <div 
          className="lazy-content" 
          style={{ 
            visibility: isVisible ? 'visible' : 'hidden',
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
