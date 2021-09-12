import React, { MouseEvent } from "react"

const ScrollHandler = ({children}:{children: HTMLDivElement | JSX.Element}) => {

    const touchStart = (evt: React.TouchEvent) => {
        // console.log(evt.target);
        window.addEventListener("touchmove", handleMove);
    }

    const touchEnd = (evt: React.TouchEvent) => {
        console.log("END");
        window.removeEventListener("touchmove", handleMove);
    }

    const mouseUp = (evt: MouseEvent) => {
        // console.log("UP", evt.target);
    }

    const mouseDown = (evt: MouseEvent) => {
        // console.log("Mouse Down");
    }

    // const direction = () => {return {direction: "Vertical", x, y}}???

    return (
        <div onTouchStart={(e) => touchStart(e)} onTouchEnd={(e)=>touchEnd(e)} onMouseDown={mouseDown} onMouseUp={mouseUp}>
            {children}
        </div>
    )
}

const handleMove = (e:any) => {
    console.log("X",e.touches[0].clientX);
    console.log("Y",e.touches[0].clientY);
}

export default ScrollHandler;