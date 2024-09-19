
import Post from "./components/post"
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Create } from "./components/Create";

export const App = () =>{
  return(
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<div className="line"><Post/><Post/></div>}></Route>
        <Route path="/about"element={<div>About page</div>}></Route>
        <Route path="/create" element={<Create/>}></Route>
      </Route>
    </Routes>

  );
}