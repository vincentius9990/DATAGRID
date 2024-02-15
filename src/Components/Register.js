
import Textfield from '@mui/material/Textfield';
import EmailIcon from '@mui/icons-material/Email';
import { Button } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import InputAdornment from '@mui/material/InputAdornment';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';
import axios from "axios";


const Register = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirm, setconfirmpassword] = useState("");
    const [emailerr, setemailerr] = useState(false);
    const [passworderr, setpassworderr] = useState(false);
    let navigate = useNavigate();

    const registerhandler = (e) => {
        e.preventDefault();
      if (password === "" || confirm === "" || email === "") {
            swal({
                title: "BLANK VALUES NOT ALLOWED!",
                icon: "error",
                button: "OK",
            });
        return false;
        }
/*if(password==="")
{
    swal({
        title: "BLANK VALUES NOT ALLOWED!",
        icon: "error",
        button: "OK",
    });
}*/
        if(password!==confirm){
            swal({
                title: "BOTH PASSWORDS SHOULD MATCH",
                icon: "error",
                button: "OK",
            });
       
        return false;
        }

        if(emailerr===false&&passworderr===false&&email!==""&&password===confirm)
           { swal({
                title: "REGISTRATION SUCCESSFULL",
                icon: "success",
                button: "OK",
          
            }); console.log(email+password);
            axios.post("http://127.0.0.1:8000/register",{email:email,password:password}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
            navigate("/");} 
return true;
    }

    const emailhandler = (e) => {
        let email = e.target.value.trim();
        var regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\.-]+)\.([a-z]{2,8})(\.[a-z]{2,10})?$/
        if (regx.test(email)) {
            setemailerr(false);
            setemail(email);
        }
        else {

            setemailerr(true);

        }
    }
    const passhandler = (e) => {
        const pass = e.target.value.trim();
        var regx = /[^ ]/
        if (regx.test(pass)&&pass.length>=4&&pass.length<=10) {

            setpassworderr(false);
            setpassword(pass);
        }
        else {
            setpassworderr(true);
        }

    }
    const confirmpasshandler = (e) => {

        setconfirmpassword(e.target.value);
        
        }
        

    return (
        <>
            <form onSubmit={registerhandler} className="loginformstyle">
                <strong>REGISTER</strong>
                <Textfield type="email"  onChange={emailhandler} label="Enter Email " InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }} margin="dense" fullWidth={true} error={emailerr} /><br></br>{emailerr ? <h className="error">Invalid Email(@ compulsory)</h> : ""}<br />
                <Textfield type="password" autoComplete="off"  onChange={passhandler} label="Enter Password" margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon></PasswordIcon>
                            </InputAdornment>
                        ),
                    }} fullWidth={true} error={passworderr} /><br />{passworderr ? <h className="error">Invalid Password(white spaces not allowed||Range(4-10))</h> : ""}<br></br>
                <Textfield type="password" autoComplete="off" onChange={confirmpasshandler} label="Enter Password Again" margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon></PasswordIcon>
                            </InputAdornment>
                        ),
                    }} fullWidth={true}  /><br />


                <Button variant="contained" type="submit">REGISTER</Button>
                <Button variant="outlined" onClick={()=>{navigate('/')}}style={{ marginLeft: "10px" }}>BACK</Button>
            </form>



        </>
    )

}
export default Register;