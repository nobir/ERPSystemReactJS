import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes";

function useIsNotLoggedIn() {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        let user = JSON.parse(localStorage.getItem("user"));

        if (!(token && token !== null && user && user !== null)) {
            navigate(ROUTES.login);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default useIsNotLoggedIn;
