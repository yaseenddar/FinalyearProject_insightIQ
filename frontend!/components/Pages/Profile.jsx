import "./profile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from '../Header/Header'
import Post from "../Post/Post";
import axios from "axios";

const Profile = () => {
  // const user = useSelector(state => state.user.user);
  const URL = "http://localhost:4000/uploads/";
  const userId = useParams().id;
  const [user,setUser] = useState({});
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const userData =async () =>{
      try {
        const response = await axios.get(`/api/questions/${userId}/users`)
        console.log("user in profile",response.data.questions);
        setUser(response.data.user);
        setPosts(response.data.questions);

      } catch (error) {
        console.log(error)
      }
    }
    userData();
  },[userId])
  // console.log("user in user", typeof posts)


  return (
    <div className=" flex flex-col justify-center items-center w-full">
      <Header/>
      <div className="w-[80%] mx-auto rounded-xl border-2 shadow-lg">
      

          <div className="images">
            <img src='https://mmpi.ie/wp-content/uploads/Knowledge.jpg' alt="" className="cover" />
            <img src={user.googleLogin ? user.profilePicture : `${URL}`+ user.profilePicture} onClick={()=>avtarhandler} alt="profile" className="profilePic" />
          </div>
          <div className="profileContainer m-16 ">
            <div className="uInfo p-10">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{user.userName}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>...</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>....</span>
                  </div>
                </div>
                  
                  <button >Follow</button>
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>

    </div>
    {
      posts.map((post,index)=>(
        <Post key={index} post={post}/>
      ))
    }
    </div>
    
  );
};

export default Profile;