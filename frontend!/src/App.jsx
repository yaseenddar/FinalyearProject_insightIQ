import { useEffect, useState } from 'react'
import Home from '../components/Home/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import BrowserRouter
import Login from '../components/Auth/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login} from '../components/userSlice/userSlice'
import Register from '../components/Auth/Register'
import Loader from '../components/Pages/Loader/Loader';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Profile from '../components/Pages/Profile';
function App() {
const dispatch = useDispatch();
const user = useSelector(state => state.user);
const [loading, setLoading] = useState(false);
useEffect(() => {
  setLoading(true);
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      dispatch(login({
        userName: authUser.displayName,
        profilePicture: authUser.photoURL,
        uid: authUser.uid,
        googleLogin:true
      }));
      console.log("Auth user", authUser);
    }
  });
  setLoading(false);
  // Return a cleanup function to unsubscribe from the event listener
  return () => {
    unsubscribe(); // Unsubscribe from the event listener
  };
}, []); // Empty dependency array to run the effect only once
console.log("user in app",user)
  return (
    <Router>
      <Routes>
      <Route  exact path='/' element={ user.user ? <Home/>: <Login/>}/>
      <Route path='/login' element={user.user ? <Home/>: <Login/>}/>
      <Route path='/profile' element={user.user ? <Profile/>: <Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
     
    </Router>
 
  )
}

export default App
