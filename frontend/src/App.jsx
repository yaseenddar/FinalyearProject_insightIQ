import { useEffect, useState } from 'react'
import Home from '../components/Home/Home'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'; // Import BrowserRouter
import Login from '../components/Auth/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login} from '../components/Slices/userSlice'
import Register from '../components/Auth/Register'
  import 'react-toastify/dist/ReactToastify.css';
import Profile from '../components/Pages/Profile';
import axios from 'axios';
import Chatpage from '../components/Pages/Chatpage';

function App() {
const dispatch = useDispatch();
const user = useSelector(state => state.user);
const [loading, setLoading] = useState(false);
useEffect(() => {
  setLoading(true);
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      const createuser=async()=>{
        try {
          const body = {
            userName: authUser.displayName,
            userEmail: authUser.email,
            password: "123456",
            profilePicture: authUser.photoURL,
            googleLogin:true,
          };
          const res = await axios.post("/api/auth/register", body);

          localStorage.setItem("token", res.data.token);
      dispatch(login(res.data.existingUser));
          // navigate('/');      
        } catch (error) {
          alert("error occured");
          console.log("error is", error);
        }
      }
      createuser();

    }
  });
  setLoading(false);
  // Return a cleanup function to unsubscribe from the event listener
  return () => {
    unsubscribe(); // Unsubscribe from the event listener
  };
}, []); // Empty dependency array to run the effect only once
  return (
    <Router>
      <Routes>
      <Route  exact path='/' element={ user.user ? <Home/>: <Login/>}/>
      <Route path='/login' element={user.user ? <Home/>: <Login/>}/>
      <Route path='/chat' element={user.user && <Chatpage/>}/>
  
      <Route path='/profile/:id' element={user.user ? <Profile/>: <Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
     
    </Router>
 
  )
}

export default App
