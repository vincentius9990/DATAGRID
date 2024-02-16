const mongoose=require("mongoose");
const dataschema=new mongoose.Schema({
name:String,
contact:String,
position:String,
});
module.exports=mongoose.model("adddata",dataschema);
