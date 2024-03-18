const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");
const userDb = require('../models/UserModel/User');
const { jwtAuthMiddleware } = require("./jwt");


router.post("/",async (req, res) => {

  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", // collection to join
            localField: "_id", // field from input document
            foreignField: "questionId",
            as: "allAnswers", // output array field
          },
        },
      ])
      .exec()
      .then((docs) => {
        // Check if there are any documents returned
        if (docs.length > 0) {
          // Access the allAnswers field from the first document
          const allAnswers = docs[0].allAnswers;
          res.status(200).send(docs);
        } else {
          res.status(404).send({
            status: false,
            message: "No questions found",
          });
        }
      })
      .catch((error) => {
        console.error("Aggregation error:", error);
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    console.error("Unexpected error:", e);
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

// like or dislike the questions

router.post("/:id/like", async (req, res) => {
  try {
    const post = await questionDB.findById(req.params.id);
    // console.log(post)
    if(req.body.userId == null) return res.send("user Invalid or not found")
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      console.log(post)
      res.status(200).json({
        message:"The post has been liked",
        post:post
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      // post.likes = post.likes.filter((id)=> id != req.body.userId);
      // questionDB.save();
      res.status(200).json({
        message:"The post has been disliked",
        post:post
      });
    }
  } catch (err) {
    res.status(500).json({
      message:"Error in liking the post",
      error:err
    });
  }
});

// to delete the post 
router.delete("/:id", async (req, res) => {
  const questionId = req.params.id;

  try {
    // Find the question by ID and delete it
    const deletedQuestion = await questionDB.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).send({
        status: false,
        message: "Question not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({
      status: false,
      message: "Error deleting the question",
    });
  }
});
module.exports = router;

// gete user's questions

router.get("/:id/users", async (req, res) => {
  try {
    const questions = await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", // collection to join
            localField: "_id", // field from input document
            foreignField: "questionId",
            as: "allAnswers", // output array field
          },
        },
      ]).exec();
    
    const userQuestions = questions.filter((a)=>  a.user._id == req.params.id);
    // console.log(userQuestions,userId)
    if (userQuestions.length > 0) {
      const user = await userDb.findById(req.params.id)

      res.status(200).send({
        user:user,
        questions:userQuestions
      });
    } else {
      res.status(404).send({
        status: false,
        message: "No questions found for the user",
      });
    }
  } catch (error) {
    console.error("Error retrieving user questions:", error);
    res.status(500).send({
      status: false,
      message: "Error retrieving user questions",
      error: error,
    });
  }
});

module.exports = router;
