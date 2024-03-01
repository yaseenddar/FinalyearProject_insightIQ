const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");

router.post("/", async (req, res) => {

  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
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
