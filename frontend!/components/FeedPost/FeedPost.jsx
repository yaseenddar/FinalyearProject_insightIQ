import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./FeedPost.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TimeAgo from "react-timeago";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import parser from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Profile from "../Pages/Profile";

export default function FeedPost({ post }) { 
  // console.log("answers",post.allAnswers)

  const URL = 'http://localhost:4000/uploads/';
  const user = useSelector(state => state.user.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [answer, setAnswer] = useState("");
  const [ansModel, setansModel] = useState(false);
  const navigate = useNavigate()
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
  const deleteComment = ()=>{

  }

  // delete a post handler
  const deletePost= async(id)=>{
    try {
      const res = await axios.delete(`/api/questions/${id}`)
      .then(()=>{
        
        toast("deleted successfully");
        window.location.reload();
      })

    } catch (error) {
      toast("error in deleting the post")
    }
  }

const modules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }
    const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
    ]

    //click on avatar handler 
    const avtarClick = ()=>{
        navigate('/profile')
    }
  return (

    <div key={post._id} className="post w-full">
      <div className="post__info">
        <Avatar src={post.user?.googleLogin ? user.profilePicture :`${URL}`+ post.user.profilePicture } onClick={()=>avtarClick} />
        <h4>{post.user?.userName}</h4>

        <small>
          <Lastseen date={post?.createdAt} />
        </small>
        <DeleteOutlineIcon onClick={()=>deletePost(post._id)}
        
        className="post__footerAction ml-2 hover:bg-red-400 rounded-[50%]"/>
      </div>
      <div className="post__body ">
        <div className="post__question flex flex-col">
          <p>{parser(post.questionName)}</p>
        </div>
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          {ansModel ? (
            <KeyboardArrowUpIcon onClick={() => setansModel(false)} />
          ) : (
            <KeyboardArrowDownIcon onClick={() => setansModel(true)} />
          )}

          <MarkUnreadChatAltIcon
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>

      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {post.allAnswers.length}Answer(s)
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
                    <Avatar className="" src={ans.user.googleLogin ? user.profilePicture :`${URL}`+ ans.user.profilePicture } />
                    <span className="flex gap-2 my-auto">
                      <p className="underline">{ans.user?.userName || "no name"}</p>
                      <Lastseen date={ans.createdAt} />
                      <DeleteOutlineIcon onClick={()=>deleteComment} className="post__footerAction hover:bg-red-400 " />
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
                      <span className="name">
                        {post.post?.userName || "no name"}
                      </span>{" "}
                      on{" "}
                      <span className="name">
                        <Lastseen date={post.createdAt} />
                      </span>
                    </p>
                  </div>
                  <div className="modal__answer">
                    <ReactQuill
                    modules={modules} 
                    formats={formats} 
                    theme="snow"
                      value={answer}
                      onChange={handleQuill}
                      placeholder="Enter your answer"
                    />
                  </div>
                  <div className="modal__button">
                    <button
                      className="cancle"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={handleAddAnswer}
                      className="add"
                    >
                      Add Answer
                    </button>
                  </div>
                </Modal>
    </div>
  );
}
