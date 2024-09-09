import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import { socket } from '../utility/newSocket'
import AllBetList from '../components/betListing/AllBetList'
import MyBetList from '../components/betListing/MyBetList'
import TopBetList from '../components/betListing/TopBetList'
import RoundHistory from '../components/header/RoundHistory'
import BetPlaceButton from '../components/betcontrol/BetPlaceButton'
import { useLocation } from 'react-router-dom'
import AviatorGame from '../aviatoranimation/Aviator'
import Loader from '../components/loader/Loader'
import SessionExpire from '../components/loader/SessionExpire'
import UserNot from '../components/loader/UserNot'
import useFontAndSettings from '../utility/useFontAndSettings'
import Footer from './Footer'
import { betButton } from '../utility/staticData'
import ChatBox from '../components/chat/ChatBox'
import ReadMore from '../components/modal/headerModal/ReadMore'
import ErrorModal from '../components/modal/betModal/ErrorModal'
import RollbackPopup from '../components/modal/betModal/RollbackPopup'

const Home = () => {
    const [activeBetData, setActiveBetData] = useState(0)
    const [planeData, setPlaneData] = useState({})
    const [betData, setBetData] = useState([])
    const [chatOpen, setChatOpen] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [logout, setLogout] = useState("")
    const [oddsOpen, setOddsOpen] = useState(false)
    const [cashoutData, setCashoutData] = useState([])
    const [maxOdds, setMaxOdds] = useState([])
    const [info, setInfo] = useState({})
    const [error, setError] = useState("")
    const [errorModal, setErrorModal] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false);
    const [numCards, setNumCards] = useState(2);
    const [loading, setLoading] = useState(true)
    const [rollback, setRollback] = useState("")
    const [rollbackModal, setRollbackModal] = useState(false)
    const [probOpen, setProbOpen] = useState(false)
    const location = useLocation();
    const [oneCashout, setOneCashout] = useState([])
    const rawQuery = location.search.substring(1);
    const decodedQuery = decodeURIComponent(rawQuery);

    let queryParams = {};
    try {
        queryParams = JSON.parse('{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function (key, value) { return key === "" ? value : decodeURIComponent(value) });
    } catch (e) {
        queryParams = {};
    }
    const fontName = 'Poppins';
    const { fontLoaded, settingsLoaded, settings } = useFontAndSettings(fontName);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768 || (window.innerWidth >= 1024 && window.innerWidth <= 1300)) {
                setChatOpen(false);
            } else {
                setChatOpen(true);
            }
        };
    
        handleResize(); // Ensure initial load respects the window size
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        const handleSocketEvents = () => {
            socket.on("connect", () => {
                setSocketConnected(true);
            });
            socket.on("disconnect", () => {
                setSocketConnected(false);
            });

            if (Object.keys(info)?.length === 0) {
                let userInfo = `PL:INFO:${queryParams?.id}:${queryParams.game_id}`;
                socket.emit("message", userInfo);
                socket.emit("message", "MXO")
                socket.emit("message", "PL:PLAYERS");
            }
            socket.on("info", (data) => {
                setInfo(data);
                setLoading(false);
            });
            socket.on("plane", (data) => {
                setPlaneData(data);
            });

            socket.on("maxOdds", (data) => {
                try {
                    setMaxOdds(data);
                } catch (err) {
                    console.error(err);
                }
            });
            socket.on("rollback", (data) => {
                setRollback(data);
                setRollbackModal(true);
            });
            socket.on("betError", (data) => {
                setError(data)
                setErrorModal(true)
            })
            socket.on("logout", (data) => {
                setLogout(data);
            });
            return () => {
                socket.off("betError");
                socket.off("rollback");
                if (socket && socket.connected) {
                    socket.off("disconnect");
                }
            };
        };
        handleSocketEvents();
    }, [queryParams?.id, error]);

    useEffect(() => {
        let timer;
        if (errorModal) {
            timer = setTimeout(() => {
                setErrorModal(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [errorModal]);

    const onBetPlace = (data) => {
        setBetData(data)

    }
    const onCashout = (data) => {
        setCashoutData(data)
    }
    const onSingleCashData = (data) => {
        setOneCashout(data)
    }
    // if socket not connected
    if (loading || !socketConnected || (!fontLoaded && !settings && !settingsLoaded)) {
        return <Loader message={"Connecting..."} />;
    }
    // if session expire  then show modal 
    if (logout) {
        return <SessionExpire socketConnected={socketConnected} logout={logout} />;
    }
    // if user not connected 
    if (Object.keys(info)?.length === 0 && !loading) {
        return <UserNot />
    }

    return (
        <>
            <div className="main-wrapper">
                <div className={`${chatOpen ? "main-header-width" : "main-container-width"}`}>
                    <div className="main-header">
                        <Header queryParams={queryParams} info={info} setInfo={setInfo} chatOpen={chatOpen} setChatOpen={setChatOpen} oddsOpen={oddsOpen} setOddsOpen={setOddsOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    </div>
                    <div className="info-container">
                        <div className={`all-info ${chatOpen ? "all-info-width" : ""}`}>
                            <div className={`left-info ${chatOpen ? "left-info-width" : ""}`}>
                                <div className="bets-block-sec">
                                    <div className='all-bet-block'>
                                        <div className="bet-blocks">
                                            <div className="bet-btn-card-top-1">
                                                <div className="bet-tab-content" style={{marginTop:"5px"}}>
                                                    <div
                                                        className="slider-tab"
                                                        style={{ transform: `translateX(${(300 / 3) * activeBetData}%)`, width: `${100 / 3}%` }}
                                                    ></div>
                                                    <div style={{ cursor: activeBetData === 0 ? "default" : "" }} className={`bet-tabs allbet ${activeBetData === 0 ? "active-bet-tabs" : ""}`} onClick={() => setActiveBetData(0)}>
                                                        All Bets
                                                    </div>
                                                    <div style={{ cursor: activeBetData === 1 ? "default" : "" }} className={`bet-tabs allbet ${activeBetData === 1 ? "active-bet-tabs" : ""}`} onClick={() => setActiveBetData(1)}>
                                                        My Bets
                                                    </div>
                                                    <div style={{ cursor: activeBetData === 2 ? "default" : "" }} className={`bet-tabs allbet ${activeBetData === 2 ? "active-bet-tabs" : ""}`} onClick={() => setActiveBetData(2)}>
                                                        Top
                                                    </div>

                                                </div>
                                            </div>
                                            {
                                                activeBetData === 0 && (<AllBetList
                                                    planeData={planeData}
                                                    betData={betData}
                                                    cashoutData={cashoutData}
                                                    info={info}
                                                    setBetData={setBetData}
                                                    onCashout={onCashout}
                                                    loading={loading}
                                                    setLoading={setLoading}
                                                    onBetPlace={onBetPlace}
                                                    setCashoutData={setCashoutData}

                                                />)
                                            }
                                            {
                                                activeBetData === 1 && (<MyBetList info={info}
                                                    oneCashout={oneCashout}
                                                />)
                                            }

                                            {
                                                activeBetData === 2 && (<TopBetList />)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <Footer setProbOpen={setProbOpen} />
                                </div>
                            </div>
                            <div className={`right-info ${chatOpen ? "right-info-width" : ""}`}>
                                <RoundHistory maxOdds={maxOdds} oddsOpen={oddsOpen} setOddsOpen={setOddsOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                                <div className="play-board-img">
                                    <AviatorGame planeData={planeData} betData={betData} setLoading={setLoading} chatOpen={chatOpen} />
                                </div>
                                <div className="bet-controls-sec">
                                    <div className={`bet-tab-container ${chatOpen ? "bet-tab-container-chat" : ""}`}>
                                        {
                                            betButton?.slice(0, numCards).map((el, i) => (
                                                <BetPlaceButton
                                                    planeData={planeData}
                                                    key={i}
                                                    index={i}
                                                    onSingleCashData={onSingleCashData}
                                                    chatOpen={chatOpen}
                                                    queryParams={queryParams}
                                                    betButton={betButton}
                                                    onBetPlace={onBetPlace}
                                                    numCards={numCards}
                                                    setNumCards={setNumCards}
                                                    onCashout={onCashout}
                                                    info={info}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    chatOpen && <div className='chat-width'>
                        <ChatBox chatOpen={chatOpen} setChatOpen={setChatOpen} info={info} />
                    </div>
                }
                {
                    errorModal && (
                        <ErrorModal error={error} setErrorModal={setErrorModal} />
                    )
                }
                {
                    rollbackModal && (
                        <RollbackPopup rollback={rollback} setRollbackModal={setRollbackModal} />
                    )
                }
            </div>
            {
                probOpen && (<ReadMore setProbOpen={setProbOpen} />)
            }
        </>
    )
}

export default Home