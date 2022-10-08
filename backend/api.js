const express=require('express');
const router=express.Router();
require("./index");
const User=require("./models/userschema");
const Putdata=require("./models/datagridschema")
router.post("/register",(req,res)=>{
const data=req.body;
const newuser= new User(data);
newuser.save();
res.json(data);
});
router.post("/add",(req,res)=>{
    const add=req.body;
    const n=new Putdata(add);
    n.save();
    res.json(add);

});
router.get("/login",(req,res)=>{
User.find({},(err,data)=>{

if(err){res.json(err);}
else
{
    res.json(data);
}
})
});

router.get("/datafetch",(req,res)=>{
Putdata.find({},(err,data)=>{
if(err){console.log(err);}
else{
    res.json(data);
}
});
});

module.exports=router;