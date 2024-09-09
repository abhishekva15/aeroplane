import React, { useEffect, useState } from 'react'
import { socket } from '../../utility/newSocket';
import CashoutModal from '../modal/betModal/CashoutModal';
import { playBetSound, playCashoutSound } from '../../gameSettings';
import NotEnoughModal from '../modal/betModal/NotEnoughModal';
import AutoCashout from './AutoCashout';
import InputContainer from './InputContainer';
import TabSlider from './TabSlider';
import BetButton from './BetButton';
import StageTimeOut from '../modal/betModal/StageTimeOut';
const BetPlaceButton = ({ info, index, planeData, onSingleCashData, onBetPlace, onCashout, queryParams, numCards, setNumCards, }) => {
    const [activeBet, setActiveBet] = useState(0)
    const [autoCash, setAutoCash] = useState(false);
    const [showCancel, setShowCancel] = useState(false)
    const [autoMultiplier, setAutoMultiplier] = useState("1.10")
    const parsedBetData = planeData?.length > 0 ? planeData.split(':') : null;
    const planeStatus = parsedBetData?.length > 0 ? parsedBetData[2] : 0;
    const endDelay = parsedBetData?.length > 0 ? parsedBetData[1] : 0;
    const [amount, setAmount] = useState("20.00");
    const [openModal, setOpenModal] = useState([])
    const [nextRound, setNextRound] = useState(false);
    const [betData, setBetData] = useState([])
    const [cashoutData, setCashoutData] = useState([])
    const [oneCashout, setOneCashout] = useState([])
    const [stageModal, setStageModal] = useState(false)
    const planeMutiplier = parsedBetData?.length > 0 ? parsedBetData[1] : 0;
    const [showBalance, setShowBalace] = useState(false)
    const [autoBet, setAutoBet] = useState(false)
    const [messageEmitted, setMessageEmitted] = useState(false);
    const [messageEmittedBet, setMessageEmittedBet] = useState(false);
    const disableButton = (planeStatus == 1 && betData?.length && showCancel) || nextRound || (planeStatus == 2 && nextRound) || ((planeStatus == 0 && betData?.length > 0) && showCancel)
    const opacityDisable = (planeStatus == 0 && +endDelay >= 6)
    // effect functions
    useEffect(() => {
        if (autoBet) {
            if (planeStatus == 0) {
                handlePlaceBet(index);
                setNextRound(false);
            }
            // handleNextClick(index)
            if ((planeStatus == 1 && !betData?.length) || (planeStatus == 1 && betData?.length && !showCancel) || (planeStatus == 2) || (cashoutData[0]?.plane_status === "cashout")) {
                handleNextClick(index);
            }
        } else if (planeStatus == 0 && nextRound) {
            handlePlaceBet(index);
            setNextRound(false);
        }

    }, [planeStatus, autoBet, cashoutData, showCancel, betData]);
    useEffect(() => {
        if (((planeStatus == 1 && betData?.length && showCancel) && (parseFloat(planeMutiplier) >= parseFloat(autoMultiplier)) && autoCash)) {
            handleCashout(index);
        }
    }, [planeMutiplier, autoCash, planeStatus, autoMultiplier, betData, showCancel])

    useEffect(() => {
        // plane status 2 then reset bet and cashout 
        if (planeStatus == 2) {
            const timer = setTimeout(() => {
                setBetData([]);
                setCashoutData([]);
                setOneCashout([])
                onSingleCashData([])
                setOpenModal([]);
                setShowCancel(false);
                onBetPlace([]);
                onCashout([]);
                setMessageEmitted(false);
                setMessageEmittedBet(false);
            }, 5000);
            return (() => {
                socket.off("bet")
                socket.off("cashout")
                socket.off("singleCashout")
                clearTimeout(timer)
            });
        }
    }, [planeStatus]);



    useEffect(() => {
        const handleBet = (data) => {
            try {
                setBetData(data);
                onBetPlace(data);
            } catch (err) {
                console.error(err);
            }
        };
        // Listen for "bet" event
        socket.on("bet", handleBet);
        // Cleanup on component unmount

    }, [onBetPlace, betData]);

    const handlePlaceBet = () => {
        if (messageEmittedBet) return;
        const endDelayNumber = Number(endDelay);
        if (planeStatus === '0' && (endDelayNumber >= 6 && endDelayNumber <= 7)) {
            return setStageModal(true);
        }
        if ((planeStatus == 0 && (+amount > info.balance)) || (+amount === 0)) {
            return setShowBalace(true);
        }
        setShowCancel(true);
        // Emit the bet message
        const autoValue = autoCash ? autoMultiplier : null;
        socket.emit('message', `BT:PB:${planeData}:${info.id}:${info.operator_id}:${queryParams.id}:${queryParams.game_id}:${autoValue}:${amount}:${index}`);
        playBetSound();
        setMessageEmittedBet(true);
    };

    const handleNextClick = (clickedIndex) => {
        if ( (+amount > info.balance) || (+amount === 0)) {
            return setShowBalace(true);
        }
        planeData.split(" : ")
        let a = planeData?.split(":")
        a.pop()
        a.push('0')
        let b = a.join(":")
        setNextRound(true);
    }
    useEffect(() => {
        const handleCashoutData = (data) => {
            try {
                setCashoutData(data);
                onCashout(data);
            } catch (err) {
                console.error("Cashout data parsing error:", err);
            }
        };
        if (socket.listeners("cashout").length == 0) {
            socket.on("cashout", handleCashoutData);
        }
    }, [onCashout, cashoutData])

    const handleCashout = (clickedIndex) => {
        if (messageEmitted) return;
        setShowCancel(false);
        setMessageEmitted(false);
        setMessageEmittedBet(false);
        const bet = betData.find(x => {
            const betIdParts = x.bet_id.split(":");
            const betIndex = betIdParts[5];
            return index == betIndex && info.id === x?.bet_id?.split(":")[3];
        });
        if (bet) {
            let autoValue = parseFloat(autoMultiplier) > parseFloat(planeMutiplier) ? null : autoMultiplier;
            let newValue = autoCash ? autoValue : null
            socket.emit('message', `BT:CO:${planeMutiplier}:${planeStatus}:${newValue}:${bet.bet_id}`);
            setMessageEmitted(true); // Set messageEmitted to true
            const handleSingleCashout = (data) => {
                try {
                    setOneCashout(data);
                    onSingleCashData(data)
                    setOpenModal(prev => [...prev, { bet_id: bet.bet_id, show: true }]);
                    if (data) {
                        playCashoutSound();
                    }
                } catch (err) {
                    console.error("Single cashout data parsing error:", err);
                }
            };
            if (socket.listeners("singleCashout").length == 0) {
                socket.on("singleCashout", handleSingleCashout);
            } else {
                console.log("singleCashout");
            }
        }
        setNextRound(false);
        setCashoutData("");
        onCashout("")
        setOneCashout("")
        if (autoBet && clickedIndex == index) {
            handleNextClick(index);
        }
    };

    // cancel bet function 
    const handleCancelBet = () => {
        setShowCancel(false);
        setAutoBet(false);
        setMessageEmitted(false)
        setMessageEmittedBet(false);
        setNextRound(false);
        betData?.length > 0 && betData?.forEach(x => {
            if (index == x?.bet_id?.split(":")[5] && info.id === x?.bet_id?.split(":")[3]) {
                socket.emit('message', `BT:CB:${planeStatus}:${x.bet_id}`);
                setBetData([]);
                onBetPlace("");
                return;
            }
        });
    };

    const amountMultiplier = amount * planeMutiplier
    return (
        <>
            <div className={`bet-btn-card`} style={{
                margin: numCards === 1 ? "0 auto" : "",
                opacity: opacityDisable ? "0.5" : ""
            }}>
                {/* bet and auto bet tab  */}
                <div className="bet-btn-column" style={{
                    border: ((planeStatus == 0 && showCancel) || (planeStatus == 1 && nextRound && !betData?.length) || (planeStatus == 2 && nextRound) || (planeStatus == 1 && betData?.length && nextRound && !showCancel)) ? "1px solid red" :
                        (planeStatus == 1 && betData?.length && showCancel) ? "1px solid #d07206" : "",
                }}>
                    <TabSlider autoBet={autoBet} autoCash={autoCash} index={index}
                        activeBet={activeBet} setActiveBet={setActiveBet} numCards={numCards}
                        setNumCards={setNumCards} setShowCancel={setShowCancel}
                        disableButton={disableButton}
                        opacityDisable={opacityDisable}
                    />
                    {/* bet button  module  */}
                    {
                        activeBet === 0 && (<>
                            <div className={`bet-btn-container ${numCards === 1 ? "bet-padding" : ""} ${activeBet == 0 ? "bet-margin" : ""}`}  >
                                {/* input and chip button  */}
                                <InputContainer
                                    disableButton={disableButton}
                                    amount={amount}
                                    setAmount={setAmount}
                                    index={index}
                                    info={info}
                                />
                                {/* bet button cancel button next round button and cashout button */}
                                <BetButton
                                    planeStatus={planeStatus} showCancel={showCancel} endDelay={endDelay}
                                    handlePlaceBet={handlePlaceBet} handleCashout={handleCashout}
                                    nextRound={nextRound} betData={betData} amount={amount} amountMultiplier={amountMultiplier}
                                    index={index} handleNextClick={handleNextClick} handleCancelBet={handleCancelBet}
                                    cashoutData={cashoutData}

                                />
                            </div>
                        </>)
                    }
                    {
                        activeBet === 1 && (<>
                            <div className="bet-btn-container" style={{ marginTop: activeBet == 0 ? "0rem" : "", paddingBottom: activeBet === 1 ? 0 : "" }} >
                                {/* input and chip button */}
                                <InputContainer
                                    disableButton={disableButton}
                                    amount={amount}
                                    setAmount={setAmount}
                                    index={index}
                                    info={info}
                                    cashoutData={cashoutData}
                                />
                                {/* bet button cancel button next round button and cashout button */}
                                <BetButton
                                    planeStatus={planeStatus} showCancel={showCancel} endDelay={endDelay}
                                    handlePlaceBet={handlePlaceBet} handleCashout={handleCashout}
                                    nextRound={nextRound} betData={betData} amount={amount} amountMultiplier={amountMultiplier}
                                    index={index} handleNextClick={handleNextClick} handleCancelBet={handleCancelBet}
                                    autoCash={autoCash}
                                    cashoutData={cashoutData}
                                />
                            </div>
                            <div className="border-auto"></div>
                            <AutoCashout
                                autoBet={autoBet}
                                autoCash={autoCash}
                                planeStatus={planeStatus}
                                betData={betData}
                                autoMultiplier={autoMultiplier}
                                setAutoBet={setAutoBet}
                                setAutoCash={setAutoCash}
                                setAutoMultiplier={setAutoMultiplier}
                                handleCancelBet={handleCancelBet}
                                disableButton={disableButton}
                                nextRound={nextRound}
                                endDelay={endDelay}
                                info={info}
                                amount={amount}
                                showCancel={showCancel}
                            />
                        </>)
                    }
                </div>
            </div>
            {/* cashout modal  */}
            <CashoutModal oneCashout={oneCashout} openModal={openModal} setOneCashout={setOneCashout} setOpenModal={setOpenModal} />
            {showBalance && (
                <NotEnoughModal amount={amount} setShowBalace={setShowBalace} showBalance={showBalance} />
            )}
            {
                stageModal && (<StageTimeOut stageModal={stageModal} setStageModal={setStageModal} />)
            }
        </>
    )
}
export default BetPlaceButton