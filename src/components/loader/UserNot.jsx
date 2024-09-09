import React from 'react'
import { Link } from 'react-router-dom'
const UserNot = () => {
    return (
        <div className='session-expire'>
            <div className="">
                <p className='session-para'>
                    User does not exist, Please login through valid source
                </p>
            </div>
            <div className="home-btn-container">
                <Link to={"https://victoryexch9.com/global-casino/game"} className='home-btn'>Home</Link>
            </div>
        </div>
    )
}

export default UserNot