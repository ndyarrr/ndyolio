// AboutCard.jsx
import './css/aboutCard.css';

export default function AboutCard({ data }) {
    return (
        <div className="about-card">
            <h3 className="about-title">About Me</h3>

            <div className="about-item">
                <span>Nama Lengkap</span>
                <p>{data.nama}</p>
            </div>

            <div className="about-item">
                <span>Umur</span>
                <p>{data.umur}</p>
            </div>

            <div className="about-item">
                <span>Alamat</span>
                <p>{data.alamat}</p>
            </div>

            <div className="about-item">
                <span>Email</span>
                <p>{data.email}</p>
            </div>

            <div className="about-item">
                <span>Skill</span>
                <p>{data.skill}</p>
            </div>
        </div>
    );
}
