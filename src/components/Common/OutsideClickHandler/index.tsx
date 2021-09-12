import { useEffect, useRef } from "react";

const OutsideClickHandler = ({children} : {children: React.ReactElement | HTMLElement}) => {
    const ref = useRef<any>(null);
    useEffect(() => {
        console.log("useRef changed");

        function handleClickOutside(event: MouseEvent) {
            console.log("OUTSIDE");
            console.log(ref!.current);
            if (ref.current !== null && ref.current && !ref.current.contains(event.target)) {
              alert("You clicked outside of me!");
            }
          }
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref]);

    //ADD A PROP FOR ADDING A OUTSIDE / INSIDE CLICK HANDLERS.

    return(
        <div ref={ref} style={{height: "100%", width:"100%"}}>
            {children}
        </div>
    );
}

export default OutsideClickHandler;