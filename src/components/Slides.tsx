import React, { useEffect, useState } from "react";
import useSwipe from "../hooks/Swipe";
import classes from "./slides.module.css";

interface SlideProps {
  index: number;
  spacing: number;
}

const Slide: React.FC<SlideProps> = (props) => {
  return (
    <div
      className={classes.slide}
      slot="fixed"
      style={{ left: `${props.index * props.spacing}vw` }}
    >
      {props.children}
    </div>
  );
};

interface SlideShowProps {
  slideSpacing: number;
  lastSlideIndex: number;
  element?: string;
  mountConditions?: boolean;
  nextHandler?: () => void;
  prevHandler?: () => void;
}

const SlideShow: React.FC<SlideShowProps> = (props) => {
  const [transformX, setTransformX] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { mountSwipe, unmountSwipe, horizontalSwipe, swipeStatus } = useSwipe();
  const {
    mountConditions,
    lastSlideIndex,
    slideSpacing,
    nextHandler,
    prevHandler,
    element,
  } = props;

  //mounts and unmounts swiper
  useEffect(() => {
    if (mountConditions !== false) mountSwipe(element);
    return () => unmountSwipe(element);
  }, [mountConditions]);

  useEffect(() => {
    console.log("SLIDE INDEX", activeSlide);
  }, [activeSlide]);

  useEffect(() => {
    if (
      horizontalSwipe >= 125 &&
      activeSlide !== lastSlideIndex &&
      transformX >= -slideSpacing * lastSlideIndex
    ) {
      setActiveSlide(activeSlide + 1);
      if(nextHandler) nextHandler();
      // slideForward();
    } else if (horizontalSwipe <= -125 && activeSlide !== 0) {
      if (transformX !== 0) {
        setActiveSlide(activeSlide - 1);
        if(prevHandler) prevHandler();
        // slideBack();
      }
    }
  }, [horizontalSwipe]);

  //handles lifecycle of a swipe event
  useEffect(() => {
    switch (swipeStatus) {
      case "swipeInactive":

        const endingValue =
          Math.round(horizontalSwipe / slideSpacing) * slideSpacing * -1;
        const slideCap = lastSlideIndex * -slideSpacing;
        if (endingValue > 0) {
          setTransformX(0);
        } else if (endingValue < slideCap) {
          setTransformX(slideCap);
        } else setTransformX(endingValue);
        console.log("ENDING_VALUE", endingValue, slideCap);

        break;

      case "swipeActive":
        
        break;

      case "swipeMove":

        // const distance = horizontalSwipe - transformX;
        setTransformX(-horizontalSwipe);

        break;
      default:
        break;
    }
    console.log("[SWIPE EFFECT FIRED]", horizontalSwipe);
  }, [horizontalSwipe, swipeStatus]);

  return (
    <div
      className={classes.slideShow}
      style={{ transform: `translateX(${transformX}vw)` }}
      id={element}
    >
      {props.children}
    </div>
  );
};

export { SlideShow, Slide };
