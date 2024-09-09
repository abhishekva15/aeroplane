import React from 'react'
import '../modal.css'
import { IoMdRadioButtonOn } from "react-icons/io";
import { icon } from '../../../utility/icon';

const FreeBets = ({ setFreeBet }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setFreeBet(false)
    }
  };
  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="header-modal-content" style={{ height: "300px" }}>
        <div className="header-modal-head">
          <h2>FREE BETS MANAGEMENT</h2>
          <button onClick={() => setFreeBet(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
        </div>
        <div className='free-container'>
          <div className='free-section'>
            <h2><IoMdRadioButtonOn /></h2>
            <p>Play with cash </p>
          </div>

          <div className='active-section-1'>
            <div className='bets'>
              <p>ACTIVE FREE BETS</p>
            </div>
            <div className='archive-section'>
              <div className='round-icon-history-1' ></div>
              <p>Archive</p>
            </div>
          </div>

          <div className='Default-section'>
            <img src={icon.defaultImage} alt=''></img>
            <p>No Active Free Bets. Yet!</p>

          </div>
        </div>
      </div>

    </div>
  )
}

export default FreeBets

