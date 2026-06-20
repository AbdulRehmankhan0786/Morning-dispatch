import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:""
  });

  const [message,setMessage] = useState("");

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{

      const res = await fetch("http://https://morning-dispatch.onrender.com/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json()

      if(!res.ok){
        setMessage(data.message)
        return
      }

      setMessage("Signup successful")

      setTimeout(()=>{
        navigate("/sign-in")
      },1000)

    }catch(error){
      setMessage("Server error")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          />

          <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          />

          <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Sign Up
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? 
          <span
          onClick={()=>navigate("/sign-in")}
          className="text-blue-500 cursor-pointer ml-2"
          >
            Sign In
          </span>
        </p>

        {message && (
          <p className="text-center text-red-500 mt-3">{message}</p>
        )}

      </div>

    </div>
  )
}