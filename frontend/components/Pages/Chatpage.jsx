

// const Chatpage = () => {
//   const [fetchAgain, setFetchAgain] = useState(false);
  // const { user } = ChatState();

import { useSelector } from "react-redux";
import ChatBox from "../ChatComponents/ChatBox";
import Mychats from "../ChatComponents/Mychats";
import Sidedrawer from "../ChatComponents/Sidedrawer";
import { useState } from "react";



export default function Chatpage() {

  const user = useSelector((state) => state.user.user);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full">
      
      <Sidedrawer/>
      <div className="flex h-[100vh] m-2 border border-slate-300 gap-x-4">
      <div className="min-w-[60vh] bg-gray-200 rounded-lg">
        {user && <Mychats fetchAgain={fetchAgain} />}
      </div>
      <div className="flex-1 bg-gray-300">
        {user && <ChatBox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
    </div>
  
  )
}

