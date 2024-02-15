import { DataGrid } from '@mui/x-data-grid';
import '../index.css';
import { AppBar,Toolbar,Button, DialogTitle, DialogContent, TextField,Dialog} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import swal from 'sweetalert';
import { name } from 'tar/lib/types';

const Grid=()=>{
  const[open,setopen]=useState(false);
  const[user,setuser]=useState({name:"",contact:"",position:""});
  const[data,setdata]=useState([]);
  const[openupdate,setopenupdate]=useState(false);
  const[rowid,setrowid]=useState();
  //const[idconfig,setidconfig]=useState([]);
  //const[allow,setallow]=useState(true);
  const  handleUpdate=(rowdata)=>{
    setopenupdate(true); 
   setrowid(rowdata.id);
    }

    const updatehandler=(e)=>{
      e.preventDefault();
      setopenupdate(true);
      axios.put(`http://localhost:8000/update/${rowid}`,{name:user.name,contact:user.contact,position:user.position});
    window.location.reload();
    }
const handleDelete=(id)=>{

axios.delete(`http://localhost:8000/delete/${id}`).then(()=>{
  console.log("data deleted"); 
}).catch((err)=>{console.log(err)})
window.location.reload();

}
    
  const columns = [//{ field: 'id', headerName: 'ID', width: 170 }, this way id field will not be displayed
      { field: 'name', headerName: 'NAME', width: 170 },
      { field: 'contact', headerName: 'CONTACT', width: 170 },
      { field: 'position', headerName: 'POSITION', width: 170 },
      {
        field: 'updateButton',
        headerName: 'UPDATE',
        width: 120,
        renderCell: (params) => (
          <strong>
            <Button variant="contained" color="primary" onClick={() => handleUpdate(params.row)}>
              Update
            </Button>
          </strong>
        ),
      },
      {
        field: 'deleteButton',
        headerName: 'DELETE',
        width: 120,
        renderCell: (params) => (
          <strong>
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </strong>
        ),
      },
    ];//params.row allows you to access the data of the current row.
    const rows=[];//this contains the array of objects we can put objects in this array as elements
    //where id value is neccessary
let navigate=useNavigate();
useEffect(()=>{
  axios.get("http://localhost:8000/datafetch").then((res)=>{ 
  const arr=res.data;
  const mappedData = arr.map((i) => ({
    id: i._id,
    name: i.name,
    contact: i.contact,
    position: i.position
  }));

  setdata(mappedData);
 //setdata(res.data);
    console.log(res.data);
   // setidconfig(res.data);

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
setuser({...user,[name]:value});//it adds or updates the key-value pair where the key is determined by the name variable and the value is the value variable.
}
const addhandler=(e)=>{
  e.preventDefault();
 setopen(false);
  axios.post("http://localhost:8000/add",{name:user.name,contact:user.contact,position:user.position});
window.location.reload();
}
const updateclose=()=>{
  setopenupdate(false);
}




      return (
        <>
        <AppBar><Toolbar>
        <h>EMPLOYEE GRID</h>
<Button variant="contained" onClick={opendialog}style={{marginLeft:"75%",marginRight:"2px"}} flex={1}>ADD</Button>
<Button variant="contained" onClick={logouthandler}>LOGOUT</Button>
        </Toolbar></AppBar>
         <div className="datagrid">
      <DataGrid rows={data} columns={columns} pageSize={10}/>
    </div>
    <Dialog open={open} onClose={handleClose}>
<DialogTitle>ADD<CancelIcon onClick={handleClose}style={{float:"right"}}></CancelIcon></DialogTitle>
<DialogContent>
  <form onSubmit={addhandler}> 
 { /*<TextField label="Enter ID" name="id" value={user.id} onChange={handlechange} margin="dense" required/><br/>*/}
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
  {/*<TextField label="Enter ID" name="id" value={user.id} onChange={handlechange} margin="dense" required/><br/>*/}
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