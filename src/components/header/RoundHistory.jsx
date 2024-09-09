import React, { useRef, useEffect, useState } from 'react'
import RoundModal from './RoundModal'
const RoundHistory = ({ maxOdds, setMenuOpen, oddsOpen, setOddsOpen }) => {
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [roundModal, setRoundModal] = useState(false)
    const [roundData,setRoundData] = useState({})
    const toggleMenu = (e) => {
        e.stopPropagation();
        setOddsOpen(!oddsOpen);
        setMenuOpen(false)
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setOddsOpen(false);
        }
    };

    useEffect(() => {
        if (oddsOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [oddsOpen]);
    const handleRoundModal = (item) => {
        setRoundModal(true)
        setRoundData(item)
    }
    return (
        <div style={{ position: "relative"}}>
            <div className="max-odds-container">
                <div className="max-odss-content"  style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
   
                    {
                        maxOdds?.length > 0 ? maxOdds?.map((el, i) => (
                           
                            <div className="max-odd" key={el.lobby_id}
                                style={{
                                    color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF",
                                    fontWeight: "700",
                                    opacity:i===0||i===1?1:""
                                }}
                                onClick={() => handleRoundModal(el)}
                            >
                                {el?.max_mult}x
                            </div>
                      
                        )) : null
                    }
                 
                </div>
                {
                    maxOdds?.length > 0 ? <div className="history-btn" ref={buttonRef} onClick={toggleMenu} aria-label="Toggle Menu">
                        {
                            oddsOpen ? <div className="round-icon-history"></div> : <div  className='round-icon-history-1' ></div>
                        }
                        {
                            oddsOpen ? <div  className='active-icon' ></div> : <div  className='round-icon-1' > </div>

                        }
                    </div> : null
                }
            </div>
            {
                oddsOpen ? <div ref={menuRef} className={`oddsOpenContainer ${oddsOpen ? "active-odds" : ""}`}>
                    <div className="round-header">
                        <p>ROUND HISTORY</p>
                    </div>
                    <div className="active-bg">
                        {
                            maxOdds?.length > 0 ? maxOdds?.map((el, i) => (
                                <div className="max-odd-1" key={i}
                                    style={{
                                        color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF",
                                        fontWeight: "700"
                                    }}
                                    onClick={() => handleRoundModal(el)}
                                //  style={{ color: el % 2 === 1 ? "#34B4FF" : el === max ? "#C017B4" : "#34B4FF" ,fontWeight:"600"}}
                                >
                                    {el?.max_mult}x
                                </div>
                            )) : null
                        }
                    </div>
                </div> : null
            }
            {
                roundModal && (<RoundModal roundData={roundData} setRoundModal={setRoundModal} />)
            }
        </div>
    )
}

export default RoundHistory