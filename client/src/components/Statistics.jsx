import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button';
import { createSvgIcon } from '@mui/material/utils';
import Box from '@mui/material/Box';



export default function Statistics() {


    Chart.register(...registerables)

    const [follow, setFollow] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:1000/vacations/showstatistics', {
            method: "get",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setFollow(data))
    }, [])

    const HomeIcon = createSvgIcon(
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
        'Home',
    );

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
        <div className='statistics-div-wrapper'>
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
            <div className="fucker">
                <Bar
                    height={500}
                    width={700}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                    data={{
                        labels: follow.map(vacation => { return vacation.destination }),
                        datasets: [{
                            label: '# of followers',
                            data: follow.map(vacation => { return vacation.bridge }),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        }]
                    }}
                />
            </div>
        </div>
    )
}
