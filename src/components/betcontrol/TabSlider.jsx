import React from 'react'
import minus from '../../frontend/assets/minus-btn.svg'
import { MdAdd } from 'react-icons/md';
import { betButton } from '../../utility/staticData';
const TabSlider = ({ index, numCards, setActiveBet, activeBet, setShowCancel, setNumCards, disableButton, autoCash, autoBet,opacityDisable }) => {
    const handleRemoveCard = () => {
        setNumCards(numCards + 1)
    }
    return (
        <div className="bet-btn-card-top" >
            <div className="bet-tab-content" >
                <div className="slider-tab" style={{ transform: activeBet === 0 ? "translateX(0%)" : "translateX(100%)" }} ></div>
                <button  style={{ cursor: activeBet === 0 || autoCash ? "default" : "", color: autoCash ? "#9ea0a3" : "" }} disabled={autoCash || autoBet||opacityDisable} className={`bet-tabs ${activeBet === 0 ? "active-bet-tabs" : ""} ${autoCash ? "no-hover" : ""}`} onClick={() => setActiveBet(0)}>
                    Bet
                </button>
                <button disabled={autoCash || autoBet||opacityDisable}  style={{ cursor: activeBet === 1 ? "default" : "", background: autoCash ? "2c2d30" : "", color: autoCash ? "#9ea0a3" : "" }} className={`bet-tabs ${activeBet === 1 ? "active-bet-tabs" : ""}`} onClick={() => setActiveBet(1)}>
                    Auto
                </button>
                {/* <div className="slider-tab" style={{ left: activeBet === 0 ? "0%" : "50%" }}></div> */}
            </div>
            {
                index === 1 ? <div className="hide-show-button">
                    {numCards > 1 && (
                        <button disabled={disableButton||opacityDisable} className="minus-bg" onClick={() => setNumCards(numCards - 1)}>
                            <img src={minus} alt="minus" style={{ cursor: disableButton ? "default" : "" }} className='minus-img' />
                        </button>
                    )}
                </div> : null
            }
            {
                index === 0 ? <div className='hide-show-button'>
                    {numCards < betButton?.length && (
                        <button className="plus-bg" onClick={handleRemoveCard}>
                            <MdAdd style={{ color: "white", fontSize: "1.2rem" }} />
                        </button>
                    )}
                </div> : null
            }
        </div>
    )
}

export default TabSlider