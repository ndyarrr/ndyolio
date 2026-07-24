// QuotesCard.jsx
import './css/aboutcard2.css';

export default function QuotesCard({ quote, author }) {
    return (
        <div className="quotes-card">
            <p className="quotes-text">“{quote}”</p>
            {author && <span className="quotes-author">— {author}</span>}
        </div>
    );
}
