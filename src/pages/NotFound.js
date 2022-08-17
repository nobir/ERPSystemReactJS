import { Link } from "react-router-dom";
import useErrorMessage from "../hooks/useErrorMessage";
import usePageTitle from "../hooks/usePageTitle";
import useSuccessMessage from "../hooks/useSuccessMessage";

function NotFound() {
    useErrorMessage();
    useSuccessMessage();
    usePageTitle("Not Found");

    return (
        <div className="text-center">
            <h2>
                404- Not Found <br />
                <small>
                    Go back to{" "}
                    <strong>
                        <Link to="/">Home</Link>
                    </strong>
                </small>
            </h2>
        </div>
    );
}

export default NotFound;
