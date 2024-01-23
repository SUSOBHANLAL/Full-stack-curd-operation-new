import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css"
import axios from "axios";
import toast from "react-hot-toast";

const Edit  = () => {


    const users = {
        fname:"",
        lname:"",
        email:"",
    }

    const {id}  = useParams();
    const [user,setUser] = useState(users);
    const nevigate = useNavigate();

    const inputChangeHandler = (e) => {
        const {name,value} = e.target;
        setUser({...user,[name]:value});
        console.log(user);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8020/api/getOne/${id}`)
        .then((reponse) =>{

            setUser(reponse.data)
            console.log(reponse)
        })
        .catch((error) =>{
            console.log(error);
        })
    },[id])

    const submitForm  = async(e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8020/api/update/${id}`,user)
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
            <h3>Update User</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroupp">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" value={user.fname} onChange={inputChangeHandler} id="fname" name="fname" autoComplete="off" placeholder="first name"></input>
                </div>
                <div className="inputGroupp">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" value={user.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete="off" placeholder="last name"></input>
                </div>

                <div className="inputGroupp">
                    <label htmlFor="email">Email</label>
                    <input type="text" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete="off" placeholder="Email name"></input>
                </div>

              
                <div className="inputGroupp">
                    <button type="submit">Update User</button>
                </div>
            </form>
        </div>
    )
}
export default Edit;