import { DataGrid } from '@mui/x-data-grid';
import '../index.css';
import { AppBar,Toolbar,Button, DialogTitle, DialogContent, TextField,Dialog} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import swal from 'sweetalert';
const columns = [
  { field: 'id', headerName: 'ID', width: 170 },
    { field: 'name', headerName: 'NAME', width: 170 },
    { field: 'contact', headerName: 'CONTACT', width: 170 },
    { field: 'position', headerName: 'POSITION', width: 170 },
  ];
  const rows=[];
const Grid=()=>{
  const[open,setopen]=useState(false);
  const[user,setuser]=useState({id:"",name:"",contact:"",position:""});
  const[data,setdata]=useState(rows);
  const[openupdate,setopenupdate]=useState(false);
  //const[idconfig,setidconfig]=useState([]);
  //const[allow,setallow]=useState(true);

let navigate=useNavigate();
useEffect(()=>{
  axios.get("http://localhost:8000/datafetch").then((res)=>{
    setdata(res.data);
    setidconfig(res.data);

  //console.log(res.data[0].id);   
  //console.log(idconfig[0].id); 
  });
},[])

    
      const logouthandler=()=>{
navigate("/");
      }
      const opendialog=()=>{
setopen(true);
      }
      const handleClose=()=>{
        setopen(false);
      }
const handlechange=(e)=>{
const{name,value}=e.target;
setuser({...user,[name]:value});
}
const addhandler=()=>{
 setopen(false);
  axios.post("http://localhost:8000/add",{id:user.id,name:user.name,contact:user.contact,position:user.position});

}
const openupdatedialog=()=>{
setopenupdate(true);
}
const updateclose=()=>{
  setopenupdate(false);
}
const updatehandler=(e)=>{
  e.preventDefault();
}
      return (
        <>
        <AppBar><Toolbar>
        <h>EMPLOYEE GRID</h>
<Button variant="contained" onClick={opendialog}style={{marginLeft:"75%",marginRight:"2px"}} flex={1}>ADD</Button>
<Button variant="contained" onClick={openupdatedialog}flex={1}>UPDATE</Button>
<Button variant="contained" onClick={logouthandler}>LOGOUT</Button>
        </Toolbar></AppBar>
         <div className="datagrid">
      <DataGrid rows={data} columns={columns} pageSize={10}/>
    </div>
    <Dialog open={open} onClose={handleClose}>
<DialogTitle>ADD<CancelIcon onClick={handleClose}style={{float:"right"}}></CancelIcon></DialogTitle>
<DialogContent>
  <form onSubmit={addhandler}> 
  <TextField label="Enter ID" name="id" value={user.id} onChange={handlechange} margin="dense" required/><br/>
  <TextField label="Enter name" name="name" value={user.name} onChange={handlechange} margin="dense" required/><br/>
  <TextField label="Enter contact number" name="contact" value={user.contact} onChange={handlechange}margin="dense"required/><br/>
  <TextField label="Enter position" name="position" value={user.position} onChange={handlechange} margin="dense"required/><br/>
  <Button variant="contained" style={{marginLeft:"35%"}} type="submit">ADD</Button>
</form>
</DialogContent>
    </Dialog>
    <Dialog open={openupdate} onClose={updateclose}>
<DialogTitle>UPDATE<CancelIcon onClick={updateclose}style={{float:"right"}}></CancelIcon></DialogTitle>
<DialogContent>

  <form onSubmit={updatehandler}> 
  <TextField label="Enter ID" name="id" value={user.id} onChange={handlechange} margin="dense" required/><br/>
  <TextField label="Enter name" name="name" value={user.name} onChange={handlechange} margin="dense" required/><br/>
  <TextField label="Enter contact number" name="contact" value={user.contact} onChange={handlechange}margin="dense"required/><br/>
  <TextField label="Enter position" name="position" value={user.position} onChange={handlechange} margin="dense"required/><br/>
  <Button variant="contained" style={{marginLeft:"35%"}} type="submit">UPDATE</Button>
</form>
</DialogContent>
    </Dialog>




        </>
      )



}
export default Grid;