import { useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function AddPermission() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Add Permission");

    const {
        formState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({
        name: "",
        invoice_add: false,
        invoice_manage: false,
        inventory_manage: false,
        category_manage: false,
        station_manage: false,
        operation_manage: false,
        user_manage: false,
        permission_mange: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.addPermission, formState)
            .then((response) => {
                console.log(response);
                // debugger;
                setIsLoading(false);
                setSuccessMessage(response.data.success_message);
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
            id="create-permission-form"
            action=""
            method="post"
            className="needs-validation"
            onSubmit={handleFormSubmit}
        >
            <div className="row mb-3 has-validation">
                <label htmlFor="name" className="col-sm-3 col-form-label">
                    Permission Name
                </label>
                <div className="col-sm-9">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="e.g Admin"
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
            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-3 pt-0">
                    Permission:
                </legend>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="invoice_add"
                            type="checkbox"
                            name="invoice_add"
                            className="form-check-input"
                            checked={formState.invoice_add}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="invoice_add"
                            className="form-check-label"
                        >
                            Invoice Add
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="invoice_manage"
                            type="checkbox"
                            name="invoice_manage"
                            className="form-check-input"
                            checked={formState.invoice_manage}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="invoice_manage"
                            className="form-check-label"
                        >
                            Invoice Manage
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="inventory_manage"
                            type="checkbox"
                            name="inventory_manage"
                            className="form-check-input"
                            checked={formState.inventory_manage}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="inventory_manage"
                            className="form-check-label"
                        >
                            Inventory Manage
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="category_manage"
                            type="checkbox"
                            name="category_manage"
                            className="form-check-input"
                            checked={formState.category_manage}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="category_manage"
                            className="form-check-label"
                        >
                            Category Manage
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="station_manage"
                            type="checkbox"
                            name="station_manage"
                            className="form-check-input"
                            checked={formState.station_manage}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="station_manage"
                            className="form-check-label"
                        >
                            Station Manage
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="operation_manage"
                            type="checkbox"
                            name="operation_manage"
                            className="form-check-input"
                            checked={formState.operation_manage}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="operation_manage"
                            className="form-check-label"
                        >
                            Operation Manage
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="user_manage"
                            type="checkbox"
                            name="user_manage"
                            className="form-check-input"
                            checked={formState.user_manage}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="user_manage"
                            className="form-check-label"
                        >
                            User Manage
                        </label>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input
                            id="permission_mange"
                            type="checkbox"
                            name="permission_mange"
                            className="form-check-input"
                            checked={formState.permission_mange}
                            onChange={handleInputChange}
                        />
                        <label
                            htmlFor="permission_mange"
                            className="form-check-label"
                        >
                            Permission Manage
                        </label>
                    </div>
                </div>
            </fieldset>

            <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        id="create-permission-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddPermission;
