import Textfield from '@mui/material/Textfield';
import EmailIcon from '@mui/icons-material/Email';
import { Button } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import InputAdornment from '@mui/material/InputAdornment';
import "../index.css";
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
const Login = () => {
const[emailerr,setemailerr]=useState(false);
const[passworderr,setpassworderr]=useState(false);
const[email,setemail]=useState("");
const[arr,setarr]=useState("");
const[nav,setnav]=useState(false);
const[password,setpassword]=useState("");

useEffect(()=>{
    axios.get("http://localhost:8000/login").then((data)=>{
   setarr(data.data);
   })
},[]);

const navigate=useNavigate();

   const loginhandler = (e) => {
    e.preventDefault();
   
   
if(email===""&&password==="")
{
    e.preventDefault();
 
    swal({
        title: "BLANK VALUES NOT ALLOWED!",
        icon: "error",
        button: "OK",
      });
      
}
else{  
   arr.forEach((value)=>{
    if(value.email===email&&value.password===password)
    {     setnav(true); 
        swal({
            title: "LOGIN SUCCESSFULL",
            icon: "success",
            button: "OK"
          });
      navigate("/grid");
        
    }
    else{swal({
        title: "INVALID CREDENTIALS",
        icon: "error",
        button: "OK"
      }); }
})
  
 }  }    


const emailhandler=(e)=>{
let email=e.target.value.trim();
var regx=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\.-]+)$/
if(regx.test(email))
{
setemailerr(false)  ;
setemail(email);
}
else
{

setemailerr(true);

}
}


const passhandler=(e)=>{
const pass=e.target.value.trim();
var regx=/[^ ]/
if(regx.test(pass)&&pass.length>=4&&pass.length<=10){
    setpassworderr(false);
    setpassword(pass);
}
else{
    setpassworderr(true);
}
}
const r=()=>{
     navigate("/register");
}
    return (
        <>
            <form onSubmit={loginhandler} className="loginformstyle">
            <strong>LOGIN</strong> 
                <Textfield type="email" error={emailerr} onChange={emailhandler} label="Enter Email " InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}   margin="dense" fullWidth={true} /><br></br>{emailerr?<h className="error">Invalid Email(@ compulsory)</h>:""}<br/>
                <Textfield type="password" n autoComplete="off"  onChange={passhandler}label="Enter Password" margin="dense" 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PasswordIcon></PasswordIcon>
                        </InputAdornment>
                    ),
                }} fullWidth={true} error={passworderr} /><br />{passworderr?<h className="error">Invalid Password(white spaces not allowed||Range(4-10))</h>:""}<br></br>
                <Button variant="contained" type="submit">LOGIN</Button>
                <Button onClick={r}>REGISTER</Button>
            </form>
        </>

    )

}
export default Login;