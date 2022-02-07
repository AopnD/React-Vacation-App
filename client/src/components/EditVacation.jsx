import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function EditVacation({ vacation, setUpdate, editToggle }) {

    const [destination, setDestionation] = useState(vacation.destination)
    const [pictureurl, setPictureurl] = useState(vacation.pictureurl)
    const [description, setDescription] = useState(vacation.description)
    const [dates, setDates] = useState(vacation.dates)
    const [price, setPrice] = useState(vacation.price)

    const editVacation = async () => {
        await fetch(`http://localhost:1000/vacations/edit/${vacation.vacationid}`, {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ destination, price, pictureurl, description, dates }),
            credentials: "include"
        })
        setUpdate(update => !update)
    }

    return (
        <div className='modalBg'>
        <div className='sModal'>
            <Button onClick={editToggle} className='Xbtn'>X</Button>
            <Box sx={{ width: 400, maxWidth: '100%', }} >
            <h3>Edit Vacation Destination:</h3>
                    <TextField value={destination} color='secondary' fullWidth label="" id="Destination1-TextField" onChange={e => setDestionation(e.target.value)} />
            <h3>Edit Vacation Picture URL:</h3>
                    <TextField value={pictureurl} color='secondary' fullWidth label="" id="pictureurl1-TextField" onChange={e => setPictureurl(e.target.value)} />
            <h3>Edit Vacation Description:</h3>
                    <TextField value={description} color='secondary' fullWidth label="" id="Description1-TextField" onChange={e => setDescription(e.target.value)} />
             
            <h3>Edit Vacation Date:</h3>
                    <TextField value={dates} color='secondary' fullWidth label="" id="dates1-TextField" onChange={e => setDates(e.target.value)} />
            <h3>Edit Vacation Price:</h3>
            <TextField type="number" value={price} color='secondary' fullWidth label="" id="price1-TextField" onChange={e => setPrice(e.target.value)} />
                </Box>
            <Button variant="outlined" onClick={editVacation}>Update</Button>
        </div>
        </div>
    )
}
