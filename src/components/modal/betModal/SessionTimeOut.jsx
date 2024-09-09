import React, { useEffect } from 'react'
const SessionTimeOut = ({ sessionModal, setSessionModal }) => {
    useEffect(() => {
        let timer;
        if (sessionModal) {
            timer = setTimeout(() => {
                setSessionModal(false)
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [sessionModal, setSessionModal]);
    return (
        <div className="win-modal-not" style={{ background: "transparent" }}>
            <div className="error-message">
                <p>Stage time out</p>
                <button onClick={() => setSessionModal(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
            </div>
        </div>
    )
}

export default SessionTimeOut