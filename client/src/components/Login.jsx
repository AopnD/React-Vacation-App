import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate() //replace useHistory

const login = async () =>{
    const res = await fetch("http://localhost:1000/users/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    })
    const data = await res.json()
    if (!data.err) {
        localStorage.username = data.username
        localStorage.role =data.role
        navigate('/vacations') //No need to use Push
    } else {
        alert(data.msg)
    }}
    
    return (
        <div className="login-wrapper">
            <div className="login-div">
            <Box sx={{ '& button': { m: 1 } }}>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e=> setUsername(e.target.value)} />
            <TextField id="outlined-basic" label="Password" type="password" variant="outlined" onChange={e=> setPassword(e.target.value)} />
            <div>
                <Box>
            <Button size="large" onClick={login} variant="contained">Login</Button>
                </Box>
                <Box>
                <NavLink to='/register'>Don't Have An Account yet?</NavLink>
                </Box>
                </div>
                </Box>
            </div>
        </div>
    )
}
