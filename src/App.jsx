
import "./App.css"
import Landing from "./Pages/Landing/Landing"
import Login from "./Pages/Login/Login"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./Pages/Register/Register"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer} from "react-toastify";
import { useState } from "react"
function App() {
const [loading,setLoading] = useState(false)
 
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path={"/login"} element={<Login loading={setLoading}/>}/>
      <Route path={""} element={<Register loading={setLoading}/>}/>
      <Route path={"/land"} element={<Landing loading={setLoading}/>}/>
     </Routes>
    </BrowserRouter>
    {loading&&<div className="position-fixed top-0 w-100 bottom-0 bg-white d-flex align-items-center justify-content-center opacity-75">
      <div className="spinner-border text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
      </div>}
    <ToastContainer/>
    </>
  )
}

export default App
