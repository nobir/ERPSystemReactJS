import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="container-fluid bg-success p-3">
            <div className="row">
                <div className="col-12 text-center">
                    <p className="text-white mb-0">
                        <span className="text-white">
                            {new Date().getFullYear()} &copy; Copyright by{" "}
                            <strong>
                                <Link
                                    to="/about"
                                    className="list-group-item d-inline text-dark rounded p-1"
                                >
                                    Group 08
                                </Link>
                            </strong>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
