import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../modal.css'
import GameRule from './GameRule'
import { icon } from '../../../utility/icon'
const HowToPlay = ({ setHowOpen,howOpen }) => {
    const [gameRuleOpen, setGameRuleOpen] = useState(false)

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          setHowOpen(false) 
        }
      };
      useEffect(() => {
        if (howOpen) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
    
        // Cleanup function to remove the class when the component unmounts
        return () => {
          document.body.classList.remove('no-scroll');
        };
      }, [howOpen]);
    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="header-modal-content-how" >
                <div className="header-modal-head" style={{ background: "#e69308" }} onClick={(e) => e.stopPropagation()}>
                    <h2 style={{ color: "#965419" }}>HOW TO PLAY?</h2>
                   
                    <button onClick={() => setHowOpen(false)} type="button" aria-label="Close" style={{ color: "#5f3816" }} className="icon-close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="">
                    <div className='how-to-play-container'>
                        <div className='video-section'>
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/PZejs3XDCSY?si=SEiAp8XAYTiMUpNG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                        </div>
                        <div className="how-to-play-card">
                            <div className="how-to-play-card-body">
                                <div className="how-to-play-card-content">
                                    <h1>01</h1>
                                    <div className="how-to-img">
                                        <img src={icon.betimg1} alt="" />
                                    </div>
                                </div>
                               <div className="">
                               <p className='prob-common-para' style={{ color: "#5f3816" }}>Make a bet, or even two at same time and wait for the round to start.</p>
                               </div>
                            </div>
                            <div className="how-to-play-card-body">
                                <div className="how-to-play-card-content">
                                    <h1>02</h1>
                                    <div className="how-to-img">
                                        <img src={icon.betimg2} alt="" />
                                    </div>
                                </div>
                                <p className='prob-common-para' style={{ color: "#5f3816" }}>Look after the lucky plane. Your win is bet multiplied by a coefficient of lucky plane.</p>
                            </div>
                            <div className="how-to-play-card-body">
                                <div className="how-to-play-card-content">
                                    <h1>03</h1>
                                    <div className="how-to-img">
                                        <img src={icon.betimg3} alt="" />
                                    </div>
                                </div>
                                <p className='prob-common-para' style={{ color: "#5f3816" }}>Cash Out before plane flies away and money is yours!</p>
                            </div>
                        </div>
                    </div>
                    <div className="how-to-play-footer">
                        <Link className='detail' onClick={() => setGameRuleOpen(true)}>detailed rules</Link>
                    </div>
                    {
                        gameRuleOpen && (<GameRule setGameRule={setGameRuleOpen} />)
                    }
                </div>
            </div>

        </div>
    )
}

export default HowToPlay