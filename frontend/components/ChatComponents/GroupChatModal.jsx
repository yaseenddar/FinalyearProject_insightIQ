import {
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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
// import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const jwtToken = localStorage.getItem("token");
  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

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
      console.log(data);
      setLoading(false);
      setSearchResult(data);
      
    } catch (error) {
      toast("Failed to Load the Search Results");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast("New Group Chat Created!");
    } catch (error) {
      alert("Failed to Create the Chat!");
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} centerContent>
  
  <ModalContent  maxW="30%" p="10" mx="auto" bgColor={'#F0FFFF'} color="black" rounded='' border="1px solid #ccc" boxShadow="lg">
    <div className="flex justify-between font-bold py-2 px-4 rounded-full "
    style={{ fontFamily: 'Work Sans' }}
    >
      Create Group Chat
      <ModalCloseButton />
    </div>
   
    <ModalBody display="flex" flexDirection="column" alignItems="center">
      {/* Content goes here */}
       <form action="">
        <input onChange={(e)=>setGroupChatName(e.target.value)} type="text" placeholder="Chat name" 
        class="w-full px-3 py-2 border border-gray-300 rounded mr-2" />
        <input type="text" placeholder="Add Users e.g., Jhon, Piyush..." 
                      mr={2}
                      value={search}
                      onChange={(e) =>  handleSearch(e.target.value)}
                      class="w-full px-3 py-2 border border-gray-300 rounded mr-2"/>
      </form>
      <div className="flex flex-col gap-2  justify-center">
    <div className="w-[30vw] flex flex-wrap" >
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </div>
    {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
     
    </div>
    </ModalBody>
    
    <Button variant="contained"  size="large" color="primary"
    onClick={handleSubmit}
    >Create</Button>
  </ModalContent>
</Modal>



    </>
  );
};

export default GroupChatModal;
