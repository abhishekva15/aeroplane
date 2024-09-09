import React from 'react'

const AutoCashout = ({ autoBet, autoMultiplier, autoCash,
    setAutoMultiplier, planeStatus, setAutoBet, setAutoCash, handleCancelBet, betData,
    endDelay, nextRound, showCancel}) => {
        const handleAutoCashMultiplier = (event) => {
            let inputValue = event.target.value;
            const match = inputValue.match(/^\d{0,3}(\.\d{0,2})?/); // Adjust the maximum limit as per your requirement
            if (match) {
                inputValue = match[0];
                if (parseFloat(inputValue) > 100) {
                    inputValue = "100.00"; // Ensure the value does not exceed 100
                }
                setAutoMultiplier(inputValue);
            }
        };
    
        const handleAutoCashMultiplierBlur = (e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value) || value < 1.01) {
                setAutoMultiplier("1.01");
            } else if (value > 100) {
                setAutoMultiplier("100.00");
            } else {
                setAutoMultiplier(value.toFixed(2).toString());
            }
        };
    
    const autoCashToggle = (value) => {
        console.log(nextRound)
        if (value == "autoCash") setAutoCash(!autoCash);

    };
    const autoBetToggle = (value) => {
        setAutoBet(true);
        if (autoBet) {
            if ((planeStatus == 1 && betData?.length > 0)) {
                setAutoBet(false)
            } else {
                handleCancelBet();
            }
        }
    }
    const disbleAutoCash= autoBet || ((planeStatus == 1 && betData?.length > 0) && showCancel) || ((planeStatus ==0 && betData?.length > 0)&& showCancel) || (nextRound && planeStatus ==2) || (nextRound && planeStatus ==1) || (planeStatus ==0 && +endDelay >= 6)
    return (
        <div className="auto-container" style={{ borderTop: "1px solid black" }}>
            <div className="auto-bet-card">
                <p className='auto-para'>Auto Bet</p>
                <label className="switch">
                    <input type="checkbox"
                        className='slider-toggle'
                        style={{ outline: "none", color: (planeStatus == 1 && betData?.length > 0) || showCancel || nextRound || (planeStatus ==0 && +endDelay >= 6) ? "#9ea0a3" : "white" }}
                        checked={autoBet}
                        disabled={(planeStatus ==0 && +endDelay >= 6)}
                        onChange={autoBetToggle}
                    />
                    <span style={{ cursor: ((planeStatus ==0 && +endDelay >= 6)) ? "default" : "pointer" }} className="slider round"></span>
                </label>
            </div>
            <div className="auto-cashout-container">
                <p className='auto-para'>Auto Cash Out</p>
                <label className="switch">
                    <input type="checkbox" className='slider-toggle'
                        style={{
                            outline: "none",
                            color: disbleAutoCash ? "#9ea0a3" : "white",
                            opacity:disbleAutoCash?"0.5":""
                        }}
                        checked={autoCash}
                        disabled={disbleAutoCash}
                        
                        onChange={() =>
                            autoCashToggle("autoCash")
                        }
                    />
                    <span style={{ cursor: disbleAutoCash ? "default" : "pointer",opacity:disbleAutoCash?"0.5":"" }} className="slider round"></span>
                </label>
                <div className="auto-cash-input">
                    {/* <p className='x' style={{ color: autoCash ? "white" : "#9ea0a3" }}>x</p> */}
                    <input type="number" style={{ color: autoCash ? "white" : "#9ea0a3", fontWeight: "700" }}
                        name="" id="" value={autoMultiplier} onChange={(e) => handleAutoCashMultiplier(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                                e.preventDefault();
                            }
                        }}
                        onBlur={(e) => handleAutoCashMultiplierBlur(e)}
                        disabled={!autoCash || autoBet || (planeStatus ==1 && betData?.length && showCancel)|| ((planeStatus ==0 && betData?.length)&& showCancel)  || (nextRound && planeStatus ==1) || (nextRound && planeStatus ==2)}
                        className="input-value-2" />
                    <button type="button" aria-label="Close" className="x">
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AutoCashout