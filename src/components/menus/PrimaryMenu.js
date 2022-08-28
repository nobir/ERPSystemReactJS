import { Link } from "react-router-dom";
import { ROUTES } from "../../app/Routes";
import useAuth from "../../hooks/useAuth";

function PrimaryMenu() {
    const withoutLoggedInMenu = [
        {
            title: "Home",
            path: ROUTES.home,
        },
        {
            title: "About",
            path: ROUTES.about,
        },
        {
            title: "Login",
            path: ROUTES.login,
        },
    ];

    const withLoggedInMenu = [
        {
            title: "Dashboard",
            path: ROUTES.dashboard,
        },
        {
            title: "View Profile",
            path: ROUTES.viewProfile,
        },
        {
            title: "Edit Profile",
            path: ROUTES.editProfile,
        },
        {
            title: "Change Profile Picture",
            path: ROUTES.changeProfilePic,
        },
        {
            title: "Change Password",
            path: ROUTES.changePassword,
        },
        {
            title: "Logout",
            path: "/logout",
        },
    ];

    let menu = null;

    const { isAuth } = useAuth();

    // console.log(token);

    if (isAuth) {
        menu = withLoggedInMenu.map((m, i) => (
            <li key={i} className="list-group m-1">
                <Link
                    to={m.path}
                    className="nav-link list-group-item text-dark rounded"
                >
                    {m.title}
                </Link>
            </li>
        ));
    } else {
        menu = withoutLoggedInMenu.map((m, i) => (
            <li key={i} className="list-group m-1">
                <Link
                    to={m.path}
                    className="nav-link list-group-item text-dark rounded"
                >
                    {m.title}
                </Link>
            </li>
        ));
    }

    return (
        <ul className="nav d-flex flex-column w-100 h-100 flex-md-row justify-content-md-end align-items-md-center">
            {menu}
        </ul>
    );
}

export default PrimaryMenu;
