import { useState, useEffect } from "react";

const useisKeyPressed = () => {
    // get the initial state
    const [focus, setFocus] = useState(false);
    useEffect(() => {
        // helper functions to update the status
        // const onFocus = () => setFocus(true);
        // const onBlur = () => setFocus(false);
        const onKeyPress = ()=>setFocus(prev=>!prev)
        // assign the listener
        // update the status on the event
        // window.addEventListener("focus", onFocus);
        // window.addEventListener("blur", onBlur);

        window.addEventListener("keyup", onKeyPress);
        // window.addEventListener("keypress", onKeyPress);
        // window.addEventListener("keydown", log);

        // remove the listener
        return () => {
            // window.removeEventListener("focus", onFocus);
            // window.removeEventListener("blur", onBlur);
            window.removeEventListener("keyup", onKeyPress);
            // window.addEventListener("keypress",onKeyPress);
        };
    }, []);

    // return the status
    return focus;
};

export default useisKeyPressed