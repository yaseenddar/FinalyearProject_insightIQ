const express = require("express");
const router = express.Router();

const answerDB = require("../models/Answer");

router.post("/", async (req, res) => {
  try {
    await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
      })
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
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});

// delete teh ans
router.delete('/:id',async (req,res)=>{

  const ansId = req.params.id
  try {

    const res = await answerDB.findByIdAndDelete(ansId)
    .then((res)=>{
      res.status(200).send("deleted successfulley")
      .catch((err)=>{
        res.status(404).send("error occured in deleting answer")
      })
    })
  } catch (error) {
    
  }
})

module.exports = router;
