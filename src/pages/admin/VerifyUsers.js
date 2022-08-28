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

function VerifyUsers() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("Verify Users");

    const { formState, setFormValidationError, handleInputChange } =
        useFormState({
            search_value: "",
            search_by: "id",
        });

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 0,
        per_page: 0,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const featchUsers = (pageNumber = 1) => {
        setIsLoading(true);
        Axios.get(`${ROUTES.verifyUsers}/?page=${pageNumber}`)
            .then((response) => {
                // debugger;
                setPagination(response.data.users);
                setUsers(response.data.users.data);
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

    const handleFormSubmit = (e, pageNumber) => {
        e.preventDefault();

        setFormValidationError({});
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        // debugger;
        Axios.post(`${ROUTES.verifyUsers}/?page=${pageNumber}`, formState)
            .then((response) => {
                console.log(response);
                // debugger;
                setPagination(response.data.users);
                setUsers(response.data.users.data);
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
        Axios.post(`${ROUTES.verifyUsers}/?page=${pageNumber}`, formState)
            .then((response) => {
                console.log(response);
                // debugger;
                setPagination(response.data.users);
                setUsers(response.data.users.data);
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
                        <select
                            className="form-control"
                            name="search_by"
                            // defaultValue={formState.search_by}
                            value={formState.search_by}
                            onChange={handleInputChange}
                        >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="username">Username</option>
                            <option value="email">Email</option>
                            <option value="local_address">Local Address</option>
                            <option value="police_station">
                                Police Station
                            </option>
                            <option value="city">City</option>
                            <option value="country">Country</option>
                            <option value="zip_code">Zip Code</option>
                            <option value="country">Country</option>
                            <option value="station">Station Name</option>
                            <option value="permission">Permission Name</option>
                        </select>
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Salary</th>
                            <th>Hire Date</th>
                            <th>Address</th>
                            <th>Station Name</th>
                            <th>Permission Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0
                            ? users.map((user, index) => (
                                  <tr key={index}>
                                      <td>{user.name}</td>
                                      <td>{user.username}</td>
                                      <td>{user.email}</td>
                                      <td>{user.status}</td>
                                      <td>{user.salary}</td>
                                      <td>{user.hire_date}</td>
                                      <td>
                                          {user.addresslocal_address},{" "}
                                          {user.address.police_station},{" "}
                                          {user.address.city},{" "}
                                          {user.address.country},{" "}
                                          {user.address.zip_code}
                                      </td>
                                      <td>
                                          {user.branch
                                              ? user.branch.name
                                              : user.region
                                              ? user.region.name
                                              : ""}
                                      </td>
                                      <td>
                                          {user.permissions.map(
                                              (permission, index) => (
                                                  <span key={index}>
                                                      {permission.name + ", "}
                                                  </span>
                                              )
                                          )}
                                      </td>
                                      <td>
                                          <Link
                                              to={ROUTES.editUser.replace(
                                                  ":id",
                                                  user.id
                                              )}
                                              className="btn btn-primary"
                                          >
                                              Edit
                                          </Link>
                                          <Link
                                              to={ROUTES.deleteUser.replace(
                                                  ":id",
                                                  user.id
                                              )}
                                              id="delete-btn"
                                              className="btn btn-danger delete-btn"
                                          >
                                              Delete
                                          </Link>
                                          <Link
                                              to={ROUTES.verifyUserId.replace(
                                                  ":id",
                                                  user.id
                                              )}
                                              className="btn btn-success"
                                          >
                                              Verify
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
                        if (
                            formState.search_by.length === 0 ||
                            formState.search_value.length === 0
                        ) {
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

export default VerifyUsers;
