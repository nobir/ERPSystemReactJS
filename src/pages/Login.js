import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import AxiosConfig from "../app/AxiosConfig";
import useErrorMessage from "../hooks/useErrorMessage";
import useSuccessMessage from "../hooks/useSuccessMessage";
import useFormValidationError from "../hooks/useFormValidationError";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../app/Routes";

function Login() {
    useSuccessMessage();
    usePageTitle("Login");
    const { setErrorMessage } = useErrorMessage();

    const navigate = useNavigate();
    const { formError, setFormError } = useFormValidationError({});
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });


    const handleLoginInputChange = (e) => {
        e.preventDefault();
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        // console.dir(e.target.email.value, "Submit");

        /**
         * Needs to submit to the server by axios
         */

        setFormError({});

        AxiosConfig.post("/login", loginForm)
            .then((response) => {
                // console.log(JSON.stringify(response.data.user));
                // return;
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem("token", response.data.token);

                navigate(ROUTES.dashboard);
            })
            .catch((error) => {
                // console.log(error);
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 422) {
                    setFormError(error.response.data.error_list);
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }
            });
    };

    return (
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
                            (formError?.email?.length > 0 ? " is-invalid" : "")
                        }
                        placeholder="sasuke@uchiha.com"
                        value={loginForm.email}
                        onChange={handleLoginInputChange}
                    />

                    {formError?.email?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formError.email[0]}</strong>
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
                            (formError?.password?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={loginForm.password}
                        onChange={handleLoginInputChange}
                    />

                    {formError?.password?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formError.password[0]}</strong>
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
