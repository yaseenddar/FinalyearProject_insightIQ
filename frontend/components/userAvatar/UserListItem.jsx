import React from "react";
import { Avatar } from "@mui/material";
export default function UserListItem({ user, handleFunction }) {
  const URL = "http://localhost:4000/uploads/";
  
  return (
    <div onClick={handleFunction}
      
      class="cursor-pointer bg-gray-300 hover:bg-teal-500 hover:text-white w-full flex items-center text-black px-3 py-2 m-1 rounded-lg"
    >
      {/* <Avatar src={user.profilePicture} /> */}
      <Avatar src={
                user.googleLogin
                  ? user.profilePicture
                  : `${URL}` + user.profilePicture
              }
              />
      <div className="pl-1">
        <p class="font-ligth text-md">{user.userName}</p>
        <p class="text-xs">
          <b className="font-light">Email : {user.userEmail}</b>
          
        </p>
      </div>
    </div>
  );
}
