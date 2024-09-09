import React, { useEffect } from 'react'
import { RiCloseFill } from 'react-icons/ri'

const NotEnoughModal = ({setShowBalace,showBalance,amount}) => {
    useEffect(() => {
        let timer;
        if ( showBalance) {
            timer = setTimeout(() => {
                setShowBalace(false)
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [ showBalance, setShowBalace]);
  return (
    <div className="win-modal-not" style={{ background: "transparent" }}>
    <div className="error-message">
            <p>{+amount===0?"Can't set bet amount 0":"Not enough balance"}</p>
        <div className="" onClick={() => setShowBalace(false)}>
            <RiCloseFill className="icon-close" />
        </div>
    </div>
</div>
  )
}

export default NotEnoughModal