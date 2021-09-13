import { MouseEvent, useRef } from "react";
import { IItem, IScrollYSlideX, ISlideInfo } from "../../../types";
import ShoppingItem from "../ShoppingList/ShoppingItem";
import VerticalSpacer from "../VerticalSpacer";
import StyledScrollYSlidex from "./style";
import {v4 as uuidv4} from "uuid";

const ScrollYSlideX = ({items, ids, expandedId, editItem, updateIds, deleteMany, singleClick, doubleClick, deleteSingle, sliding}: IScrollYSlideX) => {
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
    
    const slideInfoInit : ISlideInfo = {
        mouseDown: false,
        initX: 0,
        initY: 0,
        item: null,
        itemWidth: 0,
        topLeftX: 0,
        slideX: false,
        slideY: false,
        speed: null,
        initialDirection: Direction.LEFT
      };

      const slideInfo = useRef({...slideInfoInit});
    
    const onMouseDown = (e: MouseEvent, id: string) => {
        if (e.buttons !== 1) return;
        if ((id === undefined) || (id === "")) return;
        const item = document.getElementById(id);
        item!.style.transitionDuration = "0s";
        const itemWidth = item!.getBoundingClientRect().width;
        const initX = e.clientX;
        const initY = e.clientY;
        slideInfo.current = {...slideInfoInit, mouseDown: true, item, itemWidth, initX, initY};
    }

    const onMouseUp = (e: MouseEvent, id: string) => {
        if (!slideInfo.current.mouseDown) return;
        clearTimeout(timer!);
        const offset =
          (Math.abs(slideInfo.current.item.getBoundingClientRect().x - slideInfo.current.topLeftX) /
            slideInfo.current.itemWidth) *
          100;
        if (offset > 40 && speed <= -300) {
            deleteAnimation(calculateOffset(e), slideInfo.current.itemWidth);
            slideInfo.current = {...slideInfo.current, mouseDown: false};
            setTimeout(()=>{
                deleteSingle(slideInfo.current.item.id);
                slideInfo.current = {...slideInfoInit};
                sliding.current = false;
            }, 500);
            return;
        }
    
        if (slideInfo.current.item) {
          slideInfo.current.item.style.transitionDuration = "500ms";
          slideInfo.current.item.style.transform = "translateX(0px)";
        }

        slideInfo.current = {...slideInfoInit};
        previousX = 0;
        currentX = 0;
    }

    const onMouseMove = (e: MouseEvent, id: string) => {
        if (!slideInfo.current.mouseDown) return;
        if (slideInfo.current.slideY) return;
        if (slideInfo.current.slideX) return slide(e);
  
        const x = slideInfo.current.initX - e.clientX;
        const xAbs = Math.abs(slideInfo.current.initX - e.clientX);
        const yAbs = Math.abs(slideInfo.current.initY - e.clientY);

        if (xAbs > 10 && yAbs < 10) {
            const initialDirection = calculateDirection(x);
            sliding.current = true;
            slideInfo.current= { ...slideInfo.current, slideX: true, initialDirection };
        }

        if (xAbs < 10 && yAbs > 10) {
          slideInfo.current = {...slideInfo.current, slideY: true};
        }
    }

    const onTouchStart = (e: React.TouchEvent, id: string) => {
        if ((id === undefined) || (id === "")) return;
        const item = document.getElementById(id);
        item!.style.transitionDuration = "0s";
        const itemWidth = item!.getBoundingClientRect().width;
        const initX = e.touches[0].clientX;
        const initY = e.touches[0].clientY;

        slideInfo.current = {...slideInfoInit, mouseDown: true, item, itemWidth, initX, initY};
    }

    const onTouchEnd = (e: React.TouchEvent, id: string) => {
        if (!slideInfo.current.mouseDown) return;
        clearTimeout(timer!);
        const offset =
          (Math.abs(slideInfo.current.item.getBoundingClientRect().x - slideInfo.current.topLeftX) /
            slideInfo.current.itemWidth) *
          100;
    
        if (offset > 40 && speed <= -300) {
            deleteAnimation(calculateOffset(e), slideInfo.current.itemWidth);
            slideInfo.current = {...slideInfo.current, mouseDown: false};
            setTimeout(()=>{
                deleteSingle(slideInfo.current.item.id);
                slideInfo.current = {...slideInfoInit};
                sliding.current = false;
            }, 500);
            return;
        }
    
        if (slideInfo.current.item) {
          slideInfo.current.item.style.transitionDuration = "500ms";
          slideInfo.current.item.style.transform = "translateX(0px)";
        }

        slideInfo.current = {...slideInfoInit};
    }
    //if multiple fingers (touches.length > 1) stop?
    const onTouchMove = (e: React.TouchEvent, id: string) => {
        if (!slideInfo.current.mouseDown) return;
        if (slideInfo.current.slideY) return;
        if (slideInfo.current.slideX) return slide(e);
  
        const x = slideInfo.current.initX - e.touches[0].clientX;
        const xAbs = Math.abs(slideInfo.current.initX - e.touches[0].clientX);
        const yAbs = Math.abs(slideInfo.current.initY - e.touches[0].clientY);

        if (xAbs > 10 && yAbs < 10) {
          const initialDirection = calculateDirection(x);
          sliding.current = true;
          slideInfo.current= { ...slideInfo.current, slideX: true, initialDirection };
        }

        if (xAbs < 10 && yAbs > 10) {
          slideInfo.current = {...slideInfo.current, slideY: true};
        }
    }

    const slide = (e:any) => {
        calculateSpeed(e);
        changeOpacity(e);
        const offset = calculateOffset(e);
        slideInfo.current.item.style.transform = `translateX(${offset}px)`;
    };

    const calculateSpeed = (e:any) => {
        if (currentX === 0) {
          if(e.type === 'touchmove')
            previousX = e.touches[0].clientX;
          else
            previousX = e.clientX;
        }
        if(e.type === 'touchmove')
            currentX = e.touches[0].clientX;
        else
            currentX = e.clientX;
        // currentX = e.clientX;
        currentXtime = Date.now();
        if (previousX - currentX > 10) {
          const dX = currentX - previousX;
          const dT = (currentXtime - previousXtime) / 1000;
          speed = dX / dT;
          previousX = currentX;
          previousXtime = currentXtime;
          clearTimeout(timer!);
          timer = setTimeout(() => {
            speed = 0;
            previousX = currentX;
            previousXtime = currentXtime;
          }, 1000);
        }
      };

    const deleteAnimation = (offset: number, width: number) => {
        const time = ((-width - offset) / speed) * 1000;
        slideInfo.current.item.style.transitionDuration = `${time}ms`;
        slideInfo.current.item.style.transform = `translateX(${-width}px)`;
      };
    
    const calculateOffset = (e:any) => {
      let _clientX = 0;
      if (e.type === 'touchmove') _clientX = e.touches[0].clientX;
      else if (e.type === 'touchend') _clientX = currentX;
      else _clientX = e.clientX;
      let offset = _clientX - slideInfo.current.initX;
      if (slideInfo.current.initialDirection === Direction.LEFT) offset += 10;
      else offset -= 10;
      return offset;
    };
  
    const changeOpacity = (e:any) => {
      if (slideInfo.current.initialDirection === Direction.LEFT) {
        let init = slideInfo.current.initX;
        if (e.type === 'touchmove') init -= e.touches[0].clientX;
        else init -= e.clientX;
        
        let res = Math.round(init / 10);
        res = res > 20 ? 20 : res;
        slideInfo.current.item.parentNode.children[1].style.opacity = `${res * 0.05}`;
      }
    };
  
    const calculateDirection = (x: number) => {
      const direction = x < 0 ? Direction.RIGHT : Direction.LEFT;
      return direction;
    };

    return (
        <StyledScrollYSlidex>
            {items && items.map((item: IItem) => {
                return(
                    <>
                        <div 
                            key={uuidv4()} 
                            onMouseDown={(e)=>onMouseDown(e, item._id!)}
                            onMouseUp={(e)=>onMouseUp(e, item._id!)}
                            onMouseMove={(e)=>onMouseMove(e, item._id!)}
                            onTouchStart={(e)=>onTouchStart(e, item._id!)}
                            onTouchEnd={(e)=>onTouchEnd(e, item._id!)}
                            onTouchMove={(e)=>onTouchMove(e, item._id!)}
                        >
                            <ShoppingItem key={uuidv4()} >
                                <ShoppingItem.Card 
                                    key={uuidv4()} 
                                    id={item._id}
                                    item={item} 
                                    toDelete={ids.includes(item._id!)} 
                                    editItem={editItem} 
                                    updateIds={updateIds} 
                                    deleteMany={deleteMany} 
                                    expandItem={item._id === expandedId ? true : false}
                                    singleClick={singleClick} 
                                    doubleClick={doubleClick}/>
                                </ShoppingItem>
                        </div>
                        <VerticalSpacer key={uuidv4()} smallSpacer/>
                    </>
                );
            })}
        </StyledScrollYSlidex>
    );
}

export default ScrollYSlideX;
