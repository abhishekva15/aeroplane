import React, { useEffect, useState } from 'react'
import { getRandomDummyBets } from '../../utility/helper';
import { icon } from '../../utility/icon';
import { getCaller } from '../../utility/api';
import PrevHandData from './PrevHandData';
import AllData from './AllData';
const AllBetList = ({ betData, setBetData, cashoutData, planeData }) => {
    const [prevHand, setPrevHand] = useState(false)
    const [prevHandsData, setPrevHandsData] = useState([])
    const [loading, setLoading] = useState(true);
    const [totalBetCount, setTotalBetCount] = useState(0);
    const parsedBetData = planeData?.length > 0 ? planeData.split(':') : null;
    const planeStatus = parsedBetData?.length > 0 ? parsedBetData[2] : 0;
    const [dummyBetData, setDummyBetData] = useState([]);
    const updateBetDataWithCashout = () => {
        const updatedBetData = betData?.length > 0 && betData?.map((bet) => {
            const matchingCashouts = cashoutData?.filter((cashout) => ((cashout?.bet_id === bet.bet_id) && (cashout?.user_id === bet?.bet_id?.split(":")[3])));
            if (matchingCashouts?.length > 0) {
                const lastCashout = matchingCashouts[matchingCashouts?.length - 1];
                return {
                    ...bet,
                    final_amount: lastCashout.final_amount,
                    max_mult: lastCashout.max_mult,
                    maxAutoCashout: lastCashout.maxAutoCashout,
                    plane_status: lastCashout.plane_status
                };
            }
            return bet;
        });

        setBetData(updatedBetData)

    };

    useEffect(() => {
        const storedDummyBets = localStorage.getItem('dummyBetData');
        if (storedDummyBets) {
            const { bets, count } = JSON.parse(storedDummyBets); // Parse stored bets and count
            setDummyBetData(bets?.slice(0, 50)); // Show only 30 bets
            setTotalBetCount(count); // Store the total count
        } else {
            const { bets, count } = getRandomDummyBets(); // Generate random number of bets and get count
            setDummyBetData(bets?.slice(0, 50)); // Display only 30 bets
            setTotalBetCount(count); // Store the total count
            localStorage.setItem('dummyBetData', JSON.stringify({ bets, count })); // Save both bets and count
        }
    }, []);

    useEffect(() => {
        if (planeStatus === '0') {
            const { bets, count } = getRandomDummyBets(); // Generate new random bets
            setDummyBetData(bets?.slice(0, 50)); // Display only 30 bets
            setTotalBetCount(count); // Store the total count
            localStorage.setItem('dummyBetData', JSON.stringify({ bets, count })); // Save both bets and count
        }
    }, [planeStatus]);



    React.useEffect(() => {
        if (cashoutData?.length > 0) {
            updateBetDataWithCashout();
        } else {
            setBetData(betData)
        }
    }, [cashoutData]);
    const handlePHV = async () => {
        setLoading(true)
        const res = await getCaller(`previousBet`)
        setPrevHandsData(res?.data);
        setLoading(false)
    }
    useEffect(() => {
        if (prevHand) {
            handlePHV()
        }
    }, [prevHand, setLoading]);

    const prevHandClick = () => {
        setPrevHand(!prevHand);
    };
    const combinedData = betData?.length > 0 ? [...betData, ...dummyBetData] : dummyBetData;
    const betDataLength = betData?.length || 0;
    const dummyBetDataLength = totalBetCount || 0;
    const totalLength = betDataLength + dummyBetDataLength;
    return (
        <div className="" style={{ position: "relative", marginTop: ".5rem" }} >
            <div className="all-bet-head">
                <div className="all-bet-length">
                    <p className='all-heading'>All BETS</p>
                    <p className='all-heading'>
                        {prevHand ? prevHandsData?.length : totalLength ? totalLength : 0}
                    </p>
                </div>
                {prevHand && prevHandsData && prevHandsData?.length > 0 ? (
                    <div
                        className="bet-mult"
                        style={{
                            color:
                                prevHandsData[prevHandsData?.length - 1]?.round_max_mult > 10
                                    ? "#C017B4"
                                    : prevHandsData[prevHandsData.length - 1]?.round_max_mult >= 2 &&
                                        prevHandsData[prevHandsData.length - 1]?.round_max_mult <= 10
                                        ? "#913EF8"
                                        : "#34B4FF",
                            background: "#00000080",
                        }}
                    >
                        {prevHandsData[prevHandsData?.length - 1]?.round_max_mult
                            ? `${prevHandsData[prevHandsData?.length - 1]?.round_max_mult}x`
                            : "N/A"}
                    </div>
                ) : null}

                <div className={`previoud-hand ${prevHand ? "active-prev" : ""}`} onClick={prevHandClick}>
                    {
                        prevHand ? <div><img src={icon.close} alt='' style={{ width: "12px", height: "12px" }} /></div> : <div className="history-icon">

                        </div>
                    }
                    <p style={{ fontWeight: "normal", fontSize: "12px", color: "#9ea0a3" }}> Previous hand</p>
                </div>
            </div>
            {
                prevHand && (
                    <PrevHandData loading={loading} prevHandsData={prevHandsData} />
                )
            }
            {
                prevHand === false ? <AllData combinedData={combinedData} /> : null
            }
        </div>
    )
}

export default AllBetList