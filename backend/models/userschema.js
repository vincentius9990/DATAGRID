const mongoose=require('mongoose');

//creating user schema and model
const userschema=new mongoose.Schema({

email:String,
password:String
})

const User=mongoose.model("register",userschema);
module.exports=User;