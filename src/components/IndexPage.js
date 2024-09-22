import Post from './post';
import {useEffect, useState} from "react";

export function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        // eslint-disable-next-line react/jsx-key
        <Post {...post} />
      ))}
    </>
  );
}
