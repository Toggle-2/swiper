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
  toSlide?: () => number;
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
    toSlide,
  } = props;

  //MOUNTS SWIPE
  useEffect(() => {
    if (mountConditions !== false) mountSwipe(element);
    return () => unmountSwipe(element);
  }, [mountConditions, mountSwipe, unmountSwipe, element]);

  //ALLOWS US TO MANIPULATE THE SLIDE INDEX FROM THE PARENT COMPONENT
  useEffect(() => {
    if (toSlide) {
      const index = toSlide();
      const newTransform = index * -slideSpacing;
      setTransformX(newTransform);
    }
  }, [toSlide, slideSpacing]);

  //CYCLES THE SLIDES AND APPLIES ANY OPTIONAL FUNCTIONS FROM PROPS
  useEffect(() => {
    if (
      horizontalSwipe >= slideSpacing * 0.8 &&
      activeSlide !== lastSlideIndex &&
      swipeStatus === "swipeInactive"
    ) {
      setActiveSlide((slide) => slide + 1);
      if (nextHandler) nextHandler();
    } else if (
      horizontalSwipe <= -(slideSpacing * 0.8) &&
      activeSlide !== 0 &&
      swipeStatus === "swipeInactive"
    ) {
      setActiveSlide((slide) => slide - 1);
      if (prevHandler) prevHandler();
    }
  }, [
    swipeStatus,
    horizontalSwipe,
    lastSlideIndex,
    nextHandler,
    prevHandler,
    slideSpacing 
    /*activeSlide will create a feedback loop wherein all slides get cycled*/,
  ]);

  //ALTERS THE TRANSFORM FOR THE SLIDE SHOW
  useEffect(() => {
    const newTransform = activeSlide * -slideSpacing;
    if (swipeStatus === "swipeInactive") setTransformX(newTransform);
  }, [activeSlide, slideSpacing, swipeStatus]);

  return (
    <div
      className={classes.slideShow}
      style={{
        transform: `translateX(${transformX}vw)`,
        transitionDuration: swipeStatus === "swipeActive" ? "" : "500ms",
      }}
      id={element}
    >
      {props.children}
    </div>
  );
};

export { SlideShow, Slide };
