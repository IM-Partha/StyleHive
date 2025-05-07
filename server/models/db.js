const mongoose = require('mongoose');
require('dotenv').config(); // To load the environment variables from .env file
mongoose.connect(process.env.mongo_URL).then(()=>{
    console.log("Mongoose Connect Successfully")
}).catch((e)=>{
    console.log(`${e}`, "Something error")
})