const mongoose = require('mongoose');
require('dotenv').config();

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.databaseUrl);
        console.log("database connected successfully")
    } catch (error) {
        
    }

}
module.exports = connect;