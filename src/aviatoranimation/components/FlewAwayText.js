import React from "react";
import { Text, Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { defaultSettings } from "../animeSettings";
const FlewAwayText = ({ width, height, screenSize,gameStatus }) => {
  /** Information Panel Text Style  */
  const textStyle = new PIXI.TextStyle({
    fill: "#FFFFFF",
    letterSpacing: defaultSettings.FLEW_AWAY_TEXT[screenSize].LETTER_SPACING,
    // fontSize: defaultSettings[screenSize].TEXT_WAITING_SIZE,
    fontSize: defaultSettings.FLEW_AWAY_TEXT[screenSize].FONT_SIZE,
    fontFamily: defaultSettings.FLEW_AWAY_TEXT.FONT_FAMILY,
});
  return (
    <>
      <Container
        position={[
          width * defaultSettings.FLEW_AWAY_TEXT[screenSize].CANVAS_POSITION_X,
          height * defaultSettings.FLEW_AWAY_TEXT[screenSize].CANVAS_POSITION_Y,
        ]}
      >
        <Text
          text="FLEW AWAY!"
          anchor={[0.5, 0.5]}
          style={textStyle}
          scale={{
            x: defaultSettings.FLEW_AWAY_TEXT.TEXT_SCALE_X,
            y: defaultSettings.FLEW_AWAY_TEXT.TEXT_SCALE_y,
          }}
        />
      </Container>
    </>
  );
};

export default FlewAwayText;
