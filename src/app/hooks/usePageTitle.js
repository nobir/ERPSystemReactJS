import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../../App";

function usePageTitle(pageTitle) {
    const { dispatchGlobalState } = useContext(GlobalStateContext);
    useEffect(() => {
        dispatchGlobalState({ type: "PAGE_TITLE", pageTitle});

        return () => {
            dispatchGlobalState({ type: "PAGE_TITLE", pageTitle: "" });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default usePageTitle;
