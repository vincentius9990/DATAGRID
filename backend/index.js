const express=require('express');
const { toASCII, toUnicode } = require('url').domainToASCII;
//set up express app
const app=express();
const mongoose=require('mongoose');
//app.use(bodyparser.json());
const cors=require("cors");
app.use(express.json());

app.use(cors());
mongoose.set('strictQuery', false); 
//app.use(express.urlencoded);
//to use the routes in our express application
app.use(require('./api.js'));
mongoose.connect("mongodb://127.0.0.1:27017/datagrid")
.then(()=>console.log(" mongoose connection successfull")).catch((er)=>{console.log(er)});
//listen for requests
app.listen(8000,()=>{console.log("server connected")});