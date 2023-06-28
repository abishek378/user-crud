import React,{useState,useEffect} from 'react';
import axios from "axios"
import { api_url } from '../api/Url';
import {useNavigate} from "react-router-dom"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import "./Home.css"

const Home = () => {
    const navigate=useNavigate();

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [phone,setPhone]=useState("")
const [address,setAddress]=useState("")

const [state,setState]=useState([])


const callApi=async ()=>{
    const response=await axios.get(api_url);
    setState(response.data)
    console.log(response.data)
}


useEffect(()=>{
    callApi();
},[])



const handleSubmit=async (e)=>{
    e.preventDefault(); 
 
const newuser={
    name:name,
    email:email,
    phone:phone,
    address:address
}
console.log(newuser)

if(state.some((item)=> item.email === newuser.email )){
    alert("user already exist");
    e.target.email.value=""
    return ;
}
    
    await axios.post(api_url,newuser)
    navigate('/users')

    
    // console.log(name)
    // console.log(email)
    // console.log(phone)
    // console.log(address)
}



  return (
    <div className='home'>
       <h1 className='icon'> <PersonAddAltIcon  style={{ fontSize: 200 }} /> <br/> <small style={{"color":"rgba(55, 55, 55, 0.577)"}}>Add User</small>  </h1>

<form className='home_form' method="post" onSubmit={handleSubmit}>
    <input placeholder='Name' value={name}   name="name"  onChange={(e)=>setName(e.target.value)} required />
    <br/>
    <br/>

    <input placeholder='Email' type='email' value={email} name="email"  onChange={(e)=>setEmail(e.target.value)} required />
    <br/>
    <br/>

    <input placeholder='Mobile No' value={phone} name="contact"   onChange={(e)=>setPhone(e.target.value)} required />
    <br/>
    <br/>

    <textarea  placeholder='Address' value={address} name="address" onChange={(e)=>setAddress(e.target.value)} required />
    <br/>
    <br/>
    

    <button type="Submit">Submit</button>
    
</form>


    </div>
  )
}

export default Home