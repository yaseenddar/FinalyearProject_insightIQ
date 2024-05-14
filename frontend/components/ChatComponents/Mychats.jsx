import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import axios from "axios";
import { useEffect, useState } from "react";

import {getSender} from '../config/ChatLogics'

import { ChatState } from "../Context/ChatProvider";
import { useSelector } from "react-redux";
import GroupChatModal from "./GroupChatModal";
import { Button } from "@mui/material";



const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const {
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
    selectedChat,
  } = ChatState();


  const user = useSelector((state) => state.user.user);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const jwtToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
     console.log("chats",data);
    } catch (error) {
      alert("Failed to Load the chats")
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return  (
    <div className="flex flex-col  p-3 bg-white w-full rounded-lg border-2 border-gray-200 gap-10">
    <div className="flex gap-1 items-center">
      <p>My Chats</p>
      <GroupChatModal>
      <Button variant="outlined"  size="small" color="primary" > 
        new chat
        <AddIcon />
      </Button>
      </GroupChatModal>
    </div>
    {chats ? (
  <div>
    {chats.map((chat) => (
      <div
        onClick={() => setSelectedChat(chat)}
        style={{
          cursor: "pointer",
          backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
          color: selectedChat === chat ? "white" : "black",
          padding: "8px 12px",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
        key={chat._id}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor =
            selectedChat === chat ? "#38B2AC" : "#C7C7C7";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor =
            selectedChat === chat ? "#38B2AC" : "#E8E8E8";
        }}
      >
        <p>
          {!chat.isGroupChat
            ? getSender(loggedUser, chat.users)
            : chat.chatName}
        </p>
        {chat.latestMessage && (
          <p style={{ fontSize: "12px" }}>
            <b>{chat.latestMessage.sender.name} : </b>
            {chat.latestMessage.content.length > 50
              ? chat.latestMessage.content.substring(0, 51) + "..."
              : chat.latestMessage.content}
          </p>
        )}
      </div>
    ))}
  </div>
) : (
  <ChatLoading />
)}

  </div>
  );
};

export default MyChats;

