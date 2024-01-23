import React, { useEffect, useState } from "react";
import "./user.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';


const User =() =>{

    const [users,setUsers] = useState([]);

// here u hhave ise that useEffect to show all the data 
    useEffect(()=>{
        const fetchData = async() =>{
           const response =  await axios.get("http://localhost:8020/api/getall");
           setUsers(response.data);
        }
        fetchData();
    },[])
    
    const deleteUsers = async(userId) =>{
        await axios.delete(`http://localhost:8020/api/delete/${userId}`)
        .then((response) =>{
            setUsers((prevUser)=> prevUser.filter((user)=>user._id !== userId))
            toast.success(response.data.msg,{position:"bottom-right"})
            console.log(response)

        }).catch((error) =>{
            console.log(error);
        })

    }
    return(
        <div className="userTable">
            <Link to = {"/add"} className="addbtn">Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th className="stab">S.no</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>{
                            return (
                                <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.fname}   {user.lname}</td>
                                <td>{user.email}</td>
                                <td className="actionButton">
                                    <button onClick={()=> deleteUsers(user._id)}>Delete</button>
                                    <Link to = {`/edit/`+user._id}>edit</Link>
                                </td>
                            </tr>

                            )
                        })

                    }
                   
                </tbody>
            </table>
        </div>
    )
}

export default User