import React, { useEffect, useState } from 'react';
import image from '../../assets/image.png'
import './Landing.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify"
import { getCurrentUser } from '../../ApiCalls/ApiCalls';

const Landing = ({loading}) => {
    const [user,setUser] = useState()
    const navigate = useNavigate()

    const getData = async()=>{
        try{
            const decode = jwtDecode(localStorage.getItem('token'));
            const currentEpoch = Math.floor(Date.now() / 1000);
            if(currentEpoch<decode.exp){
                loading(true)
                const response = await getCurrentUser()
                 setUser(response.data.name)
                 loading(false)
            }else{
                loading(false)
                logout()
            }
        
        }catch(err){
           console.log(err)
           loading(false)
        }
    }

   const logout = () =>{
    if(localStorage.getItem('token')){
        localStorage.removeItem('token')
        toast.warning('logged out!')
        navigate('/login')
    }
   }

    useEffect(()=>{
        if(localStorage.getItem('token')){
         getData()
        }else{
            navigate('/login')
        }
    },[])
    return (
        <div className='land-out w-100 d-flex'>
            <div className='text-center my-auto'>
            <h1 className='fw-bold'>Welcome, {user}!
            </h1>
           <img src={image} className='w-25'/> 
           <div className='text-center'>
            <button className='btn btn-danger' onClick={logout}>Logout</button>
           </div>
           </div>
        </div>
    );
};

export default Landing;