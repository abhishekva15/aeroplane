import React, { useState, useLayoutEffect } from "react";
import { Sprite } from "@pixi/react";
import prop from "../assets/prop.svg";
import { defaultSettings } from "../animeSettings";

const RotatingProp = ({ width, height, screenSize }) => {
  const [rotation, setRotation] = useState(0);

  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      setRotation(rotation + defaultSettings.PROP.ROTATING_SPEED);
    }, 1000 / 60); // Adjust the interval based on the desired frame rate

    return () => {
      clearInterval(intervalId);
    };
  }, [rotation]);

  return (
    <Sprite
      image={prop}
      anchor={0.5}
      rotation={rotation}
      x={width * defaultSettings.PROP[screenSize].CANVAS_POSITION_X}
      y={height * defaultSettings.PROP[screenSize].CANVAS_POSITION_Y}
      scale={defaultSettings.PROP[screenSize].SCALE_SIZE}
    />
  );
};

export default RotatingProp;
