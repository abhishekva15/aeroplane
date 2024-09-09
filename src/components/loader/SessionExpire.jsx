import React from 'react'

const SessionExpire = ({ socketConnected, logout}) => {
    return (
        <div className='session-expire'>
            <div className="">
                <p className='session-para'>
                    {
                        !socketConnected ? "You have been disconnected.Check connection and refresh your browser,or go back to landing page" : null
                    }
                    {
                        logout ? "Session time out.Please refresh your browser,or go back to landing page" : null
                    }

                </p>
            </div>
           
        </div>
    )
}

export default SessionExpire