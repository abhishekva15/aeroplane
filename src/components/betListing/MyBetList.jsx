import React, { useEffect, useState } from 'react'
import { socket } from '../../utility/newSocket';
import LoadingComponent from '../loader/LoadingComponent';
import RoundModal from '../header/RoundModal';
import copy from "copy-to-clipboard";
import { formatBalance, formatDateBet, formateTimeBet } from '../../utility/helper';
import { icon } from '../../utility/icon';
import { getCaller } from '../../utility/api';
const MyBetList = ({ info, oneCashout }) => {
  const [myBetData, setMyBetData] = useState([])
  const [crashedData, setCrashedData] = useState([])
  const [loading, setLoading] = useState(true);
  const [roundModal, setRoundModal] = useState(false)
  const [roundData, setRoundData] = useState({})
  const [copySuccess, setCopySuccess] = useState(false);
  const handleMyBet = async () => {
    const res = await getCaller(`mybets?userId=${info.id}&operator_id=${info.operator_id}&limit=10`)
    const newMyBet = res?.data;
    setMyBetData(newMyBet);
    setLoading(false);
  }
  useEffect(() => {
    handleMyBet()
    const handleCrashedData = (data) => {
      try {
        setCrashedData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    socket.on("crashed", handleCrashedData);
    return () => {
      socket.off("crashed", handleCrashedData);
    };
  }, []);
  useEffect(() => {
    if (oneCashout || crashedData) {
      handleMyBet();
    }
  }, [oneCashout, crashedData]);

  const copyToClipboard = (item) => {
    let copyText = item.bet_id;
    let isCopy = copy(copyText);
    if (isCopy) {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  };

  const roundHandle = (item) => {
    setRoundModal(true);
    setRoundData(item);
  };

  return (
    <div className="table-height-1" style={{ position: "relative", marginTop: ".5rem" }}>
      <div className="table-container">
        <div className="table-header">
          <div className="my-bet-date time" >
            <p className='heading-table'>Date</p>
          </div>
          <div className="bet-head-container bet-x-1" >
            <p className='heading-table' style={{ textAlign: "center" }}>Bet</p>
            <p className='heading-table' style={{ textAlign:"right",marginLeft:"1rem" }}>X</p>
          </div>
          <div className="cashout-head-container">
            <p className='heading-table' style={{ textAlign: "left" }}>Cash out</p>
          </div>
        </div>
        {loading ? (
          <LoadingComponent />
        ) : (
          myBetData?.length > 0 ? myBetData?.map((el, i) => (
            <div key={i} className="table-body" style={{
              background: el?.plane_status === "cashout" ? "#123405" : "#101112",
              border: el?.plane_status === "cashout" ? "1px solid green" : "#101112"
            }}>
              <div className="my-bet-date" style={{ minWidth: "62px", maxWidth: "62px" }}>
                <p style={{ fontSize: "12px", fontWeight: "normal", color: "#bbbfc5", lineHeight: "1", display: "flex", flexDirection: "column" }}>
                  <span>  {formateTimeBet(el.created_at)}</span>
                  <span>  {formatDateBet(el?.created_at)}</span>

                </p>
              </div>
              <div className="bet-head-container">
                <div className="bet-amount-body">
                  <p className='cashout-para' style={{ color: el?.plane_status === "cashout" ? "white" : "#7b7b7b", paddingRight: 0 }}>{formatBalance(el?.bet_amount)}</p>
                </div>

                {
                  el?.max_mult ? <div className="bet-mult" style={{
                    color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF",
                    background: "#00000080",

                  }}>
                    {el.max_mult}x
                  </div> : null
                }

              </div>
              <div className="cashout-head-container" style={{ display: "flex", justifyContent: "flex-end" }}>

                {
                  el?.plane_status === "cashout" ? <p className='cashout-para' style={{ color: el?.plane_status === "cashout" ? "white" : "#7b7b7b" }}>
                    {formatBalance(el?.final_amount) ? formatBalance(el?.final_amount) : null}
                  </p> : null
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
        )
        }

      </div>
      {
        roundModal && (<RoundModal roundData={roundData} setRoundModal={setRoundModal} />)
      }
      {copySuccess && (
        <div className={`copy-popup ${copySuccess ? 'show' : ''}`}>
          Copied for chat!
        </div>
      )}
    </div>
  )
}

export default MyBetList