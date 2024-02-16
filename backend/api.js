const express=require('express');
const router=express.Router();//new instance of router object
require("./index.js");

const User=require("./models/userschema");//both models
const Putdata=require("./models/datagridschema");
router.post("/register",(req,res)=>{//registration form filled
const data=req.body;
const newuser= new User(data);
newuser.save().then(()=>{console.log("data saved successfully");res.json(data);}).catch((er)=>{console.log(er)})
});
router.post("/add",(req,res)=>{
    const add=req.body;//to access the data submitted from the user
    const n=new Putdata(add);//creating new instance of model to save to database
    n.save();
   res.json(add);

});

router.put('/update/:id',(req,res)=>{
const id=req.params.id;
console.log(req.body);
    Putdata.findByIdAndUpdate(id,req.body,{new:true}).then((data)=>{res.json(data)}).catch((err)=>{console.log(err)})
})
router.delete('/delete/:id',(req,res)=>{
const id=req.params.id;
Putdata.findByIdAndDelete(id).then(()=>{console.log("data successfully deleted")}).catch((err)=>{

console.log(err);

})



})
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

router.get("/test",(req,res)=>{

}); 

//router.update

module.exports=router;