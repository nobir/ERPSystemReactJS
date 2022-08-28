import { useState } from "react";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function ChangeProfilePic() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Change Profile Picture");

    const {
        formState,
        formValidationError,
        setFormValidationError,
        handleInputChange,
    } = useFormState({ avatar: {} });

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setErrorMessage();

        setIsLoading(true);

        const formData = new FormData();

        if (formState.avatar && formState.avatar.name) {
            formData.append("avatar", formState.avatar, formState.avatar.name);
        }

        console.log(formState, formData);

        Axios.post(ROUTES.changeProfilePic, formData)
            .then((response) => {
                // console.log(response);
                setSuccessMessage(response.data.success_message);
                setIsLoading(false);
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
            action=""
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
        >
            <div className="card text-center">
                <div className="card-body">
                    <div className="row mb-3 has-validation">
                        <label
                            htmlFor="avatar"
                            className="col-sm-3 col-form-label"
                        >
                            Avatar
                        </label>
                        <div className="col-sm-9">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    className={
                                        "custom-file-input form-control" +
                                        (formValidationError?.avatar?.length > 0
                                            ? " is-invalid"
                                            : "")
                                    }
                                    onChange={handleInputChange}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="avatar"
                                >
                                    Choose file
                                </label>

                                {formValidationError?.avatar?.length > 0 ? (
                                    <span
                                        className="invalid-feedback"
                                        role="alert"
                                    >
                                        <strong>
                                            {formValidationError.avatar[0]}
                                        </strong>
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-9 offset-sm-3">
                            <button
                                id="avatar-upload-btn"
                                type="submit"
                                className="btn btn-success"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                {/* @if (Session::has('user') && Session::get('user')->avatar)
            <div className="card-footer">
                <img src="{{ url(Session::get('user')->avatar) }}" className="img-thumbnail rounded mx-auto d-block" alt="{{ Session::get('user')->name }}">
            </div>
        @endif */}
            </div>
        </form>
    );
}

export default ChangeProfilePic;
