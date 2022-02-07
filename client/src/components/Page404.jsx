import React from 'react'
import { useNavigate } from 'react-router';
import YouTube from 'react-youtube';


export default function Page404() {
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
    const navigate = useNavigate()
    return (
        <div>
            <h1>Opss.....Page Not Found</h1>
            <YouTube videoId="4-TbQnONe_w" opts={opts} onReady={onReady} />
            <button onClick={()=> navigate('/vacations')}>Click To go Home Page</button>
        </div>
    )
}
