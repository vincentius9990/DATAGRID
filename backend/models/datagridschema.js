const mongoose=require("mongoose");
const dataschema=new mongoose.Schema({
id:String,
name:String,
contact:String,
position:String
});
module.exports=mongoose.model("adddata",dataschema);
