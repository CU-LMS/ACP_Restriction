import { useState, useEffect } from "react";

const useHasFocus = () => {
    // get the initial state
    const [focus, setFocus] = useState(document.hasFocus());
    useEffect(() => {
        // helper functions to update the status
        const onFocus = () => setFocus(true);
        const onBlur = () => setFocus(false);

        const onSnippetPressed = (e) => {
            if (e.shiftKey && e.metaKey) {
                console.log("snippet pressed")
                setFocus(false)
            }
        }
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);

     


        window.addEventListener('keydown', onSnippetPressed);

        // remove the listener
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
            window.removeEventListener('keydown', onSnippetPressed);
        };
    }, []);

    // return the status
    return focus;
};

export default useHasFocus