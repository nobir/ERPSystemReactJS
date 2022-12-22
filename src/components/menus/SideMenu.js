import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../app/Routes";

function SideMenu() {
    const { isAuth, user } = useAuth();
    const adminMenu = [
        {
            title: "Verify Users",
            path: ROUTES.verifyUsers,
        },
        {
            title: "View Users",
            path: ROUTES.viewUsers,
        },
        {
            title: "View Permissions",
            path: ROUTES.viewPermissions,
        },
        {
            title: "Add User",
            path: ROUTES.addUser,
        },
        {
            title: "Add Permission",
            path: ROUTES.addPermission,
        },
        {
            title: "Popular Category",
            path: ROUTES.viewStatistic,
        },
        {
            title: "Send Email Verification Link",
            path: ROUTES.sendEmailVerificationLink,
        },
    ];

    const managerMenu = [
        {
            title: "View Employees",
            path: ROUTES.viewEmployees,
        },
        {
            title: "View Categories",
            path: ROUTES.viewCategories,
        },
        {
            title: "View Branches",
            path: ROUTES.viewBranches,
        },
        {
            title: "Add Employee",
            path: ROUTES.addEmployee,
        },
        {
            title: "Add Category",
            path: ROUTES.addCategory,
        },
        {
            title: "Add Branch",
            path: ROUTES.addBranch,
        },
    ];

    const branchManagerMenu = {};

    const employeeMenu = {};

    let menu = null;

    if (isAuth && user.type <= 1) {
        menu = adminMenu.map((m, i) => (
            <Link
                key={i}
                to={m.path}
                className="list-group-item list-group-item-action"
            >
                {m.title}
            </Link>
        ));
    } else if (isAuth && user.type === 2) {
        menu = managerMenu.map((m, i) => (
            <Link
                key={i}
                to={m.path}
                className="list-group-item list-group-item-action"
            >
                {m.title}
            </Link>
        ));
    } else if (isAuth && user.type === 3) {
        menu = branchManagerMenu.map((m, i) => (
            <Link
                key={i}
                to={m.path}
                className="list-group-item list-group-item-action"
            >
                {m.title}
            </Link>
        ));
    } else if (isAuth && user.type === 3) {
        menu = employeeMenu.map((m, i) => (
            <Link
                key={i}
                to={m.path}
                className="list-group-item list-group-item-action"
            >
                {m.title}
            </Link>
        ));
    }

    return <div className="animate-100 d-md-block list-group mb-3">{menu}</div>;
}

export default SideMenu;
