import { ViewIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import{
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

  useDisclosure,
  FormControl,
  Input,
 
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ChatLoading from "./ChatLoading";
const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
 


  const user = useSelector((state) => state.user.user);
  const { selectedChat, setSelectedChat,  } = ChatState();
  const jwtToken = localStorage.getItem("token");

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const { data } = await axios.get(`/api/users?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data.slice(0,4));
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      // console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      toast("name changed successfully")
      alert("name changed successfully")
    } catch (error) {
      alert(`error.response.data.message`)
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      alert("User Already in group!")
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("Only admins can remove someone!")
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
console.log("data",data)
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message)
      setLoading(false);
    }
    setGroupChatName("");
  };
  // console.log(selectedChat)

  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} centerContent>
        <ModalOverlay />
        <ModalContent maxW="30%" p="10" mx="auto" bgColor={'#F0FFFF'} color="black" rounded='' border="1px solid #ccc" boxShadow="lg">
            <div className="flex justify-between"> 
          <div className="flex w-full flex-col items-center border m-1 p-1 rounded shadow-lg">
          {selectedChat.chatName.toUpperCase()}
             <h1 className="shadow-lg bg-slate-400 rounded-md p-[2px]"><span className="font-light ">Admin </span>@<span className="italic underline">{selectedChat.groupAdmin.userName}</span></h1>
             </div>
             <ModalCloseButton />
          </div>
          
         
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <div className="flex flex-wrap">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>
           { selectedChat.groupAdmin._id == user._id &&
            <form  className="flex my-1 flex-col col-span-2 ">
              <>
              <input class="w-full px-3 py-2 border border-gray-300 rounded mr-2"
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                />
              <Button
                variant="contained"  size="large" color="primary"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
                >
                Update
              </Button>
              
                </>
              <input class="w-full px-3 py-2 border border-gray-300 rounded mr-2"
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            
            </form>
}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="contained"  size="large" color="secondary" onClick={() => handleRemove(user)} colorScheme="red"
            
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default UpdateGroupChatModal;
