import React from 'react'
import '../modal.css'
const GameLimit = ({ setGameLimit }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setGameLimit(false)
        }
    };
    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="header-modal-content" style={{height:"200px"}}>
                <div className="header-modal-head">
                    <h2>Game Limits</h2>
                    <button onClick={() => setGameLimit(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
                </div>
                <div className='gameLimit-container'>
                    <div className='mini-section'>
                        <p className='prob-common-para' style={{ color: "white" }}>Minimum bet :</p>
                        <h4>20.00</h4>
                    </div>
                    <div className='mini-section'>
                        <p className='prob-common-para' style={{ color: "white" }}>Maximum bet :</p>
                        <h4>20,000.00</h4>
                    </div> 
                    <div className='mini-section'>
                        <p className='prob-common-para' style={{ color: "white" }}>Maximum win for one bet :</p>
                        <h4>2,00,000.00</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameLimit