import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Graphics, ParticleContainer } from "@pixi/react";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import starLocalImg from "../assets/star.png";
import { defaultSettings } from "../animeSettings";

const HorizontalDottedLineCreationAndAnimation = ({
  width,
  height,
  startAnimation,
  isVisible,
  screenSize,
}) => {
  const horizontalContainerRef = useRef(null);
  const [animationStopped, setAnimationStopped] = useState(!startAnimation);
  useEffect(() => {
    const offsetX = width * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_START_POINT_X;
    const horizontalDotsContainer = horizontalContainerRef.current;
    const particleQuantity = 18;
    const particles = [];
    for (let i = 0; i < particleQuantity; i++) {
      const horizontalDots = PIXI.Sprite.from(starLocalImg);
      // Adjust the scale and position of particles
      horizontalDots.scale.set(
        defaultSettings.HORIZONTAL_DOTTED_LINE[screenSize].DOT_SCALE
      ); // Set scale

      horizontalDots.x =
        width *
        defaultSettings.HORIZONTAL_DOTTED_LINE[screenSize].DOT_OFFSET_X *
        (i +
          defaultSettings.HORIZONTAL_DOTTED_LINE[screenSize]
            .OFFSET_BETWEEN_DOTS);
      horizontalDots.y =
        height *
        defaultSettings.HORIZONTAL_DOTTED_LINE[screenSize].DOT_OFFSET_Y;

      horizontalDotsContainer.addChild(horizontalDots);
      particles.push(horizontalDots);
    }
    // GSAP Animation
    if (!animationStopped) {
      gsap.to(particles, {
        duration: 20,
        x: `-=${width * 0.9}`,
        repeat: -1,
        yoyo: false,
        delay: 0,
        ease: "none",
        onUpdate: () => {
          particles.forEach((particle, index) => {
            if (particle.x < offsetX) {
              particle.x = width;
            }
          });
        },
      });
      // Cleanup function to remove added children when component unmounts
    }
    return () => {
      particles.forEach((particle) => {
        horizontalDotsContainer.removeChild(particle);
      });
    };
  }, [width, height, startAnimation, animationStopped]);
  useEffect(() => {
    setAnimationStopped(!startAnimation);
  }, [startAnimation]);
  return (
    <>
      <ParticleContainer
        ref={horizontalContainerRef}
        properties={{
          scale: true, // Enable scale transformation
          position: true, // Enable position transformation
          rotation: true, // Enable rotation transformation
          alpha: true, // Enable alpha transformation
        }}
        alpha={!isVisible ? 0 : 1}
      />
    </>
  );
};

const VerticalDottedLineCreationAndAnimation = ({
  width,
  height,
  startAnimation,
  isVisible,
  screenSize,
}) => {
  const verticalContainerRef = useRef(null);
  const [animationStopped, setAnimationStopped] = useState(!startAnimation);

  useEffect(() => {
    const offsetY = height * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_START_POINT_Y;
    const verticalDotsContainer = verticalContainerRef.current;
    const verticalDotsQuantity = 18;
    const verticalDotParticals = [];
    for (let i = 0; i < verticalDotsQuantity; i++) {
      const verticalDots = PIXI.Sprite.from(starLocalImg);
      // Adjust the scale and position of particles
      verticalDots.scale.set(
        defaultSettings.VERTICAL_DOTTED_LINE[screenSize].DOT_SCALE
      );
      verticalDots.tint = defaultSettings.VERTICAL_DOTTED_LINE.TINT_COLOR;
      verticalDots.x =
        width * defaultSettings.VERTICAL_DOTTED_LINE[screenSize].DOT_OFFSET_X;
      verticalDots.y =
        height * defaultSettings.VERTICAL_DOTTED_LINE[screenSize].DOT_OFFSET_Y -
        i *
          height *
          defaultSettings.VERTICAL_DOTTED_LINE[screenSize].OFFSET_BETWEEN_DOTS;

      verticalDotsContainer.addChild(verticalDots);
      verticalDotParticals.push(verticalDots);
    }

    if (!animationStopped) {
      verticalDotParticals.forEach((verticalDots, index) => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(verticalDots, {
          duration: 20,
          y: `+=${height * 0.9}`,
          ease: "none",
          onUpdate: () => {
            if (verticalDots.y > offsetY) {
              verticalDots.y = -10;
            }
          },
        });
        return () => {
          tl.pause();
          tl.clear();
        };
      });
    }

    // Cleanup function to remove added children when component unmounts
    return () => {
      verticalDotParticals.forEach((particle) => {
        verticalDotsContainer.removeChild(particle);
      });
    };
  }, [width, height, startAnimation, animationStopped]);
  useEffect(() => {
    setAnimationStopped(!startAnimation);
  }, [startAnimation]);
  return (
    <>
      <ParticleContainer
        ref={verticalContainerRef}
        properties={{
          scale: true, // Enable scale transformation
          position: true, // Enable position transformation
          rotation: true, // Enable rotation transformation
          alpha: true, // Enable alpha transformation
        }}
        alpha={!isVisible ? 0 : 1}
      />
    </>
  );
};

const HorizontalLineCreation = ({ width, height, isVisible, screenSize }) => {
  const horizontalLineRef = useRef(null);
  useLayoutEffect(() => {
    const horizontalLineContainer = horizontalLineRef.current;
    const line = new PIXI.Graphics();
    line.clear();
    line.lineStyle(
      defaultSettings.HORIZONTAL_LINE[screenSize].LINE_WIDTH,
      defaultSettings.HORIZONTAL_LINE.LINE_COLOR
    ); // Width and color of the line
    line.moveTo(
      width * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_START_POINT_X,
      height * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_START_POINT_Y
    ); // Starting point of the line (left)
    line.lineTo(
      width * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_END_POINT_X,
      height * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_END_POINT_Y
    ); // Ending point of the line (right)
    horizontalLineContainer.addChild(line);

    // Function to update the line's position
    const updateLinePosition = () => {
      line.clear();
      line.lineStyle(
        defaultSettings.HORIZONTAL_LINE[screenSize].LINE_WIDTH,
        defaultSettings.HORIZONTAL_LINE.LINE_COLOR
      ); // Width and color of the line
      line.moveTo(
        width * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_START_POINT_X,
        height * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_START_POINT_Y
      ); // Starting point of the line (left)
      line.lineTo(
        width * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_END_POINT_X,
        height * defaultSettings.HORIZONTAL_LINE[screenSize].LINE_END_POINT_Y
      ); // Ending point of the line (right)
    };

    // Add event listener for window resize events
    window.addEventListener("resize", updateLinePosition);
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", updateLinePosition);
      horizontalLineContainer.removeChild(line);
    };
  }, [width, height]);
  return (
    <>
      <Graphics ref={horizontalLineRef} alpha={!isVisible ? 0 : 1} />
    </>
  );
};

const VerticalLineCreation = ({ width, height, isVisible, screenSize }) => {
  const verticalLineRef = useRef(null);
  useLayoutEffect(() => {
    const verticalLineContainer = verticalLineRef.current;
    const line = new PIXI.Graphics();
    line.clear();
    line.lineStyle(
      defaultSettings.VERTICAL_LINE[screenSize].LINE_WIDTH,
      defaultSettings.VERTICAL_LINE.LINE_COLOR
    ); // Width and color of the line
    line.moveTo(
      width * defaultSettings.VERTICAL_LINE[screenSize].LINE_START_POINT_X,
      height * defaultSettings.VERTICAL_LINE[screenSize].LINE_START_POINT_Y
    ); // Starting point of the line (left)
    line.lineTo(
      width * defaultSettings.VERTICAL_LINE[screenSize].LINE_END_POINT_X,
      defaultSettings.VERTICAL_LINE[screenSize].LINE_END_POINT_Y
    ); // Ending point of the line (right)
    verticalLineContainer.addChild(line);

    // Function to update the line's position
    const updateLinePosition = () => {
      line.clear();
      line.lineStyle(
        defaultSettings.VERTICAL_LINE[screenSize].LINE_WIDTH,
        defaultSettings.VERTICAL_LINE.LINE_COLOR
      ); // Width and color of the line
      line.moveTo(
        width * defaultSettings.VERTICAL_LINE[screenSize].LINE_START_POINT_X,
        height * defaultSettings.VERTICAL_LINE[screenSize].LINE_START_POINT_Y
      ); // Starting point of the line (left)
      line.lineTo(
        width * defaultSettings.VERTICAL_LINE[screenSize].LINE_END_POINT_X,
        defaultSettings.VERTICAL_LINE[screenSize].LINE_END_POINT_Y
      ); // Ending point of the line (right)
    };

    // Add event listener for window resize events
    window.addEventListener("resize", updateLinePosition);
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", updateLinePosition);
      verticalLineContainer.removeChild(line);
    };
  }, [width, height]);
  return (
    <>
      <Graphics ref={verticalLineRef} alpha={!isVisible ? 0 : 1} />
    </>
  );
};
export {
  HorizontalDottedLineCreationAndAnimation,
  VerticalDottedLineCreationAndAnimation,
  HorizontalLineCreation,
  VerticalLineCreation,
};
