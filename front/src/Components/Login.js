import TextField from '@mui/material/TextField';
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
const[password,setpassword]=useState("");

useEffect(()=>{
    axios.get("http://localhost:8000/login").then((data)=>{
   setarr(data.data);
   console.log(data.data);
   })
},[]);//axios.get returns promise

const navigate=useNavigate();

   const loginhandler = (e) => {
    e.preventDefault();
   
   
if(emailerr===true || passworderr===true||email===null||password===null)
{
    
 
    swal({
        title: "INCORRECT CREDENTIALS!",
        icon: "error",
        button: "OK",
      });
 return false;     
}

   arr.forEach((value)=>{
    if(value.email===email&&value.password===password)
    {
        swal({
            title: "LOGIN SUCCESSFULL",
            icon: "success",
            button: "OK"
          });
      navigate("/grid");
        
    }
    else
    {
        swal({
            title: "INCORRECT CREDENTIALS!",
            icon: "error",
            button: "OK",
          });
return false;
    }
   });

}

const emailhandler=(e)=>{
let email=e.target.value.trim();
var regx=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\.-]+)\.([a-z]{2,8})(\.[a-z]{2,10})?$/
if(regx.test(email))//regx.test return 1 for valid email otherwise returns 0
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
var regx=/[^ ][a-zA-Z0-9]{3}/
if(regx.test(pass)&&pass.length<=10){
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
            <br></br>
                <TextField variant="outlined"  margin="dense" label="Enter email" onChange={emailhandler} fullWidth={true}
                 InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>,
          }}
                error={emailerr}    
                
                ></TextField>

            <br/>
            {emailerr?<h className="error">Invalid Email(@ compulsory)</h>:""}
               <br/>
                <TextField type="password" n autoComplete="off"  onChange={passhandler}label="Enter Password" margin="dense" 
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