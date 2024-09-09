import React, { useRef, useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import { Stage, Container } from "@pixi/react";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

import "./Aviator.css";

import RotatingSun from "./components/RotatingSun";
import RotatingProp from "./components/RotatingProp";
import ReducingProgressBar from "./components/ReducingProgressBar";
import FlyingPlane from "./components/FlyingPlane";
import BlurBg from "./components/Blurbg";
import {
  HorizontalLineCreation,
  VerticalLineCreation,
} from "./components/Axis";
import AnimateQuadraticCurve from "./components/QuadraticCurve";
import MultiplierText from "./components/MultiplierText";

import { socket } from "../utility/newSocket";

import {
  playFlewawaySound,
  playReadyTakeOffSound,
  isAnimationEnabled,
} from "../gameSettings";

import WaitingText from "./components/WaitingText";

// import { values } from "./animeSettings";
import FlewAwayText from "./components/FlewAwayText";
// import QuadCurve from "./components/QuadCurve";
// Registring GSAP Pixi plugin
gsap.registerPlugin(PixiPlugin);

const AviatorGame = ({ betData, planeData, setLoading, chatOpen }) => {
  // Handling canvas responsiveness with maintaing aspect ratio
  const myDivRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // 0 -> wait, 1 -> prep, 2 -> start, 3 -> end
  const [gameStatus, setGameStatus] = useState(null);
  const [durationInSeconds, setDurationInSeconds] = useState(5);
  const [counter, setCounter] = useState(1.0);
  const parsedBetData = planeData?.length > 0 ? planeData.split(":") : null;
  const endDelay = parsedBetData?.length > 0 ? parsedBetData[1] : 0;
  const [childData, setChildData] = useState(null);
  const [isWaitShow, setIsWaitShow] = useState(true);

  const receiveDataFromChild = (data) => {
    setChildData(data);
  };

  useEffect(() => {
    if (+endDelay > 5 && isWaitShow) {
      setIsWaitShow(false);
    }
  }, [endDelay]);
  const currentWindowWidth = window.innerWidth;
  /** AnimeSettings */

  const [screenSize, setScreenSize] = useState(
    currentWindowWidth <= 325
      ? "xsm"
      : currentWindowWidth < 375
      ? "sm"
      : currentWindowWidth < 425
      ? "sm"
      : currentWindowWidth < 568
      ? "md"
      : "lg"
  );

  socket.on("plane", (data) => {
    //Received data 1713166276068:2.68:1
    // lobbyId:Multiplier:GameStatus
    // [0,1,2]
    const lobbyIdMultiplierGameStatus = data.split(":");

    if (lobbyIdMultiplierGameStatus[2] == 0) {
      /**Game Start */
      setGameStatus(0);
    } else if (lobbyIdMultiplierGameStatus[2] == 1) {
      /**Game Run */
      setCounter(lobbyIdMultiplierGameStatus[1]);
      setGameStatus(2);
    } else if (lobbyIdMultiplierGameStatus[2] == 2) {
      /**Game End */
      setCounter(lobbyIdMultiplierGameStatus[1]);
      setGameStatus(3);
    }
  });

  useEffect(() => {
    if (gameStatus == 2) {
      playReadyTakeOffSound();
    }
    if (gameStatus == 3) {
      playFlewawaySound();
      setIsWaitShow(true);
    }
  }, [gameStatus]);

  // Use useEffect to log the width and height after the component has rendered

  /**
   * Responsiveness of canvas is handled here and Methods  -- Start
   */

  useEffect(() => {
    // Access the DOM element using the ref
    const myDiv = myDivRef.current;
    // Checking if the ref is defined (component may not be mounted yet)
    if (myDiv) {
      const divWidth = myDiv.offsetWidth;
      const divHeight = myDiv.offsetHeight;
      setWidth(divWidth);
      setHeight(divHeight);
    }
  }, [myDivRef]);

  /** Responsivenes on change of window width and height- Start */
  useEffect(() => {
    const handleResize = () => {
      const myDiv = myDivRef.current;
      if (myDiv) {
        const divWidth = myDiv.offsetWidth;
        const divHeight = myDiv.offsetHeight;
        setWidth(divWidth);
        setHeight(divHeight);
      }
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (windowWidth <= 325) {
        setScreenSize("xsm");
      } else if (windowWidth > 325 && windowWidth < 375) {
        setScreenSize("sm");
      } else if (
        (windowWidth >= 375 && windowWidth < 425) ||
        (windowHeight >= 400 && windowHeight < 550)
      ) {
        setScreenSize("sm");
      } else if (
        (windowWidth >= 425 && windowWidth < 568) ||
        (windowHeight >= 550 && windowHeight < 599)
      ) {
        setScreenSize("md");
      } else if (windowWidth >= 568 && windowWidth <= 768) {
        setScreenSize("lg");
      } else if (windowWidth >= 769 && windowWidth <= 800) {
        setScreenSize("lg");
      } else if (windowWidth >= 801 && windowWidth <= 990) {
        setScreenSize("xl");
      } else if (windowWidth >= 991 && windowWidth <= 1300) {
        setScreenSize("lmd");
      } else if (windowWidth >= 1300 && windowWidth <= 1418) {
        setScreenSize("lmd");
      } else {
        setScreenSize("lg");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [myDivRef]);
  /** Responsivenes on change of window width and height - End */

  /**
   * Responsiveness of canvas is handled here and Methods -- End
   */

  /**
   * Resize of division is handled here and Methods -- Start
   */
  useEffect(() => {
    const myDiv = myDivRef.current;
    if (!myDiv) return;
    const resizeObserver = new ResizeObserver(() => {
      const divWidth = myDiv.offsetWidth;
      const divHeight = myDiv.offsetHeight;
      setWidth(divWidth);
      setHeight(divHeight);
    });

    resizeObserver.observe(myDiv);
    // Clean up ResizeObserver on unmount
    return () => resizeObserver.disconnect();
  }, [myDivRef]);

  /**
   * Resize of division is handled here and Methods -- End
   */

  // useEffect(() => {
  //   /** If chat box is not open  */
  //   if (!chatOpen && width > 768) {
  //     setScreenSize("xl");
  //     // quad curve should not restart on
  //   }
  //   /** If chat box is open  */

  //   if (chatOpen && width > 768) {
  //     setScreenSize("lg");
  //     // quad curve should not restart on
  //   }

  //   if (!chatOpen && width > 1400) {
  //     setScreenSize("lmd");
  //     // quad curve should not restart on
  //   }
  // }, [chatOpen, width]);

  return (
    <div
      className={`${
        !chatOpen ? "stage-canvas-div" : "stage-canvas-div-with-chatbox"
      }`}
      ref={myDivRef}
    >
      <Stage
        className={`${!chatOpen ? "stage-canvas" : "stage-canvas-1"}`}
        width={width}
        height={height}
        options={{
          backgroundColor: 0x000000,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
        }}
      >
        <Container position={[0, height]}>
          <RotatingSun play={gameStatus === 2} />
        </Container>

        {/* Waiting scene start */}
        {gameStatus === 0 && isWaitShow && (
          <>
            <WaitingText
              width={width}
              height={height}
              gameStatus={gameStatus}
              screenSize={screenSize}
            />
            <RotatingProp
              width={width}
              height={height}
              screenSize={screenSize}
            />
            <ReducingProgressBar
              width={width}
              height={height}
              durationInSeconds={durationInSeconds}
              updateSecondsSendToParent={receiveDataFromChild}
              screenSize={screenSize}
            />
          </>
        )}

        {/* Game start scene */}

        {gameStatus === 2 && (
          <>
            <Container position={[width * 0.5, height * 0.5]}>
              <BlurBg multiplierValue={counter} screenSize={screenSize} />
            </Container>
            <HorizontalLineCreation
              width={width}
              height={height}
              isVisible={isAnimationEnabled()}
              screenSize={screenSize}
            />
            <VerticalLineCreation
              width={width}
              height={height}
              isVisible={isAnimationEnabled()}
              screenSize={screenSize}
            />
          </>
        )}
        <AnimateQuadraticCurve
          width={width}
          height={height}
          gameStatus={gameStatus}
          isVisible={isAnimationEnabled()}
          screenSize={screenSize}
          chatOpen={chatOpen}
        />

        <FlyingPlane
          width={width}
          height={height}
          gameStatus={gameStatus}
          isVisible={isAnimationEnabled()}
          screenSize={screenSize}
        />

        {/* Game end scene */}

        {gameStatus === 3 && (
          <>
            <FlewAwayText
              width={width}
              height={height}
              gameStatus={gameStatus}
              screenSize={screenSize}
            />
          </>
        )}

        {(gameStatus === 3 || gameStatus === 2) && (
          <>
            <MultiplierText
              width={width}
              height={height}
              counter={counter}
              gameStatus={gameStatus}
              screenSize={screenSize}
            />
          </>
        )}
      </Stage>
    </div>
  );
};

export default AviatorGame;