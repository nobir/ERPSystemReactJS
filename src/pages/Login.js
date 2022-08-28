import usePageTitle from "../hooks/usePageTitle";
import Axios from "../app/AxiosConfig";
import useErrorMessage from "../hooks/useErrorMessage";
import useSuccessMessage from "../hooks/useSuccessMessage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../app/Routes";
import useFormState from "../hooks/useFormState";
import { useState } from "react";
import Loading from "../components/Loading";

function Login() {
    useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Login");

    const navigate = useNavigate();
    const {
        formState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({ email: "", password: "" });

    const [isLoading, setIsLoading] = useState(false);

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.login, formState)
            .then((response) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem("token", response.data.token);

                setIsLoading(false);
                navigate(ROUTES.dashboard);
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
            id="login-form"
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
                        placeholder="sasuke@uchiha.com"
                        value={formState.email}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.email?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.email[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="password" className="col-sm-3 col-form-label">
                    Password
                </label>
                <div className="col-sm-9">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className={
                            "form-control" +
                            (formValidationError?.password?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.password}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.password?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.password[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        id="login-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;
