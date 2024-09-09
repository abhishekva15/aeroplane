import React from 'react'
import '../modal.css'
import { icon } from '../../../utility/icon';
const ReadMore = ({setProbOpen}) => {
    // click outside function 
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setProbOpen(false)
        }
    };
    return (
     
        <div className="overlay" onClick={handleOverlayClick}>
                    <div className="header-modal-content-readMore">
                        <div className="header-modal-head">
                            <h2> What is Provably Fair? </h2>
                            <button onClick={() => setProbOpen(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>

                        </div>
            <div className='readMore-container'>
                <div className='readMore-section'>
              <div className="read-more-img">
              <img src={icon.iconRight} alt='' />
                    <p>Provably Fair - 100% FAIR GAME</p>
              </div>
                </div>

                <div className='crypto-section'>
                    <div className='crypto'>
                        <p>"Aviator" is based on cryptographic technology called "Provably Fair". This technology guarantees 100% fairness of game result. With this technology, it's impossible for any third party to interfere in game process.</p>
                    </div>
                </div>


                <div className='work'>
                    <h3>HOW IT WORKS</h3>
                </div>

                <div className='quick-container'>
                    <div className='quick-section'>
                        <h2>Quick explanation:</h2>
                        <p> Result of each round (Game's "Fly away" multiplier ) is not generated on our servers. It's generated with help of round players and is fully transparent. This way, it's impossible for anyone to manipulate game output. Also, anyone can check and confirm game fairness </p>
                    </div>
                </div>

                <div className='quick-container'>
                    <div className='quick-section'>
                        <h2>More information:</h2>
                        <p> Round result is generated from four independent participants of the round: game operator and first 3 betters of the round. Operator is generating server seed (random 16 symbols). Hashed version of this server seed is available publicly before round starts (In user menu, check "Provably Fair Settings" and then "Next server seed SHA256") Client seed is generated on the side of each player and when round starts first 3 betters are participating in generating round result.  </p>
                        <p> When round starts, game merges server seed with three client seeds. From merged symbols is generated SHA512 hash, and from this hash - game result. </p>
                    </div>
                </div>


                <div className='fullImage'>
                    <img src={icon.fullImage} alt='' />
                    <h3>HOW TO CHECK</h3>

                </div>

                <div className='fairness'>
                    <p>- You can check fairness of each round from game history, by clicking on green icon.</p>
                    <p>- In opened window, you will see server seed, 3 pair of players seeds, combined hash and round result.</p>
                    <p> - Hashed version of next rounds server seed is available publicly in settings window (In user menu, check "Provably Fair Settings" and then "Next server seed SHA256"). You can also change your client seed here. </p>
                    <p>- If you want to participate in round result generation, make sure you are between first 3 players who make bet in that round.</p>
                </div>
            </div>
            </div>

</div>
   
    )
}

export default ReadMore