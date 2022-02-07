import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createSvgIcon } from '@mui/material/utils';




export default function AddNewVacation() {

    const [destination, setDestination] = useState("")
    const [price, setPrice] = useState(0)
    const [pictureurl, setPictureurl] = useState("")
    const [description, setDescription] = useState("")
    const [dates, setDates] = useState("")

    const navigate = useNavigate()

    const HomeIcon = createSvgIcon(
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
        'Home',
    );

    const AddNewVacation = async () => {
        const res = await fetch('http://localhost:1000/vacations/add', {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ destination, price, pictureurl, description, dates }),
            credentials: "include"
        })
        const data = await res.json()
        if (!data.err) {
            navigate('/vacations')
        } else {
            alert(data.msg)
        }
    }

    const goHome = () => {
        navigate('/vacations')
    }

    const logout = async () => {
        await fetch('http://localhost:1000/users/logout', {
            method: "delete",
            credentials: "include"
        })
            .then(navigate('/'))
            .then(localStorage.removeItem("role"))
            .then(localStorage.removeItem("username"))
    }


    return (
        <div className='add-vacation-div-wrapper'>
            <nav className="nav-bar">
                <span className="flex">
                    <Box sx={{ '& > :not(style)': { m: 2, }, }}>
                        <HomeIcon onClick={goHome} />
                    </Box>
                    <Button onClick={logout} variant="contained" color="error" size="small">Logout</Button>
                </span>
                {localStorage.role == `"admin"` ?
                    <div className='nav-bar-admin-btn-div'>
                        <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/addnewvacation')}>Create New Vacation</Button>
                        <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/statistics')}>Show Reports</Button>
                    </div> : null}
            </nav>
            <div className='add-vacation-div'>
                <h4>Please Enter Destination</h4>
                <Box sx={{ width: 500, maxWidth: '100%', }} >
                    <TextField color='secondary' fullWidth label="Destination" id="Destination-TextField" onChange={e => setDestination(e.target.value)} />
                </Box>
                <h4>Please Enter Price</h4>
                <Box sx={{ width: 500, maxWidth: '100%', }} >
                    <TextField color='secondary' fullWidth label="Price" id="Price-TextField" type="number" onChange={e => setPrice(e.target.value)} />
                </Box>
                <h4>Please Enter Pictureurl</h4>
                <Box sx={{ width: 500, maxWidth: '100%', }} >
                    <TextField color='secondary' fullWidth label="pictureurl" id="pictureurl-TextField" onChange={e => setPictureurl(e.target.value)} />
                </Box>
                <h4>PLease Enter Description</h4>
                <Box sx={{ width: 500, maxWidth: '100%', }} >
                    <TextField color='secondary' fullWidth label="Description" id="Description-TextField" onChange={e => setDescription(e.target.value)} />
                </Box>
                <h4>Please Enter Date</h4>
                <Box sx={{ width: 500, maxWidth: '100%', }} >
                    <TextField color='secondary' fullWidth label="DD/MM/YY" id="Date-TextField" onChange={e => setDates(e.target.value)} />

                    <Button size="large" variant="contained" onClick={AddNewVacation}>Add</Button>
                </Box>
            </div>
        </div>
    )
}
