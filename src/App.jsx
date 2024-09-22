
import Post from "./components/post"
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Create } from "./components/Create";
import { useEffect, useState } from "react";
import { PostPage } from "./components/PostPage";

export const App = () =>{

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/post').then(response =>{
      response.json().then(posts =>{
        setPosts(posts);
      })
    }) 
  },[]);

  return(
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path={'/post/:id'} element={<PostPage/>}/>
        <Route index element={<div className="line">
          {posts.length > 0 && posts.map(post =>(
            <Post key={post.id} {...post}/>
          ))}
          </div>}></Route>
        <Route path="/about"element={<div>About page</div>}></Route>
        <Route path="/create" element={<Create/>}></Route>
                
      </Route>

    </Routes>

  );
}