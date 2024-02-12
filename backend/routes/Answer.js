const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
const Answer = require("../models/Answer")
router.post("/:id", async (req, res) => {
  try {
    const {answer,user} = req.body;
    const newAns = new Answer ({
      content:answer,
      user:user,
    })
    console.log("created the answer",newAns)
    await newAns.save();
    const question = await Question.find({_id:req.params.id})
    console.log("quesetion " ,question)
    if(question){
      const updatedQuestion = await Question.updateOne(
        {_id:req.params.id},
        {$push:{answers:newAns._id}},
        {new:true}
      )
     
       .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
    }

  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});

module.exports = router;
