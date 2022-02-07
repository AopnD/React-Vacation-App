import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box';
import { createSvgIcon } from '@mui/material/utils';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';



export default function Navbar({ setVacationsArr }) {

    const HomeIcon = createSvgIcon(
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
        'Home',
    );

    const [serachValue, setSearchValue] = useState("")

    const navigate = useNavigate()

    const logout = async () => {
        await fetch('http://localhost:1000/users/logout', {
            method: "delete",
            credentials: "include"
        })
            .then(navigate('/'))
            .then(localStorage.removeItem("role"))
            .then(localStorage.removeItem("username"))
    }

    const search = async () => {
        const res = await fetch(`http://localhost:1000/vacations/search/${serachValue}`, {
            method: "get",
            credentials: "include"
        })
        const data = await res.json()
        setVacationsArr(data)
    }

    const goHome = async () => {
        await fetch('http://localhost:1000/vacations', {
            method: "get",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setVacationsArr(data))
    }


    return (
        <nav className="nav-bar">
            <span className="flex">
                <Box sx={{ '& > :not(style)': { m: 2, }, }}>
                    <HomeIcon className='homeBtn' onClick={goHome} />
                </Box>
                <Button onClick={logout} variant="contained" color="error" size="small">Logout</Button>
            </span>
            <span>
                <InputBase
                    sx={{ ml: 20, flex: 1}}
                    placeholder="Search Vacation"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '15px' }} aria-label="search">
                    <SearchIcon onClick={search} />
                </IconButton>
            </span>
            {localStorage.role == `"admin"` ?
                <div className='nav-bar-admin-btn-div'>
                   <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/addnewvacation')}>Create New Vacation</Button>
                   <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/statistics')}>Show Reports</Button>
                </div> : null}
        </nav>
    )
}
