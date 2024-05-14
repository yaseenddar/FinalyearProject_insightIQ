import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { Avatar } from "@mui/material";
import {Link} from 'react-router-dom'
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const URL = "http://localhost:4000/uploads/";
  return (

    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
          <Modal isOpen={isOpen} onClose={onClose} centerContent>
  
  <ModalContent  maxW="30%" p="10" mx="auto" bgColor={'#F0FFFF'} color="black" rounded='' border="1px solid #ccc" boxShadow="lg">
    <div className="flex justify-between font-bold py-2 px-4 rounded-full "
    style={{ fontFamily: 'Work Sans' }}
    >
      
      <ModalCloseButton />
    </div>
   
    <ModalBody display="flex" flexDirection="column" alignItems="center">
      {/* Content goes here */}

      
       <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div>
          <div class="flex justify-center">
            <h2 class="text-4xl font-work-sans">{user.userName}</h2>
          </div>
          <button class="absolute top-0 right-0 p-4" onclick="onClose">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div class="flex flex-col items-center justify-between p-8">
<Link to={`/profile/






`+ user._id}>
          <img
              src={
                user.googleLogin
                  ? user.profilePicture
                  : `${URL}` + user.profilePicture
              }
              className="h-[5rem] w-[5rem] rounded-[50%]"
            />
            </Link>
            <p class="text-2xl font-work-sans mt-4">Email: {user.userEmail}</p>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </ModalBody>

  </ModalContent>
</Modal>
    </>
  );
};

export default ProfileModal;
