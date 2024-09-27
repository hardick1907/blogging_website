import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PostPage.css'
import { formatISO9075 } from "date-fns";

export function PostPage () {

    const {id} = useParams();
    const [postInfo,setPostInfo] = useState();

    useEffect(()=>{

        fetch(`http://localhost:3000/post/${id}`)
        .then(response => {
            response.json().then(postInfo =>{
                setPostInfo(postInfo);
            })
        })

    },[]);

    if(!postInfo) return '';
    return(
        <div className="post_page">
            <h1 className="post-page-title">{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="post-author">By {postInfo.author.username}</div>
            <div className="userimage">
            <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
            </div>
            
            <div  className="post-page-content" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    );
}
