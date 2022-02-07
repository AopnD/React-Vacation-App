import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import YouTube from 'react-youtube';
import VacationCard from './VacationCard';
import { useNavigate } from 'react-router'
import Navbar from './Navbar';

export default function VacationsList() {
    const [vacationsArr, setVacationsArr] = useState([])
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        fetch('http://localhost:1000/vacations', {
            method: "get",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setVacationsArr(data))
    }, [update])
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    }
    const onReady = (event) => {
        event.target.pauseVideo()
    }




    return (
        <div className='card-list-div'>
            {localStorage.role ? <div className="card-container">
                <Navbar setVacationsArr={setVacationsArr} />
                {vacationsArr.length ?
                    vacationsArr.map(vacation => <VacationCard vacation={vacation}  key={vacation.vacationid} setUpdate={setUpdate} />)
                    :
                    "Loading Vacations"}
            </div> :
                <div className="faildToLogin">
                    <YouTube videoId="ykU5UIG2fmo" opts={opts} onReady={onReady} />
                    <NavLink to="/">Click Here To Login</NavLink>
                </div>
            }
        </div>
    )
}

