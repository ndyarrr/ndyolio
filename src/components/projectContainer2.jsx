import { useRef, useEffect } from "react";
import "./css/projectContainer2.css";
//edit
import Edit1 from "../assets/project/edit/cuma temen.mp4";
//thumbnail 
import TmEdit1 from "../assets/project/edit/thumbnail/edit1.png";


export default function ProjectSlider() {
    const scrollRef = useRef(null);

    const projects = [
        {
            type: "image",
            src: "https://picsum.photos/400/250?1",
            name: "Website Portfolio",
            date: "2025-12-15",
            purpose: "Menampilkan karya desain web"
        },
        {
            type: "video",
            src: Edit1,
            name: "Test After Effect",
            date: "2025-11-20",
            purpose: "Gabut Doang"
        },
        // dst...
        {
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail: "https://picsum.photos/400/250?2",
            name: "Demo Video App",
            date: "2025-11-20",
            purpose: "Menyajikan fitur aplikasi"
        },
        // dst...
        {
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail: "https://picsum.photos/400/250?2",
            name: "Demo Video App",
            date: "2025-11-20",
            purpose: "Menyajikan fitur aplikasi"
        },
        // dst...
        {
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail: "https://picsum.photos/400/250?2",
            name: "Demo Video App",
            date: "2025-11-20",
            purpose: "Menyajikan fitur aplikasi"
        },
        // dst...
    ];

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        const handleWheel = (e) => {
            // Hanya intercept kalau SHIFT ditekan
            if (!e.shiftKey) return;
            e.preventDefault(); // cegah scroll vertikal saat shift
            // Tambahkan delta kecil supaya lebih halus
            slider.scrollBy({ left: e.deltaY, behavior: "smooth" });
        };

        slider.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            slider.removeEventListener("wheel", handleWheel);
        };
    }, []);


    return (
        <section className="project-section">
            {/* Judul */}
            <div className="project-header" style={{ position: 'relative' }}>
                <span className="project-tag">Edit</span>
                <h2 className="project-title">Project Saya</h2>
                <span className="scroll-hint" style={{ backgroundColor: 'var(--accent-purple)', color: '#FFFFFF' }}>SHIFT + SCROLL 🖱️</span>
            </div>
            
            {/* Folder path */}
            <div className="project-path">C:\fandy\projects\video-editing</div>

            {/* Slider */}
            <div className="project-slider">
                <div className="project-track" ref={scrollRef}>
                    {projects.map((project, idx) => (
                        <div className="project-item" key={idx}>
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
                </div>
                
                {/* Folder status bar */}
                <div className="slider-status-bar">
                    <span>4 folder(s) | 4 objects selected</span>
                    <span>System: AE templates loaded</span>
                </div>
            </div>
        </section>
    );

}

function VideoCard({ src, thumbnail }) {
    const videoRef = useRef(null);

    const handleMouseEnter = () => videoRef.current.play();
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
