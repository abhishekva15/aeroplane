import React from "react";
import { Text, Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { defaultSettings } from "../animeSettings";
const WaitingText = ({ width, height, screenSize }) => {
  /** Information Panel Text Style  */
  const textStyle = new PIXI.TextStyle({
    fill: "#FFFFFF",
    letterSpacing: defaultSettings.WAITING_TEXT[screenSize].LETTER_SPACING,
    // fontSize: defaultSettings[screenSize].TEXT_WAITING_SIZE,
    fontSize: defaultSettings.WAITING_TEXT[screenSize].FONT_SIZE,
    fontFamily: defaultSettings.WAITING_TEXT.FONT_FAMILY,
  });

  return (
    <>
      <Container
        position={[
          width * defaultSettings.WAITING_TEXT[screenSize].CANVAS_POSITION_X,
          height * defaultSettings.WAITING_TEXT[screenSize].CANVAS_POSITION_Y,
        ]}
      >
        <Text
          text="WAITING FOR NEXT ROUND"
          anchor={[0.5, 0.5]}
          style={textStyle}
          scale={{
            x: defaultSettings.WAITING_TEXT.TEXT_SCALE_X,
            y: defaultSettings.WAITING_TEXT.TEXT_SCALE_y,
          }}
        />
      </Container>
    </>
  );
};

export default WaitingText;
