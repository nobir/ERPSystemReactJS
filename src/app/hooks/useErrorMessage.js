import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../../App";

function useErrorMessage(initialState = "") {
    const { globalState, dispatchGlobalState } = useContext(GlobalStateContext);

    const errorMessage = globalState.errorMessage;

    function setErrorMessage(msg = "") {
        dispatchGlobalState({ type: "ERROR_MESSAGE", errorMessage: msg });
    }

    useEffect(() => {
        setErrorMessage(initialState);
        return () => {
            setErrorMessage("");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { errorMessage, setErrorMessage };
}

export default useErrorMessage;
