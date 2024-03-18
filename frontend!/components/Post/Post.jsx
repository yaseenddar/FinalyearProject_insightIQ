import React, { useEffect, useState } from 'react'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TimeAgo from "react-timeago";
import ReactTimeAgo from "react-time-ago";
import parser from "html-react-parser";
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Post({post}) {
  const URL = "http://localhost:4000/uploads/";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [answer, setAnswer] = useState("");
  const [ansModel, setansModel] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
    // setLikes(post.likes.length)
  }, [user._id]);
  const handleQuill = (value) => {
    setAnswer(value);
  };
  // console.log("user in post",post.allAnswers)
  const Lastseen = ({ date }) => {
    return (
      <>
        <ReactTimeAgo
          date={date}
          locale="en-US"
          timeStyle="round"
        ></ReactTimeAgo>
      </>
    );
  };
  // console.log("userin post ",user.user)
  const handleAddAnswer = async () => {
    if (answer !== "") {
      try {
        const body = {
          answer: answer,
          questionId: post._id,
          user: user,
        };
        const res = await axios.post(`/api/answers`, body);
        setIsModalOpen(false);
        toast("commented");
        window.location.reload();

        setAnswer("");
      } catch (error) {
        toast("error in posting the answer");
      }
    }
  };

  //delete the cooment
  const deleteComment = () => {};

  // delete a post handler
  const deletePost = async () => {
    try {
      const res = await axios.delete(`/api/questions/${post._id}`).then(() => {
        toast("deleted successfully");
        window.location.reload();
      });
    } catch (error) {
      toast("error in deleting the post");
    }
  };

  // handle like in post
  const likeHandler = async (id) => {
    try {
      const res = await axios.post(`/api/questions/${post._id}/like`, {
        userId: user._id,
      });
      console.log("like res", res.data);
      // setLikes(res.data.post.likes.length);
      // Update the isLiked state based on the response from the server
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log("error in liking the post", error);
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
           <div className="bg-slate-200 m-1 p-2 w-[50rem] shadow-2xl rounded-2xl  ">
        <div className="post__info  shadow-lg">
          <Avatar
            src={
              post.user?.googleLogin
                ? post.user.profilePicture
                : `${URL}` + post.user.profilePicture
            }
            onClick={() => avtarClick}
          />
          <h4>{post.user?.userName}</h4>
  
          <small>
            <Lastseen date={post?.createdAt} />
          </small>
          { post.user._id == user._id &&
            <DeleteOutlineIcon
              onClick={() => deletePost(post._id)}
              className="post__footerAction ml-2 hover:bg-red-400 rounded-[50%]"
            />
          }
        </div>
        <div className="post__body ">
          <div className="post__question flex flex-col">
            <p>{parser(post.questionName)}</p>
          </div>
        </div>
        <div className="post__footer">
          <div className="flex bg-slate-200 border p-[2px] border-slate-600 rounded-xl gap-3">
            <div
              onClick={likeHandler}
              className={
                isLiked
                  ? "bg-slate-300 py-1 pr-6 cursor-pointer rounded-md"
                  : "bg-slate-200 py-1 pr-6 cursor-pointer rounded-md"
              }
            >
              <ThumbUpIcon  color={isLiked ? "primary" : "secondry"} className="absolute"/>
              <span className="text-xs relative left-6 top-2">{likes} like(s)</span>
            </div>
              <div className="p-1">
              <MarkUnreadChatAltIcon
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
              </div>
           
          </div>
        </div>
        <p
          style={{
            cursor: "pointer",
            color: "rgba(0,0,0,0.5)",
            fontSize: "12px",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          {post.allAnswers.length}Answer(s)
          {ansModel ? (
            <KeyboardArrowUpIcon
              color="primary"
              fontSize="large"
              onClick={() => setansModel(false)}
            />
          ) : (
            <KeyboardArrowDownIcon
               color="secondary"
              fontSize="large"
              onClick={() => setansModel(true)}
            />
          )}
        </p>
  
        {ansModel &&
          post.allAnswers.map((ans) => (
            <div
              style={{
                margin: "5px 0px 0px 0px ",
                padding: "5px 0px 0px 20px",
                borderTop: "1px solid lightgray",
              }}
              className="post__answer flex flex-col justify-center"
            >
              <>
                {/* **************************Ans container */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "10px 5px",
                    borderTop: "1px solid lightgray",
                  }}
                  className="post-answer-container"
                >
                  {}
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "1f0px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                    className="flex flex-col"
                  >
                    <div className="flex gap-2 ">
                      <Avatar
                        className=""
                        src={
                          ans.user.googleLogin
                            ? user.profilePicture
                            : `${URL}` + ans.user.profilePicture
                        }
                      />
                      <span className="flex gap-2 my-auto">
                        <p className="underline">
                          {ans.user?.userName || "no name"}
                        </p>
                        <Lastseen date={ans.createdAt} />
                        <DeleteOutlineIcon
                          onClick={() => deleteComment}
                          className="post__footerAction hover:bg-red-400 "
                        />
                      </span>
                    </div>
  
                    <p className="text-lg text-slate-900 font-semibold">
                      {parser(ans.answer)}
                    </p>
                  </div>
                </div>
              </>
            </div>
          ))}
        <Modal
          odal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          closeOnOverlayClick={false}
          center
          closeOnEsc
          styles={{
            overlay: {
              height: "auto",
            },
          }}
        >
          <div className="modal__question">
            <h1>discussion</h1>
            <p>
              asked by{" "}
              <span className="name">{post.post?.userName || "no name"}</span> on{" "}
              <span className="name">
                <Lastseen date={post.createdAt} />
              </span>
            </p>
          </div>
          <div className="modal__answer">
            <ReactQuill
              formats={formats}
              theme="snow"
              value={answer}
              onChange={handleQuill}
              placeholder="Enter your answer"
            />
          </div>
          <div className="modal__button">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" onClick={handleAddAnswer} className="add">
              Add Answer
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
