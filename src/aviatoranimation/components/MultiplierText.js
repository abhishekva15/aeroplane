import React, { useState, useEffect } from "react";
import { Text, Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { defaultSettings } from "../animeSettings";

const MultiplierText = ({ width, height, counter, gameStatus, screenSize }) => {
  const [fillColor, setFillColor] = useState("#FFFFFF");

  /** Information Panel Text Style  */
  const textStyle = new PIXI.TextStyle({
    fill: fillColor,
    letterSpacing: 0,
    fontFamily: defaultSettings.MULTIPLIER_TEXT.FONT_FAMILY,
    fontSize: defaultSettings.MULTIPLIER_TEXT[screenSize].FONT_SIZE,
    fontWeight: defaultSettings.MULTIPLIER_TEXT.FONT_WEIGHT,
  });

  // Handle the event to change fill color
  const handleFontColor = (color) => {
    setFillColor(color); // Change to the desired color
  };

  useEffect(() => {
    if (gameStatus == 3) {
      handleFontColor("#D0021B");
    }
    if (gameStatus == 2) {
      handleFontColor("#FFFFFF");
    }
  }, [gameStatus]);

  return (
    <>
      <Container
        position={[
          width * defaultSettings.MULTIPLIER_TEXT[screenSize].CANVAS_POSITION_X,
          height *
            defaultSettings.MULTIPLIER_TEXT[screenSize].CANVAS_POSITION_Y,
        ]}
      >
        <Text text={`${counter}x`} anchor={[0.5, 0.5]} style={textStyle} />
      </Container>
    </>
  );
};

export default MultiplierText;
