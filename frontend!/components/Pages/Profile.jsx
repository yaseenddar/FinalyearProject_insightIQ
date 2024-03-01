import "./profile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";


const Profile = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="w-[80%] mx-auto rounded-xl border-2 shadow-lg ">
      

          <div className="images">
            <img src='https://mmpi.ie/wp-content/uploads/Knowledge.jpg' alt="" className="cover" />
            <img src={user.user?.photo || 'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'} alt="profile" className="profilePic" />
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
                <span>{user.user?.userName}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>data city</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>data website</span>
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
  );
};

export default Profile;