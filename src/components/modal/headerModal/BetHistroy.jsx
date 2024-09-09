import React, { useEffect, useState } from 'react'
import { socket } from '../../../utility/newSocket';
import copy from "copy-to-clipboard";
import RoundModal from '../../header/RoundModal';
import LoadingComponent from '../../loader/LoadingComponent';
import '../modal.css'
import { icon } from '../../../utility/icon';
import { formatBalance,formatDateBet, formateTimeBet } from '../../../utility/helper';
import { getCaller } from '../../../utility/api';
const BetHistroy = ({ setBetHistroy, info }) => {
  const [myBetData, setMyBetData] = useState([])
  const [roundModal, setRoundModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false);
  const [startIndex, setStartIndex] = useState(10); // Initial start index
  const [loadCount, setLoadCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [roundData, setRoundData] = useState({})
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setBetHistroy(false)
    }
  };
  useEffect(() => {
    fetchBetData(startIndex);
    return () => {
      socket.off("mybet");
    };
  }, []);
  const fetchBetData = async(start) => {
      const res = await getCaller(`mybets?userId=${info.id}&operator_id=${info.operator_id}&limit=${start}`)
      const newMyBet = res?.data;
      setMyBetData(newMyBet);
      setLoading(false);
    
  };
  const copyToClipboard = (item) => {
    let copyText = item.bet_id;
    let isCopy = copy(copyText);
    if (isCopy) {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000); // Hide the popup after 2 seconds
    }
  };
  const loadMoreData = () => {
    const nextStartIndex = startIndex + loadCount;
    fetchBetData(nextStartIndex);
    setStartIndex(nextStartIndex);
  };
  const roundHandle = (item) => {
    setRoundModal(true)
    setRoundData(item)
  }
  return (
    <>
      <div className="overlay" style={{height:"auto"}} onClick={handleOverlayClick}>
        <div className="header-modal-content">
          <div className="header-modal-head" style={{ padding: "1.1rem .5rem 1.1rem .5rem" }}>
            <h2>MY BET HISTROY</h2>
            <button onClick={() => setBetHistroy(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
          </div>
          <div className="table-container-my-bet" style={{ marginTop: ".5rem" }}>
            <div className="table-header">
              <div className="my-bet-date time">
                <p className='heading-table'>Date</p>
              </div>
              <div className="bet-head-container bet-x-1" >
                <p className='heading-table' style={{ textAlign: "center" }}>Bet</p>
                <p className='heading-table' style={{ textAlign: "center" }}>X</p>
              </div>
              <div className="cashout-head-container">
                <p className='heading-table' style={{ textAlign: "left" }}>Cash out</p>
              </div>
            </div>
            {
              loading ? (
                <LoadingComponent />
              ) :
                myBetData?.length > 0 ? myBetData?.map((el, i) => (
                  <div key={i} className="table-body" style={{
                    background: el?.status === "cashout" ? "#123405" : "#101112",
                    border: el?.status === "cashout" ? "1px solid green" : "#101112"
                  }}>
                     <div className="my-bet-date" style={{minWidth:"62px",maxWidth:"62px"}}>
                      <p style={{ fontSize: "12px", fontWeight: "normal", color: "#bbbfc5",lineHeight:"1", display: "flex", flexDirection: "column" }}>
                        <span>  {formateTimeBet(el.created_at)}</span>
                        <span>        {formatDateBet(el?.created_at)}</span>

                      </p>
                    </div>
                   
                    <div className="bet-head-container">
                     <div className="bet-amount-body">
                     <p className='cashout-para' style={{ color: el.status === "cashout" ? "white" : "#7b7b7b",paddingRight:0 }}>{formatBalance(el?.bet_amount)}</p>
                     </div>
                   
                    {
                        el?.max_mult ? <div className="bet-mult" style={{
                          color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF",
                          background: "#00000080",
                    
                        }}>
                        {el.max_mult?el?.max_mult:0.00}x
                        </div> : null
                      }
                   
                    </div>
                    <div className="cashout-head-container" style={{ display: "flex", justifyContent: "flex-end" }}>
      
                    {
                  el?.plane_status === "cashout" ? <p className='cashout-para' style={{ color: el?.plane_status === "cashout" ? "white" : "#7b7b7b" }}>
                    {formatBalance(el?.final_amount) ? formatBalance(el?.final_amount) : null}
                  </p> :null
                }
                      <div className="check-mark" style={{ gap: "5px" }}>
                        <img src={icon.check} alt="" className='check' onClick={() => roundHandle(el)} />
                        <img src={icon.chat} alt="" className='check' onClick={(e) => {
                      e.preventDefault(); // Prevent default mobile copy action
                      copyToClipboard(el);
                    }} />
                      </div>
      
                    </div>
      
                  </div>
                )) : null
            }
          </div>
         
        <div className='load-section'>
          <button type='button' onClick={loadMoreData}>Load more</button>
        </div>
         
        </div>
      </div>
      {
        roundModal && (<RoundModal setRoundModal={setRoundModal} roundData={roundData} />)
      }
      {copySuccess && (
        <div className={`copy-popup ${copySuccess ? 'show' : ''}`}>
          Copied for chat!
        </div>
      )}
    </>
  )
}

export default BetHistroy