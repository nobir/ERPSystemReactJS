import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../App";

function useSuccessMessage(initialState = "") {
    const { globalState, dispatchGlobalState } = useContext(GlobalStateContext);

    const successMessage = globalState.successMessage;

    function setSuccessMessage(msg = "") {
        dispatchGlobalState({ type: "SUCCESS_MESSAGE", successMessage: msg });
    }

    useEffect(() => {
        setSuccessMessage(initialState);
        return () => {
            setSuccessMessage("");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { successMessage, setSuccessMessage };
}

export default useSuccessMessage;
