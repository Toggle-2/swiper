import { useCallback, useEffect, useState } from "react";

const useSwipe = () => {
  const [startPoint, setStartPoint] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [swipeLengthX, setSwipeLengthX] = useState<number>(0);
  const [swipeLengthY, setSwipeLengthY] = useState<number>(0);
  const [swiping, setSwiping] = useState<boolean>(false);
  const [lifecycle, setLifecycle] = useState<"swipeActive" | "swipeMove" | "swipeInactive">("swipeInactive");
  // const [transformX, setTransformX] = useState<number>(0);
  // const [transformY, setTransformY] = useState<number>(0);

  useEffect(() => {
    //!swiping &&
    if (endPoint.x !== 0 || endPoint.y !== 0) {
      setSwipeLengthX(startPoint.x - endPoint.x);
      setSwipeLengthY(startPoint.y - endPoint.y);
    } else {
      setSwipeLengthX(0);
      setSwipeLengthY(0);
    }
  }, [endPoint, startPoint]);

  const touchStartHandler = useCallback(
    (touch: TouchEvent) => {
      setLifecycle("swipeActive");
      touch.preventDefault();
      setEndPoint({ x: 0, y: 0 });
      setStartPoint({ x: touch.touches[0].screenX, y: touch.touches[0].screenY });
      setSwiping(true);
    },
    [swipeLengthX, swiping, startPoint]
  );

  const touchMoveHandler = useCallback(
     (touch: TouchEvent) => {
       setLifecycle("swipeMove");
      touch.preventDefault();
      touch.stopPropagation();
      setEndPoint({ x: touch.touches[0].screenX, y: touch.touches[0].screenY });
    },
    [endPoint]
  );

  const touchEndHandler = useCallback(
    (touch: TouchEvent) => {
      setLifecycle("swipeInactive");
      touch.preventDefault();
      touch.stopPropagation();
      setSwiping(false);
    },
    [swiping]
  );

  const touchCancel = useCallback(
    (touch: TouchEvent) => {
      setLifecycle("swipeInactive");
      touch.preventDefault();
      touch.stopPropagation();
      setSwiping(false);
      setStartPoint({ x: 0, y: 0 });
      setEndPoint({ x: 0, y: 0 });
      setSwipeLengthX(0);
      setSwipeLengthY(0);
      // console.log("SWIPER NO SWIPING!");
    },
    [swiping]
  );

  const mouseDownHandler = useCallback(
    (click: MouseEvent) => {
      click.preventDefault();
      click.stopPropagation();
      setEndPoint({ x: 0, y: 0 });
      setStartPoint({ x: click.screenX, y: click.screenY });
      setSwiping(true);
    },
    [swipeLengthX, swiping, startPoint]
  );

  const mouseMoveHandler = useCallback(
    (click: MouseEvent) => {
      click.preventDefault();
      click.stopPropagation();
      setEndPoint({ x: click.screenX, y: click.screenY });
    },
    [endPoint]
  );

  const mouseUpHandler = useCallback(
    (click: MouseEvent) => {
      click.preventDefault();
      click.stopPropagation();
      setSwiping(false);
    },
    [swiping]
  );

  const mouseCancel = useCallback(
    (click: MouseEvent) => {
      click.preventDefault();
      click.stopPropagation();
      setSwiping(false);
      setStartPoint({ x: 0, y: 0 });
      setEndPoint({ x: 0, y: 0 });
      setSwipeLengthX(0);
      setSwipeLengthY(0);
      // console.log("SWIPER NO SWIPING!");
    },
    [swiping]
  );

  const mountSwipe = useCallback((el?: string) => {

    if (el) {
      document.getElementById(el)?.addEventListener("touchstart", touchStartHandler, { passive: false });
      document.getElementById(el)?.addEventListener("touchmove", touchMoveHandler, { passive: false });
      document.getElementById(el)?.addEventListener("touchend", touchEndHandler, { passive: false });
      document.getElementById(el)?.addEventListener("touchcancel", touchCancel, { passive: false });
      document.getElementById(el)?.addEventListener("mousedown", mouseDownHandler, { passive: false });
      document.getElementById(el)?.addEventListener("mousemove", mouseMoveHandler, { passive: false });
      document.getElementById(el)?.addEventListener("mouseup", mouseUpHandler, { passive: false });
      document.getElementById(el)?.addEventListener("mouseleave", mouseCancel, { passive: false });
    } else {
      document.addEventListener("touchstart", touchStartHandler, { passive: false });
      document.addEventListener("touchmove", touchMoveHandler, { passive: false });
      document.addEventListener("touchend", touchEndHandler, { passive: false });
      document.addEventListener("touchcancel", touchCancel, { passive: false });
      document.addEventListener("mousedown", mouseDownHandler, { passive: false });
      document.addEventListener("mousemove", mouseMoveHandler, { passive: false });
      document.addEventListener("mouseup", mouseUpHandler, { passive: false });
      document.addEventListener("mouseleave", mouseCancel, { passive: false });
    }
  }, []);

  const unmountSwipe = useCallback((el?: string) => {
    if (el) {
      document.getElementById(el)?.removeEventListener("touchstart", touchStartHandler);
      document.getElementById(el)?.removeEventListener("touchmove", touchMoveHandler);
      document.getElementById(el)?.removeEventListener("touchend", touchEndHandler);
      document.getElementById(el)?.removeEventListener("touchcancel", touchCancel);
      document.getElementById(el)?.removeEventListener("mousedown", mouseDownHandler);
      document.getElementById(el)?.removeEventListener("mousemove", mouseMoveHandler);
      document.getElementById(el)?.removeEventListener("mouseup", mouseUpHandler);
      document.getElementById(el)?.removeEventListener("mouseleave", mouseCancel);
    } else {
      document.removeEventListener("touchstart", touchStartHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
      document.removeEventListener("touchcancel", touchCancel);
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mouseleave", mouseCancel);
    }
  }, []);

  return {
    swipeStatus: lifecycle,
    mountSwipe: mountSwipe, //use for applicable component mounting
    unmountSwipe: unmountSwipe, //use for applied component unmounting
    startPoint: startPoint, //can use for desired logic, with x and y property
    endPoint: endPoint, //can use for desired logic, with x and y property
    swiping: swiping, //simple boolean value
    horizontalSwipe: swipeLengthX, //measure of the distance along x-axis
    verticalSwipe: swipeLengthY, //measure of the distance along y-axis
  };
};

export default useSwipe;
