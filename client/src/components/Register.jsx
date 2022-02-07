import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastname] = useState("")

    const naviagte = useNavigate()


    const register = async () => {
        const res = await fetch('http://localhost:1000/users/register',{
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password, name, lastName }),
            credentials:"include"
        })
        const data = await res.json()
        if(!data.err){
            naviagte('/')
        }else{
            alert(data.msg)
        }
    }


    return (
        <div>
<p>PLease Choose a UserName</p> <input type="text" placeholder="username" onChange={ e=> setUsername(e.target.value)} />
<p>Please Choose a Password</p> <input type="password" placeholder="password" onChange={e=> setPassword(e.target.value)} />
<p>Please Enter Your Name</p> <input type="text" placeholder="first name" onChange={e=> setName(e.target.value)} />
<p>Please Enter Your Last Name </p> <input type="text" placeholder="last name" onChange={e=> setLastname(e.target.value)} />
<button onClick={register}>Register</button>
<NavLink to="/"> Already Have An Account </NavLink>
        </div>
    )
}
