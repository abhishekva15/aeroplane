import React, { useState } from "react";
import {
  useTick,
  Sprite,
} from "@pixi/react";
import bgSun from "../assets/bg-sun.svg";

const RotatingSun = ({ play }) => {
  const [rotation, setRotation] = useState(0);
  useTick((delta) =>
    play ? delta && setRotation(rotation + 0.004 * delta) : ""
  );

  return <Sprite image={bgSun} anchor={0.5} rotation={rotation} />;
};

export default RotatingSun;
