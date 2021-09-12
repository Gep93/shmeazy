import { useRef } from "react";
import { ISlideInfo } from "../../../types";
import { initializeDraggableItem } from "./bl";

const useScrollYSlideX = ({slideInfoInit} : {slideInfoInit: ISlideInfo}) => {
    const slideInfo = useRef({...slideInfoInit});
    const sliding = useRef(false);
    
    const handleMouseDown = (e: MouseEvent, id: string) => {
        const initializedDraggableItem = initializeDraggableItem(e, id);
        slideInfo.current = {...initializedDraggableItem!};
    }

    const handleMouseUp = (e: MouseEvent, id: string) => {

        slideInfo.current = {...slideInfoInit};
    }
}