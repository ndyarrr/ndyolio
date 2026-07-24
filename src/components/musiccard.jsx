// MusicCard.jsx
import { useRef, useState, useEffect } from 'react';
import './css/musiccard.css';
//cover
import Abcover from '@cover/CoverAB.jpg';
import ThgCvr from '@cover/The Night Still Young.jpeg';
import WithEaseCvr from '@cover/with ease.jpeg';
import BadboyCvr from '@cover/Bad boy.jpeg';
//mp3
import Multo from '@mp3/Multo.mp3';
import Ab from '@mp3/About You.mp3';
import Thngt from '@mp3/The Night Still Young.mp3';
import WithEase from '@mp3/With ease.mp3';
import Badboy from '@mp3/Bad boy.mp3';



const playlist = [
    {
        title: 'Multo',
        artist: 'Cup Of Joe',
        cover: 'https://i.scdn.co/image/ab67616d0000b273394048503e3be0e65e962638',
        src: Multo,
    },
    {
        title: 'About You',
        artist: 'The 1975',
        cover: Abcover,
        src: Ab,
    },
    {
        title: 'The Night Still Young',
        artist: 'Nicki Minaj',
        cover: ThgCvr,
        src: Thngt,
    },
    {
        title: 'With Ease',
        artist: 'Joon',
        cover: WithEaseCvr,
        src: WithEase,
    },
    {
        title: 'Bad Boy',
        artist: 'Marwa Loud',
        cover: BadboyCvr,
        src: Badboy,
    }
];

