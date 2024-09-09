import React, { useState } from 'react'
import { CiCircleQuestion } from "react-icons/ci";
import { IoMdRadioButtonOn } from "react-icons/io";
import '../modal.css'
import ReadMore from './ReadMore';
import { icon } from '../../../utility/icon';

const ProvablyFair = ({setFair}) => {
    const [probOpen,setProbOpen] = useState(false)
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setFair(false)
        }
    };
    return (
        <div className="overlay" onClick={handleOverlayClick}>
                    <div className="header-modal-content-provably">
                        <div className="header-modal-head">
                            <h2>PROVABLY FAIR SETTINGS</h2>
                            <button onClick={() => setFair(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>

                        </div>
        <div className=''>
            <div className='provably-section'>
                <div className='provably-para' style={{cursor:"pointer"}}>
                    <p className='prob-common-para'>This game uses Provably Fair technology to determine game result. This tool gives you ability to change your seed and check fairness of the game.</p>
                </div>
                <div className='Question-section' onClick={()=>setProbOpen(true)}>
                    <CiCircleQuestion className='icon-color' style={{color:"#e30c32"}}/>
                    <p className='prob-common-para' style={{color:"#e30c32"}}> What is Provably Fair </p>
                </div>
                {
                    probOpen && (<ReadMore setProbOpen={setProbOpen}/>)
                }
            </div>
            <div className='laptop-section'>
                <img src={icon.client} alt="" />
                <p className='prob-common-para' style={{color:"white"}}>Client (your) seed:</p>
            </div>

            <div className='laptop-container'>
                <div className='round-para'>
                    <p className='prob-common-para' style={{color:"#9b9c9e"}}>Round result is determined form combination of server seed and first 3 bets of the round.</p>
                </div>
                <div className='current-section'>
                    <div className='random-section' >
                        <h2><IoMdRadioButtonOn /></h2>
                        <p className='prob-common-para' >Random on every new game</p>
                    </div>
                    <div className='current-page'>
                        <div className='pass-page' >
                            <p className='prob-common-para'>Current : <span style={{color:"white"}}>Vinay</span></p>
                            <img src={icon.copyIcon} alt='' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='laptop-container'>
                <div className='current-section'>
                    <div className='random-section' >
                        <h2><IoMdRadioButtonOn /></h2>
                        <p className='prob-common-para'>Enter manually</p>
                    </div>
                    <div className='down-section'>
                        <div className='current-page-down'>
                            <div className='pass-page-down' >
                            <p className='prob-common-para'>Current : <span style={{color:"white"}}>Vinay</span></p>
                                <img src={icon.copyIcon} alt='' />
                            </div>
                        </div>
                        <div className='Change-section'>
                            <button type='button'>CHANGE</button>
                        </div>
                    </div>

                </div>
            </div>
          
            <div className='laptop-section' style={{borderTop:"1px solid rgba(255, 255, 255, .1)",marginTop:"1rem"}}>
          <img src={icon.server} alt="" />
                <p className='prob-common-para' style={{color:"white"}}>Server seed SHA256:</p>
            </div>
            <div className='key-container'>
                <div className='key-section'>
                    <button type='button'>
                    4b88fa7e8260b958634ef7107059deb531791529b9a066d6fddc5b2151ed7110
                    </button>
                </div>
            </div>

            <div className='check-section'>
                <p className='prob-common-para'>You can check fairness of each bet from bets history</p>
            </div>
        </div>
        </div>

</div>

    )
}

export default ProvablyFair