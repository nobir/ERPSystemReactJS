import { useEffect, useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function EditProfile() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Edit User");

    const {
        formState,
        setFormState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({
        name: "",
        email: "",
        username: "",
        type: "",
        salary: "",
        hire_date: "",
        address: {
            city: "",
            country: "",
            local_address: "",
            police_station: "",
            zip_code: "",
        },
        permission_ids: [],
    });

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const userType = ["CEO", "Manager", "Employee", "Receptionist"];

    useEffect(() => {
        setIsLoading(true);
        Axios.get(ROUTES.editProfile)
            .then((response) => {
                // debugger;
                setUser(response.data.user);
                // setPermissions(response.data.permissions);
                let _users = response.data.user;
                _users.permission_ids = response.data.permission_ids;
                setPermissions(response.data.permissions);
                setFormState(_users);
                setIsLoading(false);
                // debugger;
            })
            .catch((error) => {
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddressInputChage = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            address: { ...formState.address, [e.target.name]: e.target.value },
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        Axios.post(ROUTES.editProfile, formState)
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
            id="edit-profile-form"
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
                        placeholder="e.g John Doe"
                    />

                    {formValidationError?.name?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.name[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="username" className="col-sm-3 col-form-label">
                    Username
                </label>
                <div className="col-sm-9">
                    <input
                        readOnly
                        id="username"
                        type="text"
                        name="username"
                        className={
                            "form-control" +
                            (formValidationError?.username?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.username}
                        onChange={handleInputChange}
                        placeholder="e.g john"
                    />

                    {formValidationError?.username?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.username[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="row mb-3 has-validation">
                <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                </label>
                <div className="col-sm-9">
                    <input
                        readOnly
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
                        placeholder="e.g john@gmail.com"
                    />

                    {formValidationError?.email?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>{formValidationError.email[0]}</strong>
                        </span>
                    ) : null}
                </div>
            </div>

            {user && user?.type <= 1 ? (
                <>
                    <div className="row mb-3 has-validation">
                        <label
                            htmlFor="salary"
                            className="col-sm-3 col-form-label"
                        >
                            Salary
                        </label>
                        <div className="col-sm-9">
                            <input
                                id="salary"
                                type="text"
                                name="salary"
                                className={
                                    "form-control" +
                                    (formValidationError?.salary?.length > 0
                                        ? " is-invalid"
                                        : "")
                                }
                                value={formState.salary}
                                onChange={handleInputChange}
                                placeholder="e.g 80000"
                            />

                            {formValidationError?.salary?.length > 0 ? (
                                <span className="invalid-feedback" role="alert">
                                    <strong>
                                        {formValidationError.salary[0]}
                                    </strong>
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="row mb-3 has-validation">
                        <label
                            htmlFor="type"
                            className="col-sm-3 col-form-label"
                        >
                            User Type
                        </label>
                        <div className="col-sm-9">
                            <select
                                id="type"
                                name="type"
                                className={
                                    "form-control" +
                                    (formValidationError?.type?.length > 0
                                        ? " is-invalid"
                                        : "")
                                }
                                value={formState.type}
                                onChange={handleInputChange}
                            >
                                <option value="">None</option>
                                {userType.map((utype, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {utype}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3 has-validation">
                        <label
                            htmlFor="hire_date"
                            className="col-sm-3 col-form-label"
                        >
                            Hire Date
                        </label>
                        <div className="col-sm-9">
                            <input
                                id="hire_date"
                                type="date"
                                name="hire_date"
                                className={
                                    "form-control" +
                                    (formValidationError?.hire_date?.length > 0
                                        ? " is-invalid"
                                        : "")
                                }
                                value={formState.hire_date}
                                onChange={handleInputChange}
                            />

                            {formValidationError?.hire_date?.length > 0 ? (
                                <span className="invalid-feedback" role="alert">
                                    <strong>
                                        {formValidationError.hire_date[0]}
                                    </strong>
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="row mb-3 has-validation">
                        <label
                            htmlFor="permission_id"
                            className="col-sm-3 col-form-label"
                        >
                            Permissions
                        </label>
                        <div className="col-sm-8 mb-2">
                            <select
                                id="permission_ids"
                                name="permission_ids"
                                className="form-control"
                                multiple={true}
                                value={formState.permission_ids}
                                onChange={handleInputChange}
                            >
                                {permissions?.map((permission) => (
                                    <option
                                        key={permission.id}
                                        value={permission.id}
                                    >
                                        {permission.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </>
            ) : null}
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
                            (formValidationError?.address?.local_address
                                ?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.address.local_address}
                        onChange={handleAddressInputChage}
                        placeholder="e.g Kuratoli"
                    />

                    {formValidationError?.address?.local_address?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError?.address?.local_address[0]}
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
                            (formValidationError?.address?.police_station
                                ?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.address.police_station}
                        onChange={handleAddressInputChage}
                        placeholder="e.g Vatara"
                    />

                    {formValidationError?.address?.police_station?.length >
                    0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {
                                    formValidationError?.address
                                        ?.police_station[0]
                                }
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
                            (formValidationError?.address?.city?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.address.city}
                        onChange={handleAddressInputChage}
                        placeholder="e.g Dhaka"
                    />

                    {formValidationError?.address?.city?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError?.address?.city[0]}
                            </strong>
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
                            (formValidationError?.address?.country?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.address.country}
                        onChange={handleAddressInputChage}
                        placeholder="e.g Bangladesh"
                    />

                    {formValidationError?.address?.country?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError?.address?.country[0]}
                            </strong>
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
                            (formValidationError?.address?.zip_code?.length > 0
                                ? " is-invalid"
                                : "")
                        }
                        value={formState.address.zip_code}
                        onChange={handleAddressInputChage}
                        placeholder="e.g 1230"
                    />

                    {formValidationError?.address?.zip_code?.length > 0 ? (
                        <span className="invalid-feedback" role="alert">
                            <strong>
                                {formValidationError?.address?.zip_code[0]}
                            </strong>
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        id="edit-user-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default EditProfile;
