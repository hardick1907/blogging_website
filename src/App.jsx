
  import Post from "./components/post"
  import './App.css';
  import { Route, Routes } from "react-router-dom";
  import { Layout } from "./components/Layout";
  import { Create } from "./components/Create";
  import { useEffect, useState } from "react";
  import { PostPage } from "./components/PostPage";
  import { Register } from "./components/Register";
  import { Login } from "./components/Login";
import { UserContextProvider } from "./components/UserContext";
import { About } from "./components/About";


  export const App = () =>{

    const [posts,setPosts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/post').then(response => {
        response.json().then(posts => {
          setPosts(posts);
        });
      });
    }, []);
    

    return(
      <UserContextProvider>
        <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path={'/post/:id'} element={<PostPage/>}/>
          <Route index element={<div className="line">
            {posts.length > 0 && posts.map((post) => (
              <Post key={post._id} {...post}/>))
            }
            </div>}></Route>
          <Route path="/about"element={<About/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
                  
        </Route>

      </Routes>
      </UserContextProvider>


    );
  }