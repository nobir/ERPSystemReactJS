import { Link } from "react-router-dom";
import useAuth from "../app/hooks/useAuth";
import { ROUTES } from "../app/Routes";
import PrimaryMenu from "../components/menus/PrimaryMenu";

function Header() {
    const { user, token } = useAuth();

    return (
        <header
            className={
                (token ? "d-lg-block" : "d-md-block") +
                " container-fluid bg-success p-3"
            }
        >
            <div className="row">
                <div className="col-12 col-md-3 text-center text-md-start">
                    <Link
                        to={ROUTES.home}
                        className="navbar-brand-md h2 text-decoration-none text-white"
                    >
                        <i className="bi bi-life-preserver text-white display-5"></i>
                    </Link>
                    {user && token ? (
                        <div>
                            <span className="text-white fs-6">
                                Logged in&nbsp;
                                <Link
                                    to={ROUTES.viewProfile}
                                    className="badge badge-danger"
                                >
                                    {user.username}
                                </Link>
                                &nbsp;as&nbsp;
                                {user.type === 0
                                    ? "System Admin"
                                    : user.type === 1
                                    ? "CEO"
                                    : user.type === 2
                                    ? "Manager"
                                    : user.type === 3
                                    ? "Employee"
                                    : user.type === 4
                                    ? "Receptionist"
                                    : ""}
                            </span>
                        </div>
                    ) : null}
                </div>
                <div className="col-12 col-md-9 d-flex justify-content-center align-items-center">
                    <PrimaryMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
