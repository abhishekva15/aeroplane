import React, { useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { AnimatedSprite } from "@pixi/react";
import { flyPlaneFrames } from "../assets/plane";
import { defaultSettings } from "../animeSettings";
/** Flying Rocket Animation Sequence */
const flyPlaneTextureArray = flyPlaneFrames.map((value) => {
  const texture = PIXI.Texture.from(value);
  return texture;
});

const FlyingPlane = ({ width, height, gameStatus, isVisible, screenSize }) => {
  return (
    <>
      {(gameStatus == 1 || gameStatus == 0) && (
        <AnimatedSprite
          anchor={[0.1, 0.9]}
          position={[
            width * defaultSettings.QUAD_CURVE[screenSize].CURVE_START_POINT_X,
            height * defaultSettings.QUAD_CURVE[screenSize].CURVE_START_POINT_Y,
          ]}
          scale={defaultSettings.PLANE[screenSize].PLANE_SCALE}
          textures={flyPlaneTextureArray}
          isPlaying={true}
          initialFrame={0}
          loop={true}
          animationSpeed={0.2}
          alpha={!isVisible ? 0 : 1}
        />
      )}
    </>
  );
};

export default FlyingPlane;
