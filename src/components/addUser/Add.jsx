import React, { useState } from "react";
import "./add.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

const Add = ()=>{
    // at the time of initial condition  all filds are empty 

    const users = {
        fname :"",
        lanme:"",
        email:"",
        password:"",

    }

    const [user,setUser] = useState(users);

    const nevigate  = useNavigate();
    const inputHandler = (e) =>{
      const {name,value} = e.target;
       setUser({...user,[name]:value});
       console.log(user);
     
    }

    const submitForm  = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8020/api/create/",user)
        .then((response )=>{
            toast.success(response.data.msg, {position:"bottom-right"})
            // afteter that redirect to the home page through nevigate
            nevigate("/");

                console.log(response);
        }).catch(error => console.log(error))
    }
    
    return(
        <div className="addUser">
            <Link to={"/"}>Back</Link>
            <h3>Add New User</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroupp">
                    <label htmlFor="fname">First Name</label>
                    <input type="text"onChange={inputHandler} id="fname" name="fname" autoComplete="off" placeholder="first name"></input>
                </div>
                <div className="inputGroupp">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text"onChange={inputHandler} id="lname" name="lname" autoComplete="off" placeholder="last name"></input>
                </div>

                <div className="inputGroupp">
                    <label htmlFor="email">Email</label>
                    <input type="text"onChange={inputHandler} id="email" name="email" autoComplete="off" placeholder="Email name"></input>
                </div>

                <div className="inputGroupp">
                    <label htmlFor="password">Password </label>
                    <input type="text"onChange={inputHandler} id="password" name="password" autoComplete="off" placeholder="password"></input>
                </div>
                <div className="inputGroupp">
                    <button type="submit">Add User</button>
                </div>
            </form>
        </div>
    )
}
export default Add