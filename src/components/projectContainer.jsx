import { useRef, useEffect, useState, useCallback } from "react";
import "./css/projectContainer.css";
import Edit1 from "../assets/project/edit/cuma temen.mp4";
import WebsitePorttofolio from "../assets/project/web/web_porto.png";
import WebsiteEKantin from "../assets/project/web/e_kantin.png";
import TmEdit1 from "../assets/project/edit/thumbnail/edit1.png";

export default function ProjectSlider() {
    const scrollRef = useRef(null);
    const [activeFolder, setActiveFolder] = useState("all");
    const [lightboxProject, setLightboxProject] = useState(null);

    // ==========================================
    // DATA PROJECT ANDA
    // ==========================================
    // Anda bisa menambah, mengedit, atau menghapus projek di sini.
    // Properti 'category' harus berupa "app-web-game" atau "video-editing".
    const allProjects = [
        {
            type: "image",
            category: "app-web-game",
            src: WebsitePorttofolio,
            name: "Website Portfolio",
            date: "2025-12-15",
            purpose: "Menampilkan karya desain web"
        },
        {
            type: "image",
            category: "app-web-game",
            src: WebsiteEKantin,
            name: "E-Kantin Management",
            date: "2026-4-21",
            purpose: "Menyajikan sistem manajemen kantin digital"
        },
        {
            type: "video",
            category: "video-editing",
            src: Edit1,
            thumbnail: TmEdit1,
            name: "Test After Effect",
            date: "2025-11-20",
            purpose: "Gabut Doang"
        }
    ];

    // Filter projek berdasarkan folder navigasi kiri
    const projects = activeFolder === "all" 
        ? allProjects 
        : allProjects.filter(p => p.category === activeFolder);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        const handleWheel = (e) => {
            if (!e.shiftKey) return;
            e.preventDefault();
            slider.scrollBy({ left: e.deltaY, behavior: "smooth" });
        };

        slider.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            slider.removeEventListener("wheel", handleWheel);
        };
    }, [activeFolder]);

    return (
        <section className="project-section">
            {/* Judul & Tag Header */}
            <div className="project-header" style={{ position: 'relative' }}>
                <span className="project-tag">Explorer</span>
                <h2 className="project-title">Project</h2>
                <span className="scroll-hint">SHIFT + SCROLL 🖱️</span>
            </div>
            
            {/* Path Navigation Bar */}
            <div className="project-path-bar">
                <button 
                    className="path-nav-btn" 
                    onClick={() => setActiveFolder("all")} 
                    disabled={activeFolder === "all"}
                    title="Kembali ke Root (Semua Project)"
                >
                ←
                </button>
                <div className="project-path">
                    /home/ndyarr/projects{activeFolder !== "all" ? `/${activeFolder}` : ""}
                </div>
            </div>

            {/* Window Explorer Layout */}
            <div className="project-window">
                {/* Left Navigation Pane (Sidebar) */}
                <div className="project-sidebar">
                    <div className="sidebar-title">Navigasi</div>
                    <ul className="sidebar-list">
                        <li 
                            className={`sidebar-item ${activeFolder === "all" ? "active" : ""}`}
                            onClick={() => setActiveFolder("all")}
                        >
                            <span className="sidebar-text">Semua Project ({allProjects.length})</span>
                        </li>
                        <li 
                            className={`sidebar-item ${activeFolder === "app-web-game" ? "active" : ""}`}
                            onClick={() => setActiveFolder("app-web-game")}
                        >
                            <span className="sidebar-text">App/Web/Game ({allProjects.filter(p => p.category === "app-web-game").length})</span>
                        </li>
                        <li 
                            className={`sidebar-item ${activeFolder === "video-editing" ? "active" : ""}`}
                            onClick={() => setActiveFolder("video-editing")}
                        >
                            <span className="sidebar-text">Video Editing ({allProjects.filter(p => p.category === "video-editing").length})</span>
                        </li>
                    </ul>
                </div>

                {/* Right Folder Slider Track */}
                <div className="project-slider-content">
                    <div className="project-slider">
                        <div className="project-track" ref={scrollRef}>
                            {projects.map((project, idx) => (
                                <div 
                                    className="project-item" 
                                    key={idx}
                                    onClick={() => setLightboxProject(project)}
                                >
                                    {project.type === "image" ? (
                                        <img src={project.src} alt={`project-${idx}`} />
                                    ) : (
                                        <VideoCard
                                            src={project.src}
                                            thumbnail={project.thumbnail}
                                        />
                                    )}

                                    <div className="project-overlay">
                                        <h3>{project.name}</h3>
                                        <p>{project.date}</p>
                                        <p>{project.purpose}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Tombol Shortcut/Placeholder Tambah Project */}
                            <div className="project-placeholder-card add-shortcut-card">
                                <span className="placeholder-icon">+</span>
                                <h3>Coming Soon</h3>
                                <p>Sepertinya <code>ndyarrr</code> belum menambahkan karya baru.</p>
                            </div>
                        </div>
                        
                        {/* Folder Status Bar */}
                        <div className="slider-status-bar">
                            <span>{projects.length + 1} objek | {projects.length} terpilih</span>
                            <span>System: 100% Coded</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Popup */}
            {lightboxProject && (
                <ProjectLightbox 
                    project={lightboxProject} 
                    onClose={() => setLightboxProject(null)} 
                />
            )}
        </section>
    );
}

/* ========================================
   Lightbox Popup Component
   ======================================== */
function ProjectLightbox({ project, onClose }) {
    const videoRef = useRef(null);

    // Tutup dengan tombol ESC
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden"; // Cegah scroll halaman di belakang

        // Auto-play video jika tipe video
        if (project.type === "video" && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleKeyDown, project.type]);

    // Klik di backdrop (area gelap) untuk menutup
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="lightbox-backdrop" onClick={handleBackdropClick}>
            <div className="lightbox-window">
                {/* Retro Window Title Bar */}
                <div className="lightbox-titlebar">
                    <div className="lightbox-dots">
                        <span className="lb-dot red" onClick={onClose}></span>
                        <span className="lb-dot yellow"></span>
                        <span className="lb-dot green"></span>
                    </div>
                    <span className="lightbox-title">
                        {project.name} — {project.type === "video" ? "media_player.exe" : "image_viewer.exe"}
                    </span>
                    <button className="lightbox-close-btn" onClick={onClose} title="Tutup (ESC)">✕</button>
                </div>

                {/* Media Content */}
                <div className="lightbox-content">
                    {project.type === "image" ? (
                        <img 
                            src={project.src} 
                            alt={project.name} 
                            className="lightbox-media"
                        />
                    ) : (
                        <video 
                            ref={videoRef}
                            src={project.src} 
                            poster={project.thumbnail}
                            controls
                            autoPlay
                            className="lightbox-media"
                        />
                    )}
                </div>

                {/* Info Footer */}
                <div className="lightbox-footer">
                    <span>{project.name}</span>
                    <span>{project.date} — {project.purpose}</span>
                </div>
            </div>
        </div>
    );
}

/* ========================================
   Video Card (Hover Preview)
   ======================================== */
function VideoCard({ src, thumbnail }) {
    const videoRef = useRef(null);

    const handleMouseEnter = () => videoRef.current.play().catch(() => {});
    const handleMouseLeave = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    return (
        <div className="video-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <video ref={videoRef} src={src} poster={thumbnail} muted loop playsInline className="video-element" />
        </div>
    );
}

