import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Grid from './Components/Grid';
import DataGridDemo from './Components/DataGridDemo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
 <Routes>  
<Route exact path="/" element={<Login/>}/>
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/grid" element={<Grid/>}/>
<Route exact path="/gridtest" element={<DataGridDemo/>}/>
 </Routes>
 </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
