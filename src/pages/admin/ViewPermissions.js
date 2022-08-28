import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import useFormState from "../../hooks/useFormState";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function ViewPermissions() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("View Permissions");

    const { formState, setFormValidationError, handleInputChange } =
        useFormState({
            search_value: "",
        });

    const [permissions, setPermissions] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 0,
        per_page: 0,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const featchUsers = (pageNumber = 1) => {
        setIsLoading(true);
        Axios.get(`${ROUTES.viewPermissions}/?page=${pageNumber}`)
            .then((response) => {
                // debugger;
                setPagination(response.data.permissions);
                setPermissions(response.data.permissions.data);
                setIsLoading(false);
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
    };

    useEffect(() => {
        featchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        // debugger;
        Axios.post(ROUTES.viewPermissions, formState)
            .then((response) => {
                console.log(response);
                // debugger;
                setPagination(response.data.permissions);
                setPermissions(response.data.permissions.data);
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

    const handleFormWithPaginationSubmit = (pageNumber) => {
        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        // debugger;
        Axios.post(`${ROUTES.viewPermissions}/?page=${pageNumber}`, formState)
            .then((response) => {
                console.log(response);
                // debugger;
                setPagination(response.data.permissions);
                setPermissions(response.data.permissions.data);
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
        <>
            <form
                action=""
                method="post"
                className="row need-validation"
                onSubmit={handleFormSubmit}
            >
                <div className="col-md-6">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="search_value"
                            placeholder="Search"
                            value={formState.search_value}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Search"
                            className="form-control btn btn-primary"
                        />
                    </div>
                </div>
            </form>
            <div className="table-responsive w-100">
                <table className="table table-success table-striped min-width-400px">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Permission</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions && permissions.length > 0
                            ? permissions.map((permission, index) => (
                                  <tr key={index}>
                                      <td>{permission?.name}</td>
                                      <td>
                                          {permission?.invoice_add
                                              ? "Invoice Add, "
                                              : ""}
                                          {permission?.invoice_manage
                                              ? "Invoice Manage, "
                                              : ""}
                                          {permission?.inventory_manage
                                              ? "Inventory Manage, "
                                              : ""}
                                          {permission?.category_manage
                                              ? "Category Manage, "
                                              : ""}
                                          {permission?.station_manage
                                              ? "Region/Branch Manage, "
                                              : ""}
                                          {permission?.operation_manage
                                              ? "Operation Manage, "
                                              : ""}
                                          {permission?.user_manage
                                              ? "User Manage, "
                                              : ""}
                                          {permission?.permission_manage
                                              ? "Permission Manage, "
                                              : ""}
                                      </td>
                                      <td>
                                          <Link
                                              to={ROUTES.editPermission.replace(":id", permission.id)}
                                              className="btn btn-primary"
                                          >
                                              Edit
                                          </Link>
                                          <Link
                                              to={ROUTES.deletePermission.replace(":id", permission.id)}
                                              id="delete-btn"
                                              className="btn btn-danger delete-btn"
                                          >
                                              Delete
                                          </Link>
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <Pagination
                    activePage={
                        pagination?.current_page ? pagination?.current_page : 0
                    }
                    itemsCountPerPage={
                        pagination?.per_page ? pagination?.per_page : 0
                    }
                    totalItemsCount={pagination?.total ? pagination?.total : 0}
                    onChange={(pageNumber) => {
                        if (formState.search_value.length === 0) {
                            featchUsers(pageNumber);
                        } else {
                            handleFormWithPaginationSubmit(pageNumber);
                        }
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="<<"
                    lastPageText=">>"
                />
            </div>
        </>
    );
}

export default ViewPermissions;
