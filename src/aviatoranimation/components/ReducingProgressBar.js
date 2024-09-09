import React, { useRef, useState, useLayoutEffect } from "react";
import { Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { defaultSettings } from "../animeSettings";

const ReducingProgressBar = ({
  width,
  height,
  durationInSeconds,
  updateSecondsSendToParent,
  screenSize,
}) => {
  const progressBarRef = useRef();
  const [progress, setProgress] = useState(1);
  const barWidth =
    width * defaultSettings.REDUCTING_PROGRESS_BAR[screenSize].BAR_WIDTH;
  const barHeight =
    height * defaultSettings.REDUCTING_PROGRESS_BAR[screenSize].BAR_HEIGHT;
  const sendDataToParent = (data) => {
    updateSecondsSendToParent(data);
  };
  useLayoutEffect(() => {
    const progressBar = progressBarRef.current;

    // Clear previous children
    progressBar.removeChildren();

    const updateProgress = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const remainingTime = Math.max(durationInSeconds - elapsedTime, 0);
      const newProgress = remainingTime / durationInSeconds;
      setProgress(newProgress);
      sendDataToParent(remainingTime);
      // Draw the background
      const background = new PIXI.Graphics();
      background.beginFill(0x262830);
      // background.drawRect(0, 0, width, height);
      background.drawRoundedRect(0, 0, barWidth, barHeight, 16);

      background.endFill();
      progressBar.addChild(background);

      // Draw the reducing part based on progress
      const reducingPart = new PIXI.Graphics();
      reducingPart.beginFill(0xe30539);
      // reducingPart.drawRect(0, 0, width * newProgress, height);
      reducingPart.drawRoundedRect(0, 0, barWidth * newProgress, barHeight, 16);
      reducingPart.endFill();
      progressBar.addChild(reducingPart);

      if (remainingTime > 0) {
        requestAnimationFrame(updateProgress);
      }
    };
    const startTime = Date.now();
    updateProgress();
    return () => {
      cancelAnimationFrame(updateProgress);
    };
  }, [barWidth, barHeight, width, height]);
  const x =
    (width - barWidth) *
    defaultSettings.REDUCTING_PROGRESS_BAR[screenSize].CANVAS_POSITION_X;
  const y =
    (height - barHeight) *
    defaultSettings.REDUCTING_PROGRESS_BAR[screenSize].CANVAS_POSITION_Y;
  return <Container x={x} y={y} anchor={[0.5, 0.5]} ref={progressBarRef} />;
};
export default ReducingProgressBar;
