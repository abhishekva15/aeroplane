import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import gsap from "gsap";
import * as PIXI from "pixi.js";
import { Graphics, AnimatedSprite } from "@pixi/react";
import {
  HorizontalDottedLineCreationAndAnimation,
  VerticalDottedLineCreationAndAnimation,
} from "./Axis";
import { flyPlaneFrames } from "../assets/plane";
import { defaultSettings } from "../animeSettings";
/** Flying Rocket Animation Sequence */
const flyPlaneTextureArray = flyPlaneFrames.map((value) => {
  const texture = PIXI.Texture.from(value);
  return texture;
});

const AnimateQuadraticCurve = ({
  width,
  height,
  gameStatus,
  isVisible,
  screenSize,
}) => {
  const graphicsRef = useRef(null);
  const planeRef = useRef(null);

  const CONTROL_POINT_X_PERCENT = useMemo(() => 0.5, []);
  const MOUNT_TIME = useMemo(() => 8, []);
  const AXIS_OFFSET = useMemo(
    () => defaultSettings.QUAD_CURVE[screenSize].AXIS_OFFSET * width,
    [screenSize, width]
  );
  const CURVE_WIDTH = useMemo(() => 4, []);
  const CURVE_COLOR = useMemo(() => "#f00b3e", []);
  const GRADIENT_COLOR = useMemo(() => "#d0021b", []);

  const [startDottedLineAnimation, setStartDottedLineAnimation] =
    useState(false);

  const [curveOpacity, setCurveOpacity] = useState(1);
  const [planeOpacity, setplaneOpacity] = useState(0);
  const planeX = useMemo(
    () => width * defaultSettings.PLANE[screenSize].START_POINT_X,
    [width]
  );
  const planeY = useMemo(
    () => height * defaultSettings.PLANE[screenSize].START_POINT_X,
    [height]
  );

  const startPoint = useMemo(
    () => ({
      x: defaultSettings.QUAD_CURVE[screenSize].CURVE_START_POINT_X * width,
      y: defaultSettings.QUAD_CURVE[screenSize].CURVE_START_POINT_Y * height,
    }),
    [height, width]
  );
  const controlPoint = {
    x: 0,
    y: 0,
  };
  const endPoint = useMemo(
    () => ({
      x: defaultSettings.QUAD_CURVE[screenSize].CURVE_END_POINT_X * width,
      y: defaultSettings.QUAD_CURVE[screenSize].CURVE_END_POINT_Y * height,
    }),
    [height, width]
  );

  const mountPoint = useRef({ x: 0, y: 0 });
  const glidePoint = useRef({ x: 0, y: 0 });
  const [activeTimeline, setActiveTimeline] = useState("tl");
  const [timelineTime, setTimelineTime] = useState({ tl: 0, tl2: 0 });

  const tempEp = useRef({ x: 0, y: 0 });

  const drawQuadraticCurve = useCallback(
    (g, startPoint, controlPoint, endPoint, plane) => {
      plane.x = endPoint.x;
      plane.y = endPoint.y;
      controlPoint.x = CONTROL_POINT_X_PERCENT * endPoint.x;
      controlPoint.y = startPoint.y;
      g.clear();
      g.lineStyle({
        width: CURVE_WIDTH,
        color: CURVE_COLOR,
        join: PIXI.LINE_JOIN.ROUND,
        // cap: PIXI.LINE_CAP.ROUND,
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
    [CONTROL_POINT_X_PERCENT, CURVE_WIDTH, CURVE_COLOR, GRADIENT_COLOR]
  );

  const memoizedDrawCurve = useCallback(
    (graphics, startPoint, controlPoint, endPoint, plane) => {
      drawQuadraticCurve(graphics, startPoint, controlPoint, endPoint, plane);
    },
    [drawQuadraticCurve]
  );

  const animateQuadCurve = useCallback(
    (
      graphics,
      plane,
      endPoint,
      startPoint,
      controlPoint,
      glidePoint,
      mountPoint,
      MOUNT_TIME,
      timelineTime
    ) => {
      const tl = gsap.timeline({
        onStart: () => setActiveTimeline("tl"),
        onUpdate: () => {
          setTimelineTime((prev) => ({ ...prev, tl: tl.time() }));
        },
        onComplete: () => {
          setTimelineTime((prev) => ({ ...prev, tl: 0 }));
        },
      });
      const tl2 = gsap.timeline({
        onStart: () => setActiveTimeline("tl2"),
        onUpdate: () =>
          setTimelineTime((prev) => ({ ...prev, tl2: tl2.time() })),
        onComplete: () => setTimelineTime((prev) => ({ ...prev, tl2: 0 })),
      });
      tl.clear()
        .to(
          endPoint,
          {
            x: mountPoint.current.x,
            ease: "power1.out",
            duration: MOUNT_TIME,
            onUpdate: () => {
              graphics.clear();
              endPoint.x = gsap.getProperty(endPoint, "x");
              plane.x = gsap.getProperty(endPoint, "x");
              memoizedDrawCurve(
                graphics,
                startPoint,
                controlPoint,
                endPoint,
                plane
              );
            },
            onComplete: () => {
              // Animation complete callback
              setStartDottedLineAnimation(true);
            },
          },
          0
        )
        .to(
          endPoint,
          {
            y: mountPoint.current.y,
            ease: "power1.inOut",
            duration: MOUNT_TIME,
            onUpdate: () => {
              endPoint.y = gsap.getProperty(endPoint, "y");
              plane.y = gsap.getProperty(endPoint, "y");
              tempEp.current.x = endPoint.x;
              tempEp.current.y = endPoint.y;
            },
          },
          0
        )
        .add(() => {
          tl2.clear().to([endPoint, plane], {
            duration: 3.5,
            x: glidePoint.current.x,
            y: glidePoint.current.y,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            onUpdate: () => {
              graphics.clear();
              memoizedDrawCurve(
                graphics,
                startPoint,
                controlPoint,
                endPoint,
                plane
              );
              tempEp.current.x = endPoint.x;
              tempEp.current.y = endPoint.y;
            },
            onComplete: () => {
              graphics.clear();
            },
          });
        });
      if (activeTimeline === "tl" && timelineTime.tl > 0) {
        tl.time(timelineTime.tl).play();
      } else if (activeTimeline === "tl2" && timelineTime.tl2 > 0) {
        tl2.time(timelineTime.tl2).play();
      }

      return tl;
    },
    [memoizedDrawCurve, activeTimeline, timelineTime]
  );

  const resizeAnime = useCallback(
    (plane, graphics) => {
      // calculate start point
      startPoint.x =
        defaultSettings.QUAD_CURVE[screenSize].CURVE_START_POINT_X * width;
      startPoint.y =
        defaultSettings.QUAD_CURVE[screenSize].CURVE_START_POINT_Y * height;
      // // calculate plane pos
      plane.x = startPoint.x;
      plane.y = startPoint.y;
      // Calculate end point
      endPoint.x = startPoint.x;
      endPoint.y = startPoint.y;
      // calculate control y pos
      controlPoint.y = startPoint.y;
      // caluclate mount point
      mountPoint.current.x = Math.max(
        width * 0.9 -
          (plane.width +
            defaultSettings.QUAD_CURVE[screenSize].AXIS_OFFSET * 1.75),
        startPoint.x
      );
      mountPoint.current.y = Math.min(plane.height * 1.5, startPoint.y);
      // calculate glide point
      glidePoint.current.x =
        width -
        (plane.width +
          defaultSettings.QUAD_CURVE[screenSize].AXIS_OFFSET * 1.75);
      glidePoint.current.y = plane.height * 2;

      graphics.clear();
    },
    [screenSize, width, height]
  );

  useEffect(() => {
    const graphics = graphicsRef.current;
    const plane = planeRef.current;
    if (!graphics) return;
    if (!plane) return;
    plane.anchor.x = 1;
    plane.anchor.y = 1;

    // Kill existing tweens and clear graphics
    // gsap.killTweensOf([plane, graphics]);
    resizeAnime(plane, graphics);

    let til;

    if (gameStatus === 2) {
      plane.anchor.x = 0.1;
      plane.anchor.y = 0.9;
      plane.x = planeX;
      plane.y = planeY;
      // resizeAnime(plane, graphics);
      til = animateQuadCurve(
        graphics,
        plane,
        endPoint,
        startPoint,
        controlPoint,
        glidePoint,
        mountPoint,
        MOUNT_TIME,
        timelineTime
      );
    }

    return () => {
      gsap.killTweensOf(endPoint);
      if (til) {
        til.clear(); // Clear the timeline on component unmount
      }
      setStartDottedLineAnimation(false);
    };
  }, [gameStatus, width, height]);

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return; // If plane is null, exit early

    plane.x = tempEp.current.x;
    plane.y = tempEp.current.y;

    if (gameStatus === 3) {
      // Animation to move the plane out of the screen
      gsap.to(plane, {
        duration: 0.5,
        x: width + plane.width,
        y: plane.y - 200,
        ease: "none",
        onComplete: () => {
          plane.x = planeX;
          plane.y = planeY;
          setplaneOpacity(0);
          timelineTime.tl = 0;
          timelineTime.tl2 = 0;
        },
      });
    }
    return () => {
      gsap.killTweensOf(plane);
    };
  }, [gameStatus]);

  useEffect(() => {
    const graphics = graphicsRef.current;
    if (gameStatus !== 2) {
      setCurveOpacity(0);
      endPoint.x = startPoint.x;
      endPoint.y = startPoint.y;
      graphics.clear();
    }
  }, [gameStatus, width, height]);

  useEffect(() => {
    if (gameStatus === 1 || gameStatus === 0) {
      setplaneOpacity(0);
      // plane.alpha = 0;
    } else if (!isVisible) {
      setplaneOpacity(0);
    } else if (gameStatus === 2 || gameStatus === 3) {
      setplaneOpacity(1);
    }

    if (gameStatus === 2 && isVisible) {
      setCurveOpacity(1);
    } else {
      setCurveOpacity(0);
    }
  }, [isVisible, gameStatus]);

  return (
    <>
      {gameStatus === 2 && (
        <>
          <VerticalDottedLineCreationAndAnimation
            width={width}
            height={height}
            startAnimation={startDottedLineAnimation}
            isVisible={isVisible}
            screenSize={screenSize}
          />
          <HorizontalDottedLineCreationAndAnimation
            width={width}
            height={height}
            startAnimation={startDottedLineAnimation}
            isVisible={isVisible}
            screenSize={screenSize}
          />
        </>
      )}
      <Graphics ref={graphicsRef} alpha={curveOpacity} />
      <AnimatedSprite
        scale={defaultSettings.PLANE[screenSize].PLANE_SCALE}
        textures={flyPlaneTextureArray}
        isPlaying={true}
        initialFrame={0}
        loop={true}
        animationSpeed={0.2}
        alpha={planeOpacity}
        ref={planeRef}
      />
    </>
  );
};

export default AnimateQuadraticCurve;