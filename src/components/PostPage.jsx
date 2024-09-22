import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PostPage.css'

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
            <div className="userimage">
            <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
            </div>
            <h1 className="post-page-title">{postInfo.title}</h1>
            <div  className="post-page-content" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    );
}
