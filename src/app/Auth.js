import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "./Routes";
import useAuth from "./hooks/useAuth";

function Auth({ children }) {
    let { isAuth } = useAuth();
    let location = useLocation();

    if (!isAuth) {
        return (
            <Navigate to={ROUTES.login} state={{ from: location }} replace />
        );
    } else {
        return children;
    }
}

export default Auth;
