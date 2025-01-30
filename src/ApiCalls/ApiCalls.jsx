import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const RegisterUser = async(data)=>{
    try{
        const response =await axios.post(`${API_URL}/api/user/register`,data).then((res)=>{return res.data}).catch((error)=>{return error})
          return response;
    }catch(error){
          return error
    }
 
}

export const LoginUser = async(data)=>{
    try{
        const response =await axios.post(`${API_URL}/api/user/login`,data,
            {headers:{
                authorization: `Bearer ${localStorage.getItem("token")}`
            }}).then((res)=>{return res.data}).catch((error)=>{return error})
      
          return response;
    }catch(error){
          return error
    }
 
}

export const getCurrentUser = async() =>{
    try{
        const response = await axios.get("http://localhost:5000/api/user/get-current-user", {
            headers:{
                    authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then((res)=>{return res.data}).catch((error)=>{return error}) 
          return response;
    }catch(error){
          return error
    }
}