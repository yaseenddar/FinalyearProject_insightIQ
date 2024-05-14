const User = require("../models/UserModel/User");


//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { userName: { $regex: req.query.search, $options: "i" } },
          { userEmail: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select('-password');


    
  
  res.send(users);
};


module.exports = { allUsers};
