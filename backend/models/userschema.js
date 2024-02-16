const mongoose=require('mongoose');

//creating user schema and model
const userschema=new mongoose.Schema({

email:{
type:String,
required:true,
},
password:{
type:String,
required:true,
},
})

const User=mongoose.model("register",userschema);
module.exports=User;