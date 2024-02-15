import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './FeedPost.css'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TimeAgo from 'react-timeago'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import parser from 'html-react-parser'

export default function FeedPost({post}) {
  console.log("answers",post.allAnswers)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [answer, setAnswer] = useState("");

  const handleQuill = (value) => {
    setAnswer(value);
  };
  const Lastseen = ({date})=>{
return <> 
  <ReactTimeAgo date={date} locale='en-US' timeStyle='round'></ReactTimeAgo>
</>
  }
  
  const handleAddAnswer= async ()=>{
    if(answer !== ""){
       try {
      const body = {
        answer: answer,
        questionId: post._id
       
      }
      const res = await axios.post(`/api/answers`,body);
      setIsModalOpen(false);
      window.location.href="/"
      alert("commented")
      setAnswer("");
    } catch (error) {
      console.log("error in posting the answer");
    }
    }
   console.log("these are answers",post.answers)
 
  }
  return (
    <div key={post._id} className='post w-full'>
         <div className="post__info">
        <Avatar  />
        <h4>username</h4>

        <small>
          last seen:<Lastseen date={post?.createdAt}/>
        </small>
      </div>
      <div className="post__body ">
        <div className="post__question flex flex-col">
          <p>{post.questionName}</p>
          {post.questionUrl && <img className='w-[50%] image_Url ' src={post.questionUrl} alt="postUrl" />}
          <button
           
            className="post__btnAnswer"
          >
            discuss
          </button>
        </div>
      </div>
       <div className="post__footer">
        <div className="post__footerAction">
        <KeyboardArrowUpIcon/>
        <KeyboardArrowDownIcon/>
        <RepeatOneIcon/>
        <MarkUnreadChatAltIcon/>
        </div>

        <div className="post__footerLeft">
        <Button href="#text-buttons">Share</Button>
        <Button href="#text-buttons">More</Button>
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
     
    
       {post.allAnswers.map((ans)=>(   
          <div
          style={{
            margin: "5px 0px 0px 0px ",
            padding: "5px 0px 0px 20px",
            borderTop: "1px solid lightgray",
          }}
          className="post__answer flex flex-col justify-center"
        > 
           <>
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
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                <Avatar/>
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
                  <p>username</p>
                  <span>
                    last seen <Lastseen date={ans.createdAt}/>
                      {console.log("dated at ",ans.createdAt)
                    }
                  </span>
                  <p className='font-bold text-lg text-slate-9'>{parser(ans.answer)}</p>
                </div>
                
                 
                
              </div>
              
             
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
                asked by <span className="name">username</span> on{" "}
                <span className="name">
                  <Lastseen date={post.createdAt} />
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button  type="submit" onClick={handleAddAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
            </div>
          </>
          </div>
          ))}
       <button
            onClick={() => {
              setIsModalOpen(true);
              
            }}
            className="post__btnAnswer self-center"
          >
            Answer
          </button>
     

    </div>
  )
}
