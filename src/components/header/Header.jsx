import React, { useEffect, useRef, useState } from "react";
import {
  playBgMusic,
  pauseBgMusic,
  playSound,
  pauseSound,
  setAnimationEnabled,
  setMuted,
} from "../../gameSettings";

import { socket } from "../../utility/newSocket";
import HowToPlay from "../modal/headerModal/HowToPlay";
import ProvablyFair from "../modal/headerModal/ProvablyFair";
import FreeBets from "../modal/headerModal/FreeBets";
import GameRule from "../modal/headerModal/GameRule";
import GameLimit from "../modal/headerModal/GameLimit";
import ChangeAvator from "../modal/headerModal/ChangeAvator";
import BetHistroy from "../modal/headerModal/BetHistroy";
import MenuDropDown from "./MenuDropDown";
import { icon } from "../../utility/icon";
import { formatBalance } from "../../utility/helper";
const Header = ({
  info,
  menuOpen,
  setMenuOpen,
  setOddsOpen,
  chatOpen,
  setInfo,
  setChatOpen,
}) => {
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);
  const [animation, setAnimation] = useState(true);
  const [freeBet, setFreeBet] = useState(false);
  const [fair, setFair] = useState(false);
  const [gameRule, setGameRule] = useState(false);
  const [betHistroy, setBetHistroy] = useState(false);
  const [gameLimit, setGameLimit] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [changeAvator, setChangeAvator] = useState(false);
  const toggleValue = (value) => {
    if (value === "music") setMusic(!music);
    else if (value === "sound") setSound(!sound);
    else if (value === "animation") setAnimation(!animation);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
    setOddsOpen(false);
    // setChatOpen(false)
  };
  const toggleChat = (e) => {
    setChatOpen(true);
  };
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (music) {
      playBgMusic();
    }
    if (!music) {
      pauseBgMusic();
    }
  }, [music]);

  useEffect(() => {
    if (sound) {
      playSound();
    }
    if (!sound) {
      pauseSound();
    }
  }, [sound]);

  useEffect(() => {
    setAnimationEnabled(animation);
  }, [animation]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setMuted(true);
    });

    socket.on("connect", () => {
      setMuted(false);
    });
  }, [music, sound]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setMuted(true);
      } else {
        setMuted(false);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [music, sound]);
  const handleHowModal = () => {
    setHowOpen(true);
    setMenuOpen(false);
    setOddsOpen(false);
  };
  const handleChangeAvModal = () => {
    setChangeAvator(true);
    setMenuOpen(false);
  };
  const handlefreeModal = () => {
    setFreeBet(true);
    setMenuOpen(false);
  };
  const handleProbFairModal = () => {
    setFair(true);
    setMenuOpen(false);
  };
  const handleGameRuleModal = () => {
    setGameRule(true);
    setMenuOpen(false);
  };
  const handleGameLimitModal = () => {
    setGameLimit(true);
    setMenuOpen(false);
  };
  const handleBetModal = () => {
    setBetHistroy(true);
    setMenuOpen(false);

  };
  return (
    <>
        <div>
          <div className="header-sec">
            <div className="header-left-sec">
              <div className="logo-img">
                <img src={icon.aviatorLogo} alt="aviator-logo" />
              </div>
              <div className="responsive-ques" onClick={handleHowModal}>
                <img src={icon.qresLogo} alt="" />
              </div>
              <div className="question-sec" onClick={handleHowModal}>
                <img src={icon.qlogo} alt="" />
                <p> How to play?</p>
              </div>
            </div>
            <div
              className={`header-right-sec`}>
              <div className="amount-sec header-right-item aviator-heading">
                <h2>{formatBalance(info?.balance)?formatBalance(info?.balance):"00.00"}</h2>
              </div>
              <div
                className="menu-sec header-right-item dropdown"
                style={{ position: "relative" }}
              >
                <button
                  type="button"
                  className="header-btn"
                  onClick={toggleMenu}
                  ref={buttonRef}
                  aria-label="Toggle Menu"
                >
                  <img src={icon.menuIcon} alt="" />
                </button>
                <button className="header-btn chat-icon" onClick={toggleChat} style={{display:chatOpen?"none":""}}>
                  <img src={icon.chatIcon} alt="" />
                </button>
                {changeAvator && (
                  <ChangeAvator
                    setChangeAvator={setChangeAvator}
                    info={info}
                    setInfo={setInfo}
                  />
                )}
                {menuOpen && (
                  <MenuDropDown
                    handleBetModal={handleBetModal}
                    handleChangeAvModal={handleChangeAvModal}
                    handleGameLimitModal={handleGameLimitModal}
                    handleGameRuleModal={handleGameRuleModal}
                    handleProbFairModal={handleProbFairModal}
                    handlefreeModal={handlefreeModal}
                    toggleValue={toggleValue}
                    sound={sound}
                    chatOpen={chatOpen}
                    music={music}
                    animation={animation}
                    menuRef={menuRef}
                    info={info}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      {howOpen && <HowToPlay setHowOpen={setHowOpen} howOpen={howOpen} />}
      {freeBet && <FreeBets setFreeBet={setFreeBet} />}
      {fair && <ProvablyFair setFair={setFair} />}
      {gameRule && <GameRule setGameRule={setGameRule} />}
      {betHistroy && (
        <BetHistroy
          info={info}
          setBetHistroy={setBetHistroy}
          betHistroy={betHistroy}
        />
      )}
      {gameLimit && <GameLimit setGameLimit={setGameLimit} />}
    </>
  );
};
export default Header;
