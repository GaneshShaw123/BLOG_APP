import React, { useState } from "react";

function Signup(){
    const [userdata, setuserdata] = useState({
        name:"",
        email:"",
        password:""
      })
      async function handleSubmit(){
        let data =await fetch("http://localhost:4000/api/v1/users",{
          method:"POST",
          body:JSON.stringify(userdata),
          headers:{
            "Content-Type":"application/json"
          }
        })
        let res=await data.json();
        if(res.success){
          localStorage.setItem("user",JSON.stringify(res.user))
        }
        //console.log(res);
        alert(res.message)
      }
    return ( <div>
        <h1>Sign up</h1>
        <div>
          <input onChange={(e)=>setuserdata((prev)=>({
            ...prev,
            name:e.target.value
          }))
          } type="text" placeholder="Name" name="" id=""/>
          <br/>
          <input onChange={(e)=>setuserdata((prev)=>({
            ...prev,
            email:e.target.value
          }))
          } type="email" placeholder="Emai" name="" id=""/>
          <br/>
          <input onChange={(e)=>setuserdata((prev)=>({
            ...prev,
            password:e.target.value
          }))
          } type="text" placeholder="Password" name="" id=""/>
      
        </div>
        <br/>
        <button onClick={handleSubmit}>Submit </button>

      </div>)
}
export default Signup