import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import * as PIXI from "pixi.js";
import { Graphics, AnimatedSprite } from "@pixi/react";
import { flyPlaneFrames } from "../assets/plane";
import { defaultSettings } from "../animeSettings";

const flyPlaneTextureArray = flyPlaneFrames.map((value) => {
  const texture = PIXI.Texture.from(value);
  return texture;
});

const QuadCurve = ({ width, height, screenSize }) => {
  const curveRef = useRef(null);
  const planeRef = useRef(null);
  const CONTROL_POINT_X_PERCENT = 0.5;
  const MOUNT_TIME = 8;
  const GLIDE_TIME = 4;
  const AXIS_OFFSET = 30;
  const MOUNT_POINT_OFFSET_PLANE_SCALE = { x: 1.5, y: 1 };
  const CURVE_WIDTH = 4;
  const CURVE_COLOR = "#f00b3e";
  const GRADIENT_COLOR = "#d0021b";
  //   const [width, setWidth] = useState(768);
  //   const [height, setHeight] = useState(400);

  const startPoint = { x: AXIS_OFFSET, y: height - AXIS_OFFSET };
  const [controlPoint, setControlPoint] = useState({
    x: 0,
    y: 0,
  });
  const [endPoint, setEndPoint] = useState({
    x: AXIS_OFFSET,
    y: height - AXIS_OFFSET,
  });
  const plane = { width: 140, height: 90 };
  const mountPoint = {
    x: Math.max(
      width - MOUNT_POINT_OFFSET_PLANE_SCALE.x * plane.width,
      startPoint.x
    ),
    y: Math.min(MOUNT_POINT_OFFSET_PLANE_SCALE.y * plane.height, startPoint.y),
  };
  const glidePoint = { x: 0, y: 0 };

  const [planeOpacity, setplaneOpacity] = useState(1);

  const draw = useCallback(
    (g) => {
      if (!g) return;
      g.clear();
      g.beginFill(0xff700b, 1);
      g.drawRect(endPoint.x, endPoint.y, 12, 12);
      g.endFill();
    },
    [endPoint]
  );

  const drawCurve = useCallback(
    (g) => {
      if (!g) return;
      controlPoint.x = CONTROL_POINT_X_PERCENT * endPoint.x;
      controlPoint.y = startPoint.y;
      g.clear();
      g.lineStyle({
        width: CURVE_WIDTH,
        color: CURVE_COLOR,
        join: PIXI.LINE_JOIN.ROUND,
        cap: PIXI.LINE_CAP.ROUND,
        alignment: 0.5,
      })
        .moveTo(startPoint.x, startPoint.y)
        .quadraticCurveTo(
          controlPoint.x,
          controlPoint.y,
          endPoint.x,
          endPoint.y
        );
      g.lineStyle();
      g.beginFill(GRADIENT_COLOR, 0.5)
        .moveTo(startPoint.x, startPoint.y)
        .quadraticCurveTo(
          controlPoint.x,
          controlPoint.y,
          endPoint.x,
          endPoint.y
        )
        .lineTo(endPoint.x, startPoint.y)
        .lineTo(startPoint.x, startPoint.y);
    },
    [endPoint, startPoint, controlPoint]
  );

  let tl = gsap.timeline({
    paused: false,
    onComplete: () => {
  
    },
  });

  useEffect(() => {
    tl.to(
      endPoint,
      {
        x: mountPoint.x,
        ease: "power1.out",
        duration: MOUNT_TIME,
        onStart: () => {},
        onUpdate: () => {
          endPoint.x = gsap.getProperty(endPoint, "x");
        },
      },
      0
    )
      .to(
        endPoint,
        {
          y: mountPoint.y,
          ease: "power1.inOut",
          duration: MOUNT_TIME,
          onUpdate: () => {
            endPoint.y = gsap.getProperty(endPoint, "y");
          },
        },
        0
      )
      .add(() => {
        tl.to(endPoint, {
          duration: GLIDE_TIME,
          x: glidePoint.x,
          y: glidePoint.y,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          onUpdate: () => {},
        });
      });
  }, []);

  return (
    <>
      <Graphics ref={curveRef} draw={drawCurve} />
      <AnimatedSprite
        ref={planeRef}
        anchor={[0.1, 0.9]}
        scale={defaultSettings.PLANE[screenSize].PLANE_SCALE}
        textures={flyPlaneTextureArray}
        isPlaying={true}
        initialFrame={0}
        loop={true}
        animationSpeed={0.2}
        alpha={planeOpacity}
      />
    </>
  );
};

export default QuadCurve;
