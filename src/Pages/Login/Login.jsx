import { useEffect, useState } from "react"
import "../../App.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { LoginUser } from "../../ApiCalls/ApiCalls"

const Login = ({loading}) => {
 const [data,setData] =useState({
  email:"",password:""
 })

 const navigate = useNavigate()

 const handleChange = (e) =>{
    const {name,value} = e.target
    setData({...data, [name]: name === "email" ? value.toLowerCase() : value})
 }

 const handleSubmit = async(e) =>{
  try{
    e.preventDefault()
    loading(true)
    const response = await LoginUser(data)
    if(response.status){
      localStorage.setItem('token',response.data)
      toast.success(response.message)
      loading(false)
      navigate('/land')
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
 
useEffect(()=>{
  if(localStorage.getItem('token')){
    navigate('/land')
  }
},[])

  return (
    <>
    <div className="app w-100 row d-flex justify-content-center align-items-center mx-auto">
      <div className="indiv bg-white col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3 shadow p-3 rounded-4">
      <h1 className="fw-bold">Login</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="w-100 d-flex mb-3">
        <button className="btn btn-success mx-auto w-25">Login</button>
        </div>
        
      </form>
      <div className="text-center">Not a user? <Link to="/" className='text-decoration-none'>Register</Link></div>
      </div>
    
    </div>

    </>
  )
}

export default Login
