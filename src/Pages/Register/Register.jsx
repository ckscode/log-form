import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
import { RegisterUser } from '../../ApiCalls/ApiCalls';

const Register = ({loading}) => {
    const [data,setData] =useState({
        name:"",
        email:"",
        password:"",
        phone:""
       })
      
       const navigate = useNavigate()
      
       const handleChange = (e) =>{
        const {name,value} = e.target
          setData({...data,[name]: name === "email" ? value.toLowerCase() : value})
       }
      
       const handleSubmit = async(e) =>{
        try{
            e.preventDefault()
            loading(true)
            const response = await RegisterUser(data)
            if(response.status){
                toast.success(response.message)
                loading(false)
                navigate("/login")
            }else{
                toast.error(response.message)
                loading(false)
            }
        }catch(err){
           console.log(err)
           toast.error(err.message)
           loading(false)
        }  
       }
    return (
        <div className="app w-100 row d-flex justify-content-center align-items-center mx-auto">
        <div className="indiv bg-white col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3 shadow p-3 rounded-4">
        <h1 className="fw-bold">Register</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
         <div className='mb-3'>  
        <label htmlFor="name" className="form-label w-100">
            Name
            <input  
            id="name" 
            type="text" 
            name="name" 
            className="form-control" 
            value={data.name}
            onChange={handleChange}/>
          </label>
          </div> 
          <div className='mb-3'>
          <label htmlFor="email" className="form-label w-100">
            Email
            <input  
            id="email" 
            type="email" 
            name="email" 
            className="form-control" 
            value={data.email}
            onChange={handleChange}/>
          </label>
          </div>
          <div className='mb-3'>
          <label htmlFor="password" className="form-label w-100">
            Password
            <input 
            id="password" 
            type="password" 
            name="password" 
            className="form-control" 
            value={data.password}
            onChange={handleChange}/>
          </label>
          </div>
      <div className='mb-3'>
          <label htmlFor="phone" className="form-label w-100">
            Phone
            <input 
            id="phone" 
            type="number" 
            name="phone" 
            className="form-control" 
            value={data.phone}
            onChange={handleChange} />
          </label>
          </div>
          <div className="w-100 d-flex">
          <button className="btn btn-primary mx-auto w-25">Register</button>
          </div>
          
        </form>
       <div className='text-center mt-3'>Already a user? <Link to="/login" className='text-decoration-none'>Login</Link></div> 
        </div>
      
      </div>
    );
};

export default Register;