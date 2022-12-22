import { useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function AddCategory() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Add Category");

    const {
        formState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({
        name: "",
        details: "",
        cost_price: "",
        sell_price: "",
        discount: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.addCategory, formState)
            .then((response) => {
                console.log(response);
                // debugger;
                setSuccessMessage(response.data.success_message);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
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
            id="create-category-form"
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
                <label htmlFor="name" className="col-sm-3 col-form-label">
                    Details
                </label>
                <div className="col-sm-9">
                    <input
                        id="details"
                        type="text"
                        name="details"
                        className={
                            "form-control" +
                            (formValidationError?.details?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.details}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.details?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.details[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="cost_price" className="col-sm-3 col-form-label">
                    Cost Price
                </label>
                <div className="col-sm-9">
                    <input
                        id="cost_price"
                        type="text"
                        name="cost_price"
                        className={
                            "form-control" +
                            (formValidationError?.cost_price?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.cost_price}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.cost_price?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.cost_price[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="sell_price" className="col-sm-3 col-form-label">
                    Sell Price
                </label>
                <div className="col-sm-9">
                    <input
                        id="sell_price"
                        type="text"
                        name="sell_price"
                        className={
                            "form-control" +
                            (formValidationError?.sell_price?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.sell_price}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.sell_price?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.sell_price[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="discount" className="col-sm-3 col-form-label">
                    Sell discount
                </label>
                <div className="col-sm-9">
                    <input
                        id="discount"
                        type="text"
                        name="discount"
                        className={
                            "form-control" +
                            (formValidationError?.discount?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.discount}
                        onChange={handleInputChange}
                    />

                    {formValidationError?.discount?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.discount[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        id="create-category-btn"
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

export default AddCategory;
