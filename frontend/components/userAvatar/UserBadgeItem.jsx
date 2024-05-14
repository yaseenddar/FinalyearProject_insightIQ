import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <div className="px-1 py-1 border-2 flex items-center bg-purple-600 rounded-md m-1 font-semibold text-sm "
      onClick={handleFunction}
    >
      {user.userName}
      {admin === user._id && <span> (Admin)</span>}
      <div className="cursor-pointer pl-1">  
      <CloseIcon pl={1} />
      </div>
     
    </div>
  );
};

export default UserBadgeItem;