export default function MusicCard() {
    const clamp = (v) => Math.min(Math.max(v, 0), 100);
    const audioRef = useRef(null);
    const barRef = useRef(null);
    const wasPlayingRef = useRef(false);
    const [dragging, setDragging] = useState(false);
    const [index, setIndex] = useState(() =>
        Math.floor(Math.random() * playlist.length)
    );
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    // Mobile floating states
    const [isOpen, setIsOpen] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const dragStart = useRef({ x: 0, y: 0 });
    const pointerStart = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    const current = playlist[index];

    const handleSeekByClientX = (clientX) => {
        const bar = barRef.current;
        const audio = audioRef.current;
        if (!bar || !audio?.duration) return;

        const rect = bar.getBoundingClientRect();
        const percent = clamp(((clientX - rect.left) / rect.width) * 100);

        audio.currentTime = (percent / 100) * audio.duration;
        setProgress(percent);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.load();

        if (hasInteracted && wasPlayingRef.current) {
            audio.play().catch(() => { });
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [index, hasInteracted]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
        }
    }, [playing]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        setHasInteracted(true);

        if (audio.paused) {
            await audio.play();
            setPlaying(true);
        } else {
            audio.pause();
            setPlaying(false);
        }
    };

    const handleSeek = (e) => {
        handleSeekByClientX(e.clientX);
    };

    const next = () => {
        wasPlayingRef.current = playing;
        setHasInteracted(true);

        if (isShuffle) {
            let nextIndex = Math.floor(Math.random() * playlist.length);
            if (playlist.length > 1) {
                while (nextIndex === index) {
                    nextIndex = Math.floor(Math.random() * playlist.length);
                }
            }
            setIndex(nextIndex);
        } else {
            setIndex((i) => (i + 1) % playlist.length);
        }
    };

    const prev = () => {
        wasPlayingRef.current = playing;
        setHasInteracted(true);

        if (isShuffle) {
            let prevIndex = Math.floor(Math.random() * playlist.length);
            if (playlist.length > 1) {
                while (prevIndex === index) {
                    prevIndex = Math.floor(Math.random() * playlist.length);
                }
            }
            setIndex(prevIndex);
        } else {
            setIndex((i) => (i - 1 + playlist.length) % playlist.length);
        }
    };

    const handleEnded = () => {
        setHasInteracted(true);
        if (isRepeat) {
            const audio = audioRef.current;
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(() => { });
            }
        } else {
            next();
        }
    };

    const rafRef = useRef(null);

    useEffect(() => {
        const move = (e) => dragging && handleSeek(e);
        const up = () => setDragging(false);

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
    }, [dragging]);

    useEffect(() => {
        if (!playing) return;
        const smoothProgress = () => {
            const audio = audioRef.current;
            if (audio && audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
            rafRef.current = requestAnimationFrame(smoothProgress);
        };

        rafRef.current = requestAnimationFrame(smoothProgress);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [playing]);

    // Pointer-events Drag Logic (mobile & desktop friendly)
    const handlePointerDown = (e) => {
        dragStart.current = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
        pointerStart.current = { x: e.clientX, y: e.clientY };
        isDragging.current = false;

        const handlePointerMove = (moveEvent) => {
            const dx = moveEvent.clientX - pointerStart.current.x;
            const dy = moveEvent.clientY - pointerStart.current.y;

            // 5px drag threshold to distinguish tap from drag
            if (Math.hypot(dx, dy) > 5) {
                isDragging.current = true;
            }

            if (isDragging.current) {
                const newX = moveEvent.clientX - dragStart.current.x;
                const newY = moveEvent.clientY - dragStart.current.y;
                setDragOffset({ x: newX, y: newY });
            }
        };

        const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handleTriggerClick = (e) => {
        if (isDragging.current) {
            e.preventDefault();
            return;
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* 1. Main Music Card */}
            <div className={`music-card ${isOpen ? 'modal-open' : ''}`}>
                <button className="close-modal-btn" onClick={() => setIsOpen(false)} title="Close player">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </button>

                <div className="music-cover">
                    <img src={current.cover} alt={current.title} />
                </div>

                <div className="music-info">
                    <h4>{current.title}</h4>
                    <span>{current.artist}</span>
                </div>

                <div className="progress-bar" ref={barRef}>
                    <div className="progress" style={{ width: `${progress}%` }}>
                        <span
                            className="dot"
                            onMouseDown={(e) => {
                                setDragging(true);
                                handleSeek(e);
                            }}
                            onTouchStart={(e) => {
                                setDragging(true);
                                handleSeekByClientX(e.touches[0].clientX);
                            }}
                            onTouchMove={(e) => {
                                if (!dragging) return;
                                handleSeekByClientX(e.touches[0].clientX);
                            }}
                            onTouchEnd={() => setDragging(false)}
                        />
                    </div>
                </div>

                <div className="music-controls">
                    <button
                        className={`control-btn shuffle-btn ${isShuffle ? 'active' : ''}`}
                        onClick={() => setIsShuffle(!isShuffle)}
                        title="Shuffle"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.38 10.17l-1.41 1.41 3.5 3.51L20 17v-5.5h-5.5l2.04 2.04-3.66 3.63z" />
                        </svg>
                    </button>
                    <button className="control-btn" onClick={prev} title="Previous">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h2V5H6v14zm3.5-7L18 5v14l-8.5-7z" />
                        </svg>
                    </button>
                    <button className={`play-btn ${playing ? 'playing' : ''}`} onClick={togglePlay} title={playing ? 'Pause' : 'Play'}>
                        {playing ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                    <button className="control-btn" onClick={next} title="Next">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 5v14l8.5-7L6 5zm10 0v14h2V5h-2z" />
                        </svg>
                    </button>
                    <button
                        className={`control-btn repeat-btn ${isRepeat ? 'active' : ''}`}
                        onClick={() => setIsRepeat(!isRepeat)}
                        title="Repeat"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                        </svg>
                    </button>
                </div>

                <audio
                    ref={audioRef}
                    src={current.src}
                    onEnded={handleEnded}
                />
            </div>

            {/* 2. Floating Action Button Trigger (Mobile Only) */}
            <div
                className={`floating-music-trigger ${playing ? 'playing' : ''}`}
                style={{
                    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`
                }}
                onPointerDown={handlePointerDown}
                onClick={handleTriggerClick}
            >
                <div className="vinyl-disk">
                    <img src={current.cover} alt="Vinyl Cover" />
                    <div className="vinyl-center" />
                </div>
                <div className="music-note-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                </div>
            </div>

            {/* 3. Modal Backdrop for Mobile */}
            {isOpen && <div className="music-modal-backdrop" onClick={() => setIsOpen(false)} />}
        </>
    );
}
