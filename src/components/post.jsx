import { Link } from 'react-router-dom';
import './post.css';
import { format } from "date-fns";

export default function Post({_id, title, summary, cover, createdAt, author}) {
    return (
        <div className="post">
            <Link to={`/post/${_id}`}>
                <div className="image">
                    <img src={`http://localhost:3000/${cover}`} alt={title} />
                </div>
            </Link>
            
            <div className="texts">
                <Link to={`/post/${_id}`} className='title'>
                    <h2>{title}</h2>
                </Link>
               
                <p className="info">
                    {/* Render the username instead of the entire author object */}
                    <span className='author'>{author.username}</span>
                    <time className='home-page-time'>{format(new Date(createdAt), 'MMM d, yyyy | HH:mm')}</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>
        </div>
    );
}
