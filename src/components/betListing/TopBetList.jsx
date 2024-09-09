import React, { useEffect, useState } from 'react'
import { socket } from '../../utility/newSocket'
import copy from "copy-to-clipboard";
import LoadingComponent from '../loader/LoadingComponent';
import RoundModal from '../header/RoundModal';
import TopMultData from './TopMultData';
import { formatBalance, formatDate } from '../../utility/helper';
import { icon } from '../../utility/icon';
import { getCaller } from '../../utility/api';
const winsTabData = [
  { name: 'HUGE WINS', type: 'HW' },
  { name: 'BIGGEST WINS', type: 'BW' },
  { name: 'MULTIPLIERS', type: 'MW' },
];

const filterData = [
  { name: 'Day', filter: 'DAY' },
  { name: 'Month', filter: 'MONTH' },
  { name: 'Year', filter: 'YEAR' },
];
const TopBetList = () => {
  const [winTabActive, setWinTabActive] = useState(0);
  const [filterActive, setFilterActive] = useState(0);
  const [loading, setLoading] = useState(true)
  const [topWinData, setTopWinData] = useState([]);
  const [roundModal, setRoundModal] = useState(false)
  const [roundData, setRoundData] = useState({})
  const [copySuccess, setCopySuccess] = useState(false);
  useEffect(() => {
    fetchData();
  }, [winTabActive, filterActive]);

  const fetchData = async () => {
    const selectedTab = winsTabData[winTabActive];
    const selectedFilter = filterData[filterActive].filter;
    const res = await getCaller(`get/odds?category=${selectedTab.type}&unit=${selectedFilter}`)
    setLoading(true)
    setTopWinData(res?.data);
    setLoading(false)
  }
  const handleFilterChangeData = (index) => {
    setLoading(true); // Show loader when clicking the tab
     setWinTabActive(index)
  };

  const handleFilterChange = (index) => {
    setLoading(true); // Show loader when clicking the tab
    setFilterActive(index);
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

  const roundHandle = (item) => {
    setRoundModal(true)
    setRoundData(item)
  }
  return (
    <div className="" style={{marginTop:"6px",height:"100%"}}>
      <div className='tab-flex-top'>
        <div className='top-win-tab'>
          {winsTabData?.map((win, i) => (
            <div
              className={`win-tab ${winTabActive === i ? 'active-win-tab' : ''}`}
              key={i}
              style={{ cursor: winTabActive === i ? "default" : "" }}
              onClick={() => handleFilterChangeData(i)}
            >
              {win?.name}
            </div>
          ))}
        </div>
        <div className='bet-btn-card-top-1'>
          <div className='bet-tab-content'>
            <div
              className="slider-tab"

              style={{ transform: `translateX(${(300 / 3) * filterActive}%)`, width: `${100 / 3}%` }}
            ></div>
            {filterData?.length>0 ?filterData?.map((el, i) => (
              <div
                key={i}
                style={{ cursor: filterActive === i ? "default" : "" }}
                className={`bet-tabs ${filterActive === i ? 'active-bet-tabs' : ''}`}
                onClick={() => handleFilterChange(i)}
              >
                {el?.name}
              </div>
            )):null
          }
          </div>
        </div>
        {winTabActive !== 2 ? (
          <div className='top-win-card-container' >
            {
              loading ? <LoadingComponent /> : (topWinData?.length>0 ? topWinData?.map((item, i) => (
                <div className="" key={i}>
                  <div className="top-win-card" >
                    <div className="user-img-flex">
                      {
                        item?.avatar ? <img src={item?.avatar} alt="" /> : <img src={icon.profiledefaultImg} alt="" />
                      }

                      <p className='para-primary'>{(item?.name?.slice(0, 1))?.toLowerCase() + "***" + item?.name?.slice(-1)}</p>
                    </div>
                    <div className="amount-card">
                      <div className="bet-width-top">
                        <div className="bet-top">Bet:</div>
                        <div className="bet-top-amount" style={{ padding: 0 }}>{formatBalance(item?.bet_amount)}</div>
                      </div>
                      {
                        winTabActive === 0 ? <>
                          <div className="bet-width-top">
                            <div className="bet-top">Cashed out:</div>
                            <div className="bet-top-amount cashed" style={{ color: item?.settled_max_mult > 10 ? "#C017B4" : (item?.settled_max_mult >= 2 && item?.settled_max_mult <= 10) ? " #913EF8" : "#34B4FF" }} >{item?.settled_max_mult}x</div>
                          </div>
                          <div className="bet-width-top">
                            <div className="bet-top">Win:</div>
                            <div className="bet-top-amount" style={{ padding: 0 }}>
                              {formatBalance(item?.final_amount)}
                            </div>
                          </div>
                        </> : null
                      }
                      {
                        winTabActive === 1 ? <>
                          <div className="bet-width-top">
                            <div className="bet-top">Win:</div>
                            <div className="">
                              <div className="bet-top-amount cashed" style={{
                                backgroundColor: "#123405",
                                border: "1px solid #22e64b",
                                color: "white",
                                fontWeight: "normal", fontSize: "14px",


                              }}>
                                {formatBalance(item?.final_amount)}
                              </div>
                            </div>
                          </div>
                          <div className="bet-width-top">
                            <div className="bet-top">Multiplier:</div>
                            <div className="bet-top-amount" style={{ fontWeight: "700", color: item?.settled_max_mult > 10 ? "#C017B4" : (item?.settled_max_mult >= 2 && item?.settled_max_mult <= 10) ? " #913EF8" : "#34B4FF", textAlign: "left", background: "black", borderRadius: "1rem", padding: ".1rem .5rem .1rem .5rem" }}>
                              {item?.settled_max_mult}x
                            </div>
                          </div>
                        </> : null
                      }

                    </div>
                    <div className="check-mark">
                      <img src={icon.check} alt="" className='check' onClick={() => roundHandle(item)} />
                    </div>
                  </div>
                  <div className="date-container">
                    <div className="amount-flex-1">
                      <p className='para-primary'>
                        {
                          formatDate(item?.created_at)
                        }

                      </p>
                    <div className="flex-img">
                    <p className='para-primary'>Round:</p>
                    <p className='para-primary' style={{ color: "white" }}>{item?.round_max_mult}x</p>
                    </div>
                    </div>
                    <div className="comment-section">
                      <img src={icon.shareandcomment} alt="" style={{ cursor: "pointer" }} onClick={(e) => {
                        e.preventDefault(); // Prevent default mobile copy action
                        copyToClipboard(item);
                      }} />
                    </div>
                  </div>
                </div>
              )):null
            )

            }
          </div>
        ) : (
          <TopMultData topWinData={topWinData} loading={loading} roundHandle={roundHandle} />
        )}

      </div>
      {
        roundModal && (<RoundModal setRoundModal={setRoundModal} roundData={roundData} />)
      }
      {copySuccess && (
        <div className={`copy-popup ${copySuccess ? 'show' : ''}`}>
          Copied for chat!
        </div>
      )}
    </div>

  )
}

export default TopBetList