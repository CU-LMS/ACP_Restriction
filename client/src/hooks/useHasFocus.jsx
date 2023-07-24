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
        const onSnippetPressedNew = (e) => {
            if (e.metaKey) {
                console.log("snippet pressed")
                setFocus(false)
            }
        }
        const onSnippetPressedNewTwo = (e) => {
            if (e.keyCode == 44) {
                setFocus(false)
            }
        }
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        window.addEventListener('keydown', onSnippetPressedNew)
        window.addEventListener('keydown', onSnippetPressed);
        window.addEventListener('keyup', onSnippetPressedNewTwo);

        // remove the listener
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
            window.removeEventListener('keydown', onSnippetPressed);
            window.removeEventListener('keydown',onSnippetPressedNew)
            window.removeEventListener('keyup',onSnippetPressedNewTwo)
        };
    }, []);

    // return the status
    return focus;
};

export default useHasFocus