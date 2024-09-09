import React from 'react'
import { aviatorData } from '../../../utility/avatarData';
import { socket } from '../../../utility/newSocket';
import '../modal.css'
const ChangeAvator = ({ setChangeAvator, info, }) => {
    
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setChangeAvator(false)
        }
    };
    const handelChange = (item) => {
        socket.emit("message", `PLU:${info.id}:${info.operator_id}:${info.name}:${info.balance}:${item.url}`)
        setChangeAvator(false)
    }
    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="header-modal-content-game">
                <div className="header-modal-head">
                    <h2>Choose Game Avatar</h2>
                    <button onClick={() => setChangeAvator(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>                  
                </div>
                <div className="avatar-flex">
                    {
                        aviatorData?.map((el, i) => (
                            <div className="avator-img" style={{ border: info.avatar === el?.url ? "4px solid #428a12" : "" }} key={i} onClick={() => handelChange(el)}>
                                <img src={el?.url} alt="" />
                            </div>
                        ))
                    }

                </div>
                <div className="avatar-footer" onClick={() => setChangeAvator(false)}>
                    <button type='button' className='close-btn'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ChangeAvator