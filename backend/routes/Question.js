const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await Question
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

router.get("/all", async (req, res) => {
  try {
    console.log("tjis is before")
    const allquestions = await Question.find({});
      console.log(allquestions)
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;
