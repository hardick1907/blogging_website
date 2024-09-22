 import { Link } from 'react-router-dom';
import './post.css'
 import { format } from "date-fns";
export  default function Post({_id,title,summary,cover,content,createdAt}) {
    return (
        <div className="post">
            <Link to={`/post/${_id}`}>
                <div className="image"><img src={'http://localhost:3000/'+cover} alt="" /></div>
            </Link>
            
            <div className="texts">
                <Link to={`/post/${_id}`}className='title'>
                    <h2>{title}</h2>
                </Link>
               
                <p className="info">
                    {/*<a href='#' className='author'>Hardick Bhadauria</a>*/}
                    <time>{format(new Date(createdAt),'MMM d, yyyy | HH:mm')}</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>
            

        </div>
    )
}