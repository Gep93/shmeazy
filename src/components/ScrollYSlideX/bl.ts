import { MutableRefObject } from "react";
import { _ISlideInfo } from "../../../types";

let speed = 0;
let previousX = 0;
let previousXtime = 0;
let currentX = 0;
let currentXtime = 0;
let timer: null | ReturnType<typeof setTimeout> = null;

const Direction = {
    LEFT: 0,
    RIGHT: 1
  };


const slideInfoInit : _ISlideInfo = {
    mouseDown: false,
    initX: 0,
    initY: 0,
    item: null,
    itemWidth: 0,
    topLeftX: 0,
    slideX: false,
    slideY: false,
    speed: null,
    initialDirection: Direction.LEFT,
    sliding: false
  };

let _slideInfo: any;
let _e: any;

  export const initializeDraggableItem = (e: MouseEvent, id: string) => {
    _e = e;
    if (e.buttons !== 1) return;
    if ((id === undefined) || (id === "")) return;

    const item = document.getElementById(id);
    item!.style.transitionDuration = "0s";
    const x = item!.getBoundingClientRect().x;
    const itemWidth = item!.getBoundingClientRect().width;
    const initX = e.clientX;
    const initY = e.clientY;

    const initializedDraggableItem = {...slideInfoInit, mouseDown: true, item, itemWidth, initX, initY};
    return initializedDraggableItem;
  }

  export const clearDraggableItem = (e: MouseEvent, slideInfo: MutableRefObject<_ISlideInfo>) => {
    _slideInfo = slideInfo;
    _e = e;
    console.log("item up",_slideInfo.current);
    if (!_slideInfo.current.mouseDown) return;
    // clearTimeout(timer!);
    const offset = getItemOffset();

    // if (offset > 40 && speed <= -300) {
    //   console.log("in");
    //     deleteAnimation(calculateOffset(e), _slideInfo.current.itemWidth);
    //     _slideInfo.current = {..._slideInfo.current, mouseDown: false};
    //     setTimeout(()=>{
    //         // deleteSingle(_slideInfo.current.item.id);
    //         _slideInfo.current = {...slideInfoInit};
    //         // sliding();
    //         _slideInfo.sliding = false;
    //     }, 500);
    //     return;
    // }

    animateToInitialPosition(_slideInfo);

    _slideInfo.current = {...slideInfoInit};
    setTimeout(() => {
      console.log("item", _slideInfo.current.item);
    }, 500);
  }

  export const animateToInitialPosition = (slideInfo: MutableRefObject<_ISlideInfo>) => {
    if (_slideInfo.current.item) {
        _slideInfo.current.item.style.transitionDuration = "500ms";
        _slideInfo.current.item.style.transform = "translateX(0px)";
      }
  }

  export const deleteAnimation = (offset: number, width: number) => {
    const time = ((-width - offset) / speed) * 1000;
    _slideInfo.current.item.style.transitionDuration = `${time}ms`;
    _slideInfo.current.item.style.transform = `translateX(${-width}px)`;
  };

  export const calculateOffset = (e:any) => {
    let _clientX = 0;
    if(e.type === 'touchmove')
      _clientX = e.touches[0].clientX;
    else
      _clientX = e.clientX;
    let offset = _clientX - _slideInfo.current.initX;
    // let offset = e.clientX - slideInfo.current.initX;
    if (_slideInfo.current.initialDirection === Direction.LEFT) offset += 10;
    else offset -= 10;
    return offset;
  };

  const calculateSpeed = (e:any) => {
    if (currentX === 0) {
        if(e.type === 'touchmove')
        previousX = e.touches[0].clientX;
        else
        previousX = e.clientX;
        return;
    }
    if(e.type === 'touchmove')
        currentX = e.touches[0].clientX;
    else
        currentX = e.clientX;
    // currentX = e.clientX;
    currentXtime = Date.now();
    if (previousX - currentX > 10) {
      const deltaX = currentX - previousX;
      const deltaT = (currentXtime - previousXtime) / 1000;
      speed = deltaX / deltaT;
      previousX = currentX;
      previousXtime = currentXtime;
      clearTimeout(timer!);
      timer = setTimeout(() => {
        speed = 0;
        previousX = currentX;
        previousXtime = currentXtime;
        console.log("TIMEOUT");
      }, 1000);
    }
  };

  const getItemOffset = () => {
    const offset = (Math.abs(_slideInfo.current.item.getBoundingClientRect().x - _slideInfo.current.topLeftX) /
    _slideInfo.current.itemWidth) * 100;
    return offset;
  }

  const doDeleteItem = (offset: number, speed: number) => {
    if (offset > 40 && speed <= -300) {
          deleteAnimation(calculateOffset(_e), _slideInfo.current.itemWidth);
          _slideInfo.current = {..._slideInfo.current, mouseDown: false};
          setTimeout(()=>{
              // deleteSingle(_slideInfo.current.item.id);
              _slideInfo.current = {...slideInfoInit};
              // sliding();
              _slideInfo.sliding = false;
          }, 500);
          return;
      }
  }

  export default slideInfoInit;