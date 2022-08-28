import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import useErrorMessage from "../../hooks/useErrorMessage";

function DeletePermission() {
    const { setErrorMessage } = useErrorMessage();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        Axios.post(ROUTES.deletePermission.replace(":id", id), { id })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    navigate(ROUTES.viewPermissions);
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

export default DeletePermission;
