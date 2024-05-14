import { useRef, useState } from "react";
import axios from "axios";
  import { toast } from 'react-toastify';
  import { Avatar } from '@mui/material'
  import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {useNavigate} from "react-router-dom"
export default function Register() {
    const email = useRef();
    const name = useRef();
    const password = useRef();
    const confirmpassword = useRef();
    const navigate = useNavigate();
	const [image, setImage] = useState('');
    const handleSubmit =async (e) => {
        e.preventDefault();
		const body={
			userName: name.current.value,
			userEmail: email.current.value,
			password: password.current.value,
			googleLogin:false
		};
        if (password.current.value !== confirmpassword.current.value) {
           alert("password don't match");
        }else{
        	
			if (image) {
				const data = new FormData();
				const fileName =image.name;
				data.append("image", image);
				data.append("fileName",fileName)
				
				body.profilePicture= fileName;

				try {
				  await axios.post("/api/upload", data);
				} catch (err) {
					console.log("error in uploading the image")
				}
			  }

        	await axios.post('/api/auth/register',body)
			.then((res)=>{
				// console.log("user created",res);
				const token = res.data.token;
				localStorage.setItem('token', token);


				navigate('/login');
			})
			.catch((err)=>{
				console.log("received error in registering");
			})

        }


    }

	const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
				console.log("file is ",file);
                setImage(file);
            }
	}
    return (
        <div className="login w-full h-[100vh] flex items-center  justify-center ">
		 	<div className="loginwrapper w-[70%] h-[70%] flex  bg-slate-200 shadow-xxl rounded-xl">
		 		<div className="loginleft w-[10px] flex-1 flex flex-col justify-center ml-3">
				<h3 className="loginLogo text-[70px] text-blue-700 tracking-wider">insightIQ</h3>
			
				 <span className=" text-2xl  text-cyan-600">
					coonect to world on insightIQ.
				</span>

			    </div>
			    <div className="loginRight  flex-1 flex flex-col justify-center ">
			    	<form onSubmit={handleSubmit} className='loginBox h-[380px] p[20px] shadow-lg shadow-cyan-800
			    	 rounded-md flex flex-col justify-between p-1'>
						
						<div className="flex flex-col items-center">
						<label htmlFor="avatar-input" className="">
							<Avatar src={image && URL.createObjectURL(image)} className=" absolute" sx={{width: 100,height:100}}/>
							
							 <input
                        type="file"
                        id="avatar-input"
                        accept="image/*"
                        className="hidden "
                        onChange={handleAvatarChange}
                    />
					
					<CameraAltIcon fontSize="large" color="info" className="relative left-8 bottom-2"/>

					</label>
						</div>
                   
			    	 	<input type="text" 
			    	 	placeholder="username"
			    	 	 ref={name} required
			    		className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		focus:outline-0 border-gray-300 text-lg pl-5"
			    		/>
			    		<input type="Email"
			    		 required ref={email}
			    		 placeholder="enter email"
			    		 className="loginINput h-[50px] rounded-md border-2 border-solid
			    		 focus:outline-0 border-gray-300 text-lg pl-5 "
			    		
			    		/>
			    		<input type="Password"
			    		 placeholder="password"  
			    		 required ref={password} 
			    		 minLength="6"
			    		className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		focus:outline-0 border-gray-300 text-lg pl-5"
			    		/>
						<input type="Password" 
						placeholder="confirm password "  
						minLength="6"  
						required ref={confirmpassword}
			    		className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		focus:outline-0 border-gray-300 text-lg pl-5"
			    		/>
			    		<button type="submit"
			    		className="inputButton h-[50px] rounded-md border-none
			    		 text-[20px] text-white font-bold cursor-pointer bg-violet-500 hover:bg-violet-400  "
			    		>Sign Up</button>
			    		
			    	</form>
					<button className="registerButton w-[50%] h-[50px] rounded-md border-none
			    		 text-[20px] text-white font-bold hover:bg-green-400 self-center cursor-pointer bg-green-500"
						 onClick={()=>navigate("/login")}
						 >click to Login</button>
			    </div>
		 	</div>
			
		</div>
    );
}