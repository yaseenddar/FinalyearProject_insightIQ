import React, { useEffect, useState } from "react";
import FeedBox from "../FeedBox/FeedBox";
import FeedPost from "../FeedPost/FeedPost";
import axios from "axios";

export default function Feed() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get("/api/questions");
        setPost(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        // console.log("posts",posts)
      } catch (error) {
        console.log("Error in getting the posts");
      }
    }
    getPosts();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <FeedBox />
      {posts.map((post, index) => (
        <FeedPost post={post} key={index} />
      ))}
    </div>
  );
}
