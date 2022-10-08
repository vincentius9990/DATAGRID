const express=require('express');
//set up express app
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
app.use(bodyparser.json());
const cors=require("cors");
app.use(cors());
//to use the routes in our express application
app.use(require('./api.js'));
mongoose.connect("mongodb://127.0.0.1:27017/datagrid",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("connection successfull")).catch((er)=>{console.log(er)});
//listen for requests
app.listen(8000);