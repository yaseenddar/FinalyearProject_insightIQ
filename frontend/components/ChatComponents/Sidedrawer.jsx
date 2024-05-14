import React, { useState } from "react";
import { Avatar } from "@mui/material";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,

} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import UserListItem from '../userAvatar/UserListItem'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useDisclosure } from "@chakra-ui/hooks";
import { toast } from "react-toastify";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Slices/chatSlice";
import { ChatState } from "../Context/ChatProvider";
// import { ChatState } from "../Context/ChatProvider";


export default function Sidedrawer() {
  // const chats = useSelector((state)=> state.chat);
  const {
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.user);
  
  const URL = "http://localhost:4000/uploads/";
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  // const {
  //   chats,
  //   setChats,
  // } = ChatState();

  const dispatch = useDispatch();
  const handleSearch = async () => {
    
    if (!search) {
      return;
    }

    try {
      setLoading(true);
      const jwtToken = localStorage.getItem("token");
      console.log(jwtToken)
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const { data } = await axios.get(`/api/users/?search=${search}`, config);
// console.log(data)
      setLoading(false);
      setSearchResult(data);
      // console.log("Result", searchResult);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      
      const jwtToken = localStorage.getItem("token");
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      (data);
      setLoadingChat(false);
      setSelectedChat(data);
      toast("chat created")
      onClose();
     
    } catch (error) {
     
      toast("error while fetching the chat")
    }
  };
  return (
    <>
      <div class="flex justify-between items-center bg-white w-full p-5">
        <Button class="relative" onClick={onOpen}>
          <button class="flex items-center text-gray-700">
            <SearchIcon />
            <span>search</span>
          </button>
        </Button>
        <h1 class="text-2xl font-medium">Talk-A-Tive</h1>
        <div class="flex">
          <button class="text-gray-700">
            <BellIcon />
          </button>
          {/* <span class="absolute top-0 right-0 mt-1 mr-1 text-xs text-gray-500">Notifications</span> */}

              <Avatar src={
                user.googleLogin
                  ? user.profilePicture
                  : `${URL}` + user.profilePicture
              }/>
        </div>
      </div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} classNa>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <div
              class="fixed inset-y-0 left-0 w-64 bg-white border-r overflow-y-auto transition-all duration-300 ease-in-out z-50"
              x-bind:class="{'-translate-x-full': !isOpen, 'translate-x-0': isOpen}"
            >
              <div
                class="absolute top-0 right-0 p-4 cursor-pointer "
                onClick={onClose}
                x-on:click="isOpen = !isOpen"
              >
                <svg
                  class="h-6 w-6 text-gray-600"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div class="p-4">
                <div class="border-b pb-4">
                  <h2 class="text-lg font-semibold">Search Users</h2>
                </div>
                <div class="p-4">
                  <div class="flex pb-2">
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      mr={2}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      class="w-full px-3 py-2 border border-gray-300 rounded mr-2"
                    />
                    <Button
                      class="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={handleSearch}
                    >
                      Go
                    </Button>
                  </div>
                </div>
              </div>
              <Box>
              
           {loading ?
            <ChatLoading/>
            
            :
            searchResult.map(user=>
              <UserListItem
              user={user}
              key={user._id}
              handleFunction={()=>accessChat(user._id)}
              />
            )
            }
           </Box>
            </div>
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
