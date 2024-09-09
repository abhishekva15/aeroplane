import React, { useEffect, useState } from 'react'
import { formatBalance } from '../../utility/helper'


const BetButton = ({ planeStatus, showCancel, endDelay, handlePlaceBet, handleCashout, cashoutData,
  nextRound, betData, amount, amountMultiplier, index, handleNextClick, handleCancelBet }) => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (showCancel) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 800); // Adjust the loader duration as needed

      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [showCancel]);
  return (
    <div className="bet-btn">
      {(planeStatus == 0 && !showCancel) ? (
        <button className='' type='button' disabled={(planeStatus == 0 && +endDelay >= 6)} onClick={() => handlePlaceBet(index)}>
          <p> BET <span>{formatBalance(amount)}</span></p>
        </button>
      ) : (
        planeStatus == 0 && showCancel ? (
          <>
            {showLoader ? (
              <>
                <p className='next-text' style={{ opacity: ".5" }}>Waiting for next round</p>
                <button type='button' className='next-btn' style={{ border: "1px solid #ff7171", opacity: "0.5" }} >
                  <p style={{ textShadow: "1px 1px #0e0e0e" }}>CANCEL</p>
                </button>
              </>
            ) : (
              <button className='' type='button' disabled={(planeStatus == 0 && +endDelay >= 6)} style={{ backgroundColor: "#cb011a", border: "1px solid #ff7171" }} onClick={() => handleCancelBet(index)}>
                <p style={{ textShadow: "1px 1px #0e0e0e" }}>CANCEL</p>
              </button>
            )}
          </>
        ) : null
      )}

      {
        (planeStatus == 1 && !betData?.length) ? (
          <>
            {nextRound ? (
              <>
                <p className='next-text'>Waiting for next round</p>
                <button type='button' className='next-btn' style={{ border: "1px solid #ff7171" }} onClick={() => handleCancelBet(index)}>
                  <p style={{ textShadow: "1px 1px #0e0e0e" }}>CANCEL</p>
                </button>
              </>
            ) : (
              <button className='' type='button' onClick={() => handleNextClick(index)}>
                <p> BET <span>{formatBalance(amount)}</span></p>
              </button>
            )}
          </>
        ) : null
      }
      {
        (planeStatus == 1 && betData?.length && showCancel) ? (
          <button type='button' style={{ background: "#d07206", border: "1px solid #ffbd71" }} onClick={() => handleCashout(index)}>
            <p>
              CASH OUT <span> {amountMultiplier?.toFixed(2)}</span>
            </p>
          </button>
        ) : null
      }

      {
        (planeStatus == 2 || (planeStatus == 1 && betData?.length && !showCancel)) ? (
          <>
            {nextRound ? (
              <>
                <p className='next-text'>Waiting for next round</p>
                <button type='button' className='next-btn' style={{ border: "1px solid #ff7171" }} onClick={() => handleCancelBet(index)}>
                  <p style={{ textShadow: "1px 1px #0e0e0e" }}>CANCEL</p>
                </button>
              </>
            ) : (
              <button className='' type='button' onClick={() => handleNextClick(index)}>
                <p> BET <span>{formatBalance(amount)}</span></p>
              </button>
            )}
          </>
        ) : null
      }
    </div>
  )
}

export default BetButton