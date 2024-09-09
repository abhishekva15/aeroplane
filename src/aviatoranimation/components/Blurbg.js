import React, { useState, useEffect } from "react";
import { Sprite } from "@pixi/react";
import blur from "../assets/blur.svg";
const BlurBg = ({ multiplierValue, screenSize }) => {
  const [rotation, setRotation] = useState(0);
  const [bgTint, setBgTint] = useState(0x34b4ff);
  // const [isAnimate, setIsAnimate] = useState(play);

  // Blur bg tint
  // x < 2x --> tinti color 0x34B4FF -->dark Blue
  // 2x < x > 10x --> tint colro 0x913EF8  --> dark purple
  // setBgTint(0x913EF8);
  // 10x < x  --> tint colro 0xC017B4  --> dark pink
  // setBgTint(0xC017B4);

  useEffect(() => {
    if (multiplierValue < 2) {
      setBgTint(0x34b4ff);
    } else if (multiplierValue > 2 && multiplierValue < 10) {
      setBgTint(0x913ef8);
    } else if (multiplierValue > 10) {
      setBgTint(0xc017b4);
    }
  }, [multiplierValue]);

  // useTick((delta) => (isAnimate) ? delta && setRotation(rotation + 0.004 * delta):'');

  return (
    <Sprite
      image={blur}
      anchor={0.5}
      tint={bgTint}
      // rotation={rotation}
      scale={screenSize === "lg" ? 1.2 : 1}
    />
  );
};

export default BlurBg;