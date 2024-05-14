import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./style.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useState } from "react";
// import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../src/animations/typing.json";


import { ChatState } from "../Context/ChatProvider";
import { useSelector } from "react-redux";
import { Avatar, CircularProgress, LinearProgress, Stack } from "@mui/material";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client"
const ENDPOINT = "http://localhost:4000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const jwtToken = localStorage.getItem("token");
  const user = useSelector(state => state.user.user);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
    const URL = "http://localhost:4000/uploads/";
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setTimeout(() => {
        setLoading(false);

      }, 1000);
// console.log("fetched",data)
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert("Failed to Load the Messages")
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && message) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: message,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        alert("Failed to send the Message")
        console.log(error)
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div>
  {selectedChat ? (
    <div>
      <div class="text-base md:text-lg pb-3 px-2 w-full font-work-sans flex justify-between items-center">

        {messages &&
          (!selectedChat.isGroupChat ? (
            <div className="flex items-center gap-2">
              {getSender(user, selectedChat.users)}
             
                <Avatar  src={
                 getSenderFull(user, selectedChat.users).googleLogin ?  getSenderFull(user, selectedChat.users).profilePicture 
                  :
                  `${URL}`+ getSenderFull(user, selectedChat.users).profilePicture
              }/>
                                <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
             
            </div>
          ) : (
            <div>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroupChatModal
                ffetchMessages={fetchMessages}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            </div>
          ))}
      </div>
      <div class="flex flex-col justify-end p-3 bg-gray-300 w-full h-full rounded-lg overflow-hidden">
        {loading ? (
          <div class="w-full h-full flex flex-col justify-center items-center">
<CircularProgress />
        </div>

        ) : (
          <div class="messages">

            
           <ScrollableChat messages={messages} />
          </div>
        )}
        <div onKeyDown={sendMessage} class="mt-3">
          {istyping ? (
                         <Lottie
                      options={defaultOptions}
                      // height={50}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />

          ) : (
            <></>
          )}

          <input type="text"  
          class="bg-gray-200 px-4 py-2 rounded-lg w-full" 
          placeholder="Enter a message.."
          value={message}
          onChange={typingHandler}/>
        </div>
      </div>
    </div>
  ) : (
    <div class="flex items-center justify-center h-full">
      <p class="text-3xl pb-3 font-work-sans">
        Click on a user to start chatting
      </p>
    </div>
  )}
</div>

  );
};

export default SingleChat;
