import { useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function ChangePassword() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Change Password");

    const {
        formState,
        setFormState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({ currentpass: "", newpass: "", retypepass: "" });

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.changePassword, formState)
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
            id="change-password-form"
            action=""
            method="post"
            className="needs-validation"
            onSubmit={handleFormSubmit}
        >
            <div className="row mb-3 has-validation">
                <label
                    htmlFor="currentpass"
                    className="col-sm-3 col-form-label"
                >
                    Current Password
                </label>
                <div className="col-sm-9">
                    <input
                        id="currentpass"
                        type="password"
                        name="currentpass"
                        className={
                            "form-control" +
                            (formValidationError?.currentpass?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.currentpass}
                        onChange={handleInputChange}
                    />
                    {formValidationError?.currentpass?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError.currentpass[0]}
                            </strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="newpass" className="col-sm-3 col-form-label">
                    New Password
                </label>
                <div className="col-sm-9">
                    <input
                        id="newpass"
                        type="password"
                        name="newpass"
                        className={
                            "form-control" +
                            (formValidationError?.newpass?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.newpass}
                        onChange={handleInputChange}
                    />
                    {formValidationError?.newpass?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.newpass[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="retypepass" className="col-sm-3 col-form-label">
                    Retype Password
                </label>
                <div className="col-sm-9">
                    <input
                        id="retypepass"
                        type="password"
                        name="retypepass"
                        className={
                            "form-control" +
                            (formValidationError?.retypepass?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.retypepass}
                        onChange={handleInputChange}
                    />
                    {formValidationError?.retypepass?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.retypepass[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <div className="col-sm-3 mb-3 text-sm-end">
                    <button
                        id="reset-btn"
                        type="reset"
                        className="btn btn-success"
                        onClick={(e) => {
                            e.preventDefault();

                            setFormState({
                                currentpass: "",
                                newpass: "",
                                retypepass: "",
                            });
                        }}
                    >
                        Reset
                    </button>
                </div>
                <div className="col-sm-3 mb-3 text-sm-start">
                    <button
                        id="change-password-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        Change
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ChangePassword;
