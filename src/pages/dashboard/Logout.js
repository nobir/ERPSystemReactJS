import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/Routes";
import Axios from "../../app/AxiosConfig";
import useAuth from "../../hooks/useAuth";
import useErrorMessage from "../../hooks/useErrorMessage";

function Logout() {
    const { setErrorMessage } = useErrorMessage();

    const navigate = useNavigate();
    const { user, token } = useAuth();
    // console.log(user.id, token);

    useEffect(() => {
        console.log("logout");
        Axios.post(ROUTES.logout, { id: user.id, token })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    localStorage.clear();
                    navigate(ROUTES.login);
                }
            })
            .catch((error) => {
                // console.log(error);
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }
            });
        return () => {
            return null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}

export default Logout;
