import React, { useState } from 'react'
import EditVacation from './EditVacation'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function VacationCard({ vacation, setUpdate }) {


    const [showinfo, setShowinfo] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selected, setSelected] = useState(false)

    const id = vacation.vacationid

    const loadInfo = () => {
        if (showinfo == false) {
            setShowinfo(true)
        } else {
            setShowinfo(false)
        }
    }

    const follow = async () => {
        await fetch(`http://localhost:1000/vacations/follow/${vacation.vacationid}`, {
            method: "put",
            credentials: "include"
        })
    }

    const deleteVacation = async () => {
        const res = await fetch(`http://localhost:1000/vacations/remove/${id}`, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id }),
            credentials: "include"
        })
        const data = await res.json()

        if (!data.err) {
            console.log(data.msg)
            setUpdate(update => !update)
        } else {
            console.log(data.err)
        }
    }

    const editToggle = () => {
        if (openEdit == true) {
            setOpenEdit(false)
        } else {
            setOpenEdit(true)
        }
    }

    return (
        <div className="card">
            <Card sx={{ width: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={vacation.pictureurl}
                    alt="Picture Not Found"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {vacation.destination}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        ${vacation.price}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {vacation.dates}
                    </Typography>
                    {showinfo == true ? <Typography variant="body2" color="text.secondary">
                        {vacation.description}
                        {vacation.dates}
                    </Typography> : null}
                </CardContent>
                <CardActions>
                    <Button onClick={loadInfo} size="small">More Info</Button>
                    {localStorage.role == '"user"' ?
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <ToggleButton
                                value="check"
                                selected={selected}
                                onChange={() => {
                                    setSelected(!selected);
                                }}
                                onClick={follow}
                            >
                                <Grid item xs={15}>
                                    <FavoriteIcon>
                                    </FavoriteIcon>
                                </Grid>
                            </ToggleButton>
                        </ButtonGroup>
                        :
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button size="small" onClick={editToggle}>Edit</Button>
                            <Button size="small" onClick={deleteVacation}>Delete</Button>
                        </ButtonGroup>
                    }
                    {openEdit == true ?
                        <EditVacation vacation={vacation} setUpdate={setUpdate} editToggle={editToggle} />
                        : null}
                </CardActions>
            </Card>

        </div>
    )
}


