import React, { useEffect, useState } from 'react'
import FeedBox from '../FeedBox/FeedBox'
import FeedPost from '../FeedPost/FeedPost'
import axios from 'axios';

export default function Feed() {
  const [posts,setPost] = useState([]);

useEffect(()=>{
  async function getPosts(){
    try {
      await axios.get("/api/questions").then((res)=>setPost(res.data))
      .catch((err)=>console.log("error in getting the posts"));
      console.log(posts)
    } catch (error) {
      console.log("Error in getting the posts");
    }
  }
  getPosts();
},[])


  return (
    <div className='w-full flex flex-col justify-center items-center '>
      <FeedBox/>
      {
        posts.map((post)=><FeedPost post={post} key={post._id}/>)
      }
    </div>
  )
}
