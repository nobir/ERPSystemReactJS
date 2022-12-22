import { useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function AddBranch() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Add Branch");

    const {
        formState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({
        name: "",
        local_address: "",
        police_station: "",
        city: "",
        country: "",
        zip_code: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.addBranch, formState)
            .then((response) => {
                // console.log(response);
                // debugger;
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
            id="create-branch-form"
            action=""
            method="post"
            className="needs-validation"
            onSubmit={handleFormSubmit}
        >
            <div className="row mb-3 has-validation">
                <label htmlFor="name" className="col-sm-3 col-form-label">
                    Name
                </label>
                <div className="col-sm-9">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className={
                            "form-control" +
                            (formValidationError?.name?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.name}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.name?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.name[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label
                    htmlFor="local_address"
                    className="col-sm-3 col-form-label"
                >
                    Local Address
                </label>
                <div className="col-sm-9">
                    <input
                        id="local_address"
                        type="text"
                        name="local_address"
                        className={
                            "form-control" +
                            (formValidationError?.local_address?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.local_address}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.local_address?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError.local_address[0]}
                            </strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label
                    htmlFor="police_station"
                    className="col-sm-3 col-form-label"
                >
                    Police Station
                </label>
                <div className="col-sm-9">
                    <input
                        id="police_station"
                        type="text"
                        name="police_station"
                        className={
                            "form-control" +
                            (formValidationError?.police_station?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.police_station}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.police_station?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError.police_station[0]}
                            </strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="city" className="col-sm-3 col-form-label">
                    City
                </label>
                <div className="col-sm-9">
                    <input
                        id="city"
                        type="text"
                        name="city"
                        className={
                            "form-control" +
                            (formValidationError?.city?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.city}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.city?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.city[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="country" className="col-sm-3 col-form-label">
                    Country
                </label>
                <div className="col-sm-9">
                    <input
                        id="country"
                        type="text"
                        name="country"
                        className={
                            "form-control" +
                            (formValidationError?.country?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.country}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.country?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.country[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="zip_code" className="col-sm-3 col-form-label">
                    Zip Code
                </label>
                <div className="col-sm-9">
                    <input
                        id="zip_code"
                        type="text"
                        name="zip_code"
                        className={
                            "form-control" +
                            (formValidationError?.zip_code?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.zip_code}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.zip_code?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.zip_code[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        id="create-branch-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        Create
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddBranch;
