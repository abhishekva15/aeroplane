import React, { useState } from 'react'
import '../modal.css'
import ReadMore from './ReadMore'
import { autoPlay, freeBet, gameMenu, liveBet, other, rainFeature, returnToPlayer, sections } from '../../../utility/gameRuleData'
import { icon } from '../../../utility/icon'

const GameRule = ({ setGameRule }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setGameRule(false)
        }
    };
    const [probOpen, setProbOpen] = useState(false)
    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="header-modal-content-game">
                <div className="header-modal-head">
                    <h2>GAME RULES</h2>
                    <button onClick={() => setGameRule(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
                </div>
                <div className='game-container'>
                    <div className='game-para'>
                        <p className='prob-common-para' style={{ color: "#d2d2d2", lineHeight: "1.5rem",cursor:"default" }}>Aviator is a new generation of iGaming entertainment. You can win many times more, in seconds! Aviator is built on a provably fair system, which is currently the only real guarantee of honesty in the gambling industry.</p>
                        <p onClick={() => setProbOpen(true)} className='text-decoration'>Read more about provably fair system</p>
                    </div>
                    {
                        probOpen && (<ReadMore setProbOpen={setProbOpen} />)
                    }
                    <div className='youtube-container'>
                        <div className='play-section'>
                            <h2>HOW TO PLAY</h2>
                        </div>
                        <div className='video-section'>
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/PZejs3XDCSY?si=SEiAp8XAYTiMUpNG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>

                    </div>
                    <div className='easy-section'>
                        <p>Aviator is easy to play as 1-2-3:</p>
                    </div>
                    <div className='rule-container'>
                        <div className='rules'>
                            <div className='rule-section'>
                                <h1>01</h1>
                                <img src={icon.rule01} alt='' />
                            </div>
                            <div className='book-icon-section' style={{ alignItems: "center" }}>
                                <img src={icon.bookIcon} alt='' />
                                <p className='prob-common-para' style={{ color: "white" }}><span style={{ color: "red" }}>BET</span> before take-off </p>
                            </div>
                        </div>

                        <div className='rules'>
                            <div className='rule-section'>
                                <h1>02</h1>
                                <img src={icon.rule02} alt='' />
                            </div>
                            <div className='book-icon-section'>
                                <img src={icon.bookIcon} alt='' />
                                <p className='prob-common-para' style={{ color: "white" }}><span style={{ color: "red" }}>WATCH</span> as your Lucky Plane takes off and your winnings increase.  </p>
                            </div>
                        </div>

                        <div className='rules'>
                            <div className='rule-section'>
                                <h1>03</h1>
                                <img src={icon.rule03} alt='' />
                            </div>
                            <div className='book-icon-section'>
                                <img src={icon.bookIcon} alt='' />
                                <p className='prob-common-para' style={{ color: "white" }}><span style={{ color: "red" }}>CASH OUT</span> before the plane disappears and wins X times more!  </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-gap">
                        <div className='remember'>
                            <p className='prob-common-para' style={{ color: "#d2d2d2" }}> But remember, if you did not have time to Cash Out before the Lucky Plane flies away, your bet will be lost. Aviator is pure excitement! Risk and win. It’s all in your hands! </p>
                        </div>

                        <div className='more-detail-section'>
                            <p className='prob-common-para' style={{ color: "#ffffff" }}>More details</p>
                            <div className='win-section'>
                                <img src={icon.arrowIcon} alt="" />

                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}> The win multiplier starts at 1x and grows more and more as the Lucky Plane takes off.</p>
                            </div>

                            <div className='win-section'>
                                <img src={icon.arrowIcon} alt="" />
                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}> Your winnings are calculated at the multiplier at which you made a Cash Out, multiplied by your bet.</p>

                            </div>


                            <div className='win-section'>
                                <img src={icon.arrowIcon} alt="" />
                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}> Before the start of each round, our provably fair random number generator generates the multiplier at which the Lucky Plane will fly away. You can check the honesty of this generation by clicking on <img src={icon.iconRight} alt="" style={{ height: "16px" }} /> icon, opposite the result, in the History tab</p>

                            </div>

                        </div>

                        <div>
                            {sections.map((section, index) => (
                                <div key={index} className="more-detail-section">
                                    <p className='prob-common-para' style={{ fontSize: "16px", color: "#ffffff" }}>{section.title}</p>
                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff", marginTop: "1rem" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {autoPlay?.map((section, index) => (
                                <div key={index} className="more-detail-section">
                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {liveBet?.map((section, index) => (
                                <div key={index} className="more-detail-section">

                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {freeBet.map((section, index) => (
                                <div key={index} className="more-detail-section">

                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {rainFeature?.map((section, index) => (
                                <div key={index} className="more-detail-section">

                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='more-detail-section'>
                            <p className='prob-common-para' style={{ color: "#ffffff" }}>Randomisation</p>
                            <div className='win-section'>
                                <img src={icon.arrowIcon} alt="" />

                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}> The multiplier for each round is generated by a “Provably Fair” algorithm and is completely transparent, and 100% fair. <span className='text-decoration' onClick={() => setProbOpen(true)}>Read more about provably fair system</span>  </p>
                            </div>

                            <div className='win-section'>
                                <img src={icon.arrowIcon} alt="" />
                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}> You can check and modify the Provably Fair settings from the Game menu {'>'} Provably Fair settings. </p>
                            </div>


                            <div className='win-section'>
                                <img src={icon.arrowIcon} alt="" />
                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}> You can check the fairness of each round by pressing <img src={icon.iconRight} alt="" style={{ height: "16px" }} /> icon, opposite the results in the “My Bets” or inside “Top” tabs. </p>
                            </div>

                        </div>

                        <div>
                            {returnToPlayer.map((section, index) => (
                                <div key={index} className="more-detail-section">

                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section?.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {gameMenu?.map((section, index) => (
                                <div key={index} className="more-detail-section">

                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {other.map((section, index) => (
                                <div key={index} className="more-detail-section">

                                    {Array.isArray(section.content) ? (
                                        section.content.map((paragraph, idx) => (
                                            <div key={idx} className="win-section">
                                                <img src={icon.arrowIcon} alt="" />
                                                <p className='prob-common-para' style={{ color: "#d2d2d2" }}>{paragraph}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='prob-common-para' style={{ color: "#ffffff" }}>{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GameRule