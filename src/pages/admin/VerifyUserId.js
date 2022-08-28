import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import useErrorMessage from "../../hooks/useErrorMessage";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function VerifyUserId() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        Axios.post(ROUTES.verifyUserId.replace(":id", id), { id })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setSuccessMessage(response.data.success_message);
                    navigate(ROUTES.verifyUsers);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <></>;
}

export default VerifyUserId;
