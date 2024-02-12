const express = require('express');
require('dotenv').config();
const app = express();
const connect = require('./config/database')
const PORT = 3000;

// middleware functoins
const questionRouter = require("./routes/Question");
const answerRouter = require("./routes/Answer");
app.use(express.json())
app.use('/api/question',questionRouter)
app.use('/api/answer',answerRouter)
app.listen(PORT,()=>{
console.log(`server start at port ${PORT}`)
connect();
})