import "./css/cardAchive.css";

export default function CustomCard({ title, items }) {
    return (
        <div className="custom-card">
            <h4>{title}</h4>
            <ul>
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        </div>
    );
}