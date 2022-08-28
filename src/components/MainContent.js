import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Auth from "./Auth";
import NoAuth from "./NoAuth";
import useAuth from "../hooks/useAuth";
import ViewProfile from "../pages/dashboard/ViewProfile";
import EditProfile from "../pages/dashboard/EditProfile";
import ChangeProfilePic from "../pages/dashboard/ChangeProfilePic";
import ChangePassword from "../pages/dashboard/ChangePassword";
import Logout from "../pages/dashboard/Logout";
import AddUser from "../pages/admin/AddUser";
import VerifyUsers from "../pages/admin/VerifyUsers";
import VerifyUserId from "../pages/admin/VerifyUserId";
import ViewUsers from "../pages/admin/ViewUsers";
import ViewPermissions from "../pages/admin/ViewPermissions";
import AddPermission from "../pages/admin/AddPermission";
import DeleteUser from "../pages/admin/DeleteUser";
import DeletePermission from "../pages/admin/DeletePermission";
import SendEmailVerificationLink from "../pages/admin/SendEmailVerificationLink";
import { ROUTES } from "../app/Routes";
import CategoryStatistic from "../pages/admin/CategoryStatistic";
import EditPermission from "../pages/admin/EditPermission";
import UnverifyUserId from "../pages/admin/UnverifyUserId";

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
            adminList = (
                <>
                    <Route
                        path={ROUTES.verifyUsers}
                        element={
                            <Auth>
                                <VerifyUsers />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.viewUsers}
                        element={
                            <Auth>
                                <ViewUsers />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.verifyUserId}
                        element={
                            <Auth>
                                <VerifyUserId />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.unVerifyUserId}
                        element={
                            <Auth>
                                <UnverifyUserId />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.deleteUser}
                        element={
                            <Auth>
                                <DeleteUser />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.viewPermissions}
                        element={
                            <Auth>
                                <ViewPermissions />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.addUser}
                        element={
                            <Auth>
                                <AddUser />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.addPermission}
                        element={
                            <Auth>
                                <AddPermission />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.editPermission}
                        element={
                            <Auth>
                                <EditPermission />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.deleteUser}
                        element={
                            <Auth>
                                <DeleteUser />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.deletePermission}
                        element={
                            <Auth>
                                <DeletePermission />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.sendEmailVerificationLink}
                        element={
                            <Auth>
                                <SendEmailVerificationLink />
                            </Auth>
                        }
                    />
                    <Route
                        path={ROUTES.viewStatistic}
                        element={
                            <Auth>
                                <CategoryStatistic />
                            </Auth>
                        }
                    />
                </>
            );
        } else if (isAuth && user.type === 2) {
            managerList = <></>;
        } else if (isAuth && user.type === 3) {
            branchmanagerList = <></>;
        } else if (isAuth && user.type === 4) {
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
