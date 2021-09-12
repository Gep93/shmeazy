
const useClickType = () => {
    const delay = 300;
    let clickPromise : Promise<string>;
    let clicks = 0;
    // if user holds item for too long, the click is not valid.
    const handleClick = async () => {
        clicks++;
        if(clicks===1) {
            clickPromise = createClickPromise();
            return clickPromise;
        }
        return false;
    }
    
    const createClickPromise = () : Promise<string> => {
        return new Promise((res, rej)=>{
            setTimeout(() => {
                switch(clicks) {
                    case 1:
                        res("SingleClick");
                        break;
                    case 2:
                        res("DoubleClick");
                        break;
                    default:
                        res("None");
                }
                clicks = 0;
            }, delay)
        })
    }

    return handleClick;
}

export default useClickType;