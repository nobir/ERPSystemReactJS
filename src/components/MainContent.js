import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Auth from "./Auth";
import NoAuth from "../components/NoAuth";
import useAuth from "../hooks/useAuth";
import ViewProfile from "../pages/dashboard/ViewProfile";
import EditProfile from "../pages/dashboard/EditProfile";
import ChangeProfilePic from "../pages/dashboard/ChangeProfilePic";
import ChangePassword from "../pages/dashboard/ChangePassword";
import Logout from "../pages/dashboard/Logout";
import { ROUTES } from "../app/Routes";

function MainContent() {
    const { isAuth, user } = useAuth();
    let routeList = null;
    let adminList = null;
    let managerList = null;
    let branchmanagerList = null;
    let employeeList = null;

    if (isAuth) {
        routeList = (
            <>
                <Route
                    path={ROUTES.dashboard}
                    element={
                        <Auth>
                            <Dashboard />
                        </Auth>
                    }
                />
                <Route
                    path={ROUTES.viewProfile}
                    element={
                        <Auth>
                            <ViewProfile />
                        </Auth>
                    }
                />
                <Route
                    path={ROUTES.editProfile}
                    element={
                        <Auth>
                            <EditProfile />
                        </Auth>
                    }
                />
                <Route
                    path={ROUTES.changeProfilePic}
                    element={
                        <Auth>
                            <ChangeProfilePic />
                        </Auth>
                    }
                />
                <Route
                    path={ROUTES.changePassword}
                    element={
                        <Auth>
                            <ChangePassword />
                        </Auth>
                    }
                />
                <Route
                    path={ROUTES.logout}
                    element={
                        <>
                            <Auth>
                                <Logout />
                            </Auth>
                        </>
                    }
                />
            </>
        );

        // Need to define all the routes
        if (isAuth && user.type <= 1) {
            adminList = <></>;
        } else if (isAuth && user.type === 2) {
            managerList = <></>;
        } else if (isAuth && user.type === 3) {
            branchmanagerList = <></>;
        } else if (isAuth && user.type === 3) {
            employeeList = <></>;
        }
    }

    return (
        <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route
                path={ROUTES.login}
                element={
                    <NoAuth>
                        <Login />
                    </NoAuth>
                }
            />
            {routeList}
            {adminList}
            {managerList}
            {branchmanagerList}
            {employeeList}
            <Route path={ROUTES.notFound} element={<NotFound />} />
        </Routes>
    );
}

export default MainContent;
