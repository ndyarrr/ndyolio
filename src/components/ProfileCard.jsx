import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './css/ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl = "../src/assets/profile/fandy.jpeg",
  iconUrl = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M22 22 L14 30 L22 38 M38 22 L46 30 L38 38 M33 18 L27 42' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E",
  grainUrl = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  // name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const innerShapesRef = useRef(null);
  const targetSpeedMultiplierRef = useRef(1.0);
  const currentSpeedMultiplierRef = useRef(1.0);

  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // requestAnimationFrame animation loop for inner shapes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = innerShapesRef.current;
    if (!container) return;

    const childNodes = container.children;
    if (childNodes.length < 8) return;

    // Initialize shapes with randomized initial heights (0 to 450)
    // so they are dispersed on mount.
    const shapes = [
      { el: childNodes[0], y: 450, speed: 0.9, rotate: 0, rSpeed: 0.5, driftAmp: 0 },
      { el: childNodes[1], y: 320, speed: 0.7, rotate: 0, rSpeed: 0, driftAmp: 8 },
      { el: childNodes[2], y: 200, speed: 0.6, rotate: 0, rSpeed: 1.2, driftAmp: 0 },
      { el: childNodes[3], y: 100, speed: 0.8, rotate: 0, rSpeed: 0, driftAmp: 10 },
      { el: childNodes[4], y: 50,  speed: 0.5, rotate: 0, rSpeed: -0.4, driftAmp: 0 },
      { el: childNodes[5], y: 400, speed: 1.0, rotate: 0, rSpeed: 0, driftAmp: 0 },
      { el: childNodes[6], y: 270, speed: 1.1, rotate: 0, rSpeed: 0, driftAmp: 12 },
      { el: childNodes[7], y: 150, speed: 0.7, rotate: 0, rSpeed: 0, driftAmp: 0 },
    ];

    let rafId;

    const animate = () => {
      // Smoothly interpolate the speed multiplier (easing / lerp)
      // This guarantees no visual jumping or teleportation when hovering/unhovering.
      currentSpeedMultiplierRef.current += (targetSpeedMultiplierRef.current - currentSpeedMultiplierRef.current) * 0.08;

      shapes.forEach(shape => {
        if (!shape.el) return;
        
        // Move shape upward
        shape.y -= shape.speed * currentSpeedMultiplierRef.current;
        
        // Reset to bottom if off-screen top
        if (shape.y < -60) {
          shape.y = 460;
        }

        // Apply rotation
        shape.rotate += shape.rSpeed * currentSpeedMultiplierRef.current;

        // Apply sine wave drift
        let driftX = 0;
        if (shape.driftAmp > 0) {
          driftX = Math.sin(shape.y * 0.02) * shape.driftAmp;
        }

        // Smooth opacity fade at top and bottom boundaries
        let opacity = 1;
        if (shape.y > 400) {
          opacity = (460 - shape.y) / 60; // fade in from bottom
        } else if (shape.y < 40) {
          opacity = (shape.y + 60) / 100; // fade out at top
        }
        shape.el.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(2);

        // Write directly to style transform (bypass React re-render overhead)
        shape.el.style.transform = `translate3d(${driftX}px, ${shape.y - 450}px, 0) rotate(${shape.rotate}deg)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const tiltEngine = useMemo(() => {
    if (!enableTilt || isMobile) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = ts => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt, isMobile]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell) return;
      if (tiltEngine) {
        const { x, y } = getOffsets(event, shell);
        tiltEngine.setTarget(x, y);
      }
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    event => {
      const shell = shellRef.current;
      targetSpeedMultiplierRef.current = 2.5;

      if (!shell) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      if (tiltEngine) {
        const { x, y } = getOffsets(event, shell);
        tiltEngine.setTarget(x, y);
      }
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    targetSpeedMultiplierRef.current = 1.0;

    const shell = shellRef.current;
    if (!shell) return;

    if (tiltEngine) {
      tiltEngine.toCenter();

      const checkSettle = () => {
        const { x, y, tx, ty } = tiltEngine.getCurrent();
        const settled = Math.hypot(tx - x, ty - y) < 0.6;
        if (settled) {
          shell.classList.remove('active');
          leaveRafRef.current = null;
        } else {
          leaveRafRef.current = requestAnimationFrame(checkSettle);
        }
      };
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      leaveRafRef.current = requestAnimationFrame(checkSettle);
    } else {
      shell.classList.remove('active');
    }
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:' || !tiltEngine) return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    if (tiltEngine) {
      const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
      const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
      tiltEngine.setImmediate(initialX, initialY);
      tiltEngine.toCenter();
      tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
    }

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      if (tiltEngine) tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
      '--behind-glow-size': behindGlowSize ?? '50%'
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {/* Floating geometric shapes */}
      <div className="pc-floating-shapes" aria-hidden="true">
        <div className="pc-shape pc-shape--circle" />
        <div className="pc-shape pc-shape--square" />
        <div className="pc-shape pc-shape--triangle" />
        <div className="pc-shape pc-shape--diamond" />
        <div className="pc-shape pc-shape--cross" />
        <div className="pc-shape pc-shape--dot" />
      </div>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                onError={e => {
                  const t = e.target;
                  t.style.display = 'none';
                }}
              />
              {/* Inner shapes overlaying the profile image */}
              <div ref={innerShapesRef} className="pc-inner-shapes" aria-hidden="true">
                <div className="pc-ishape pc-ishape--circle-1" />
                <div className="pc-ishape pc-ishape--circle-2" />
                <div className="pc-ishape pc-ishape--square" />
                <div className="pc-ishape pc-ishape--triangle" />
                <div className="pc-ishape pc-ishape--ring" />
                <div className="pc-ishape pc-ishape--dot-1" />
                <div className="pc-ishape pc-ishape--dot-2" />
                <div className="pc-ishape pc-ishape--dot-3" />
              </div>
              {/* Shine overlay on image */}
              <div className="pc-img-shine" />
            </div>
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || 'User'} mini avatar`}
                      loading="lazy"
                      onError={e => {
                        const t = e.target;
                        t.style.opacity = '0.5';
                        t.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={handleContactClick}
                  style={{ pointerEvents: 'auto' }}
                  type="button"
                  aria-label={`Contact ${name || 'user'}`}
                >
                  {contactText}
                </button>
              </div>
            )}
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
