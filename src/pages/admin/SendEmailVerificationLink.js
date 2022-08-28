import { useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function SendEmailVerificationLink() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Change Password");

    const {
        formState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({ email: "" });

    const [isLoading, setIsLoading] = useState(false);

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.sendEmailVerificationLink, formState)
            .then((response) => {
                // console.log(response);
                setIsLoading(false);
                setSuccessMessage(response.data.success_message);
            })
            .catch((error) => {
                // console.log(error);
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 422) {
                    setFormValidationError(error.response.data.error_list);
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }

                setIsLoading(false);
            });
    };

    return isLoading ? (
        <Loading />
    ) : (
        <form
            id="send-verify-link-form"
            action=""
            method="post"
            className="needs-validation"
            onSubmit={handleLoginFormSubmit}
        >
            <div className="row mb-3 has-validation">
                <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                </label>
                <div className="col-sm-9">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        className={
                            "form-control" +
                            (formValidationError?.email?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="e.g sasuke@uchiha.com"
                    />
                    {formValidationError?.email?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.email[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        id="send-verify-link-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SendEmailVerificationLink;
