import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "./Routes";
import useAuth from "./hooks/useAuth";

function NoAuth({ children }) {
    let { isAuth } = useAuth();
    let location = useLocation();

    if (isAuth) {
        return (
            <Navigate to={ROUTES.dashboard} state={{ from: location }} replace />
        );
    } else {
        return children;
    }
}

export default NoAuth;
