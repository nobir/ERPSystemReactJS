import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function ViewBranches() {
    const { setSuccessMessage } = useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();
    usePageTitle("View Categories");

    const [search, setSearch] = useState({
        search_value: "",
        search_by: "id",
    });

    const [branches, setBranches] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 0,
        per_page: 0,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const featchUsers = (pageNumber = 1) => {
        setIsLoading(true);
        Axios.get(`${ROUTES.viewBranches}/?page=${pageNumber}`)
            .then((response) => {
                // debugger;
                setPagination(response.data.branches);
                setBranches(response.data.branches.data);
                setIsLoading(false);
            })
            .catch((error) => {
                debugger;
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
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

        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        // debugger;
        Axios.post(`${ROUTES.viewBranches}/?page=${pageNumber}`, search)
            .then((response) => {
                console.log(response);
                // debugger;
                setPagination(response.data.branches);
                setBranches(response.data.branches.data);
                setIsLoading(false);
                setSuccessMessage(response.data.success_message);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }

                setIsLoading(false);
            });
    };

    const handleFormWithPaginationSubmit = (pageNumber) => {
        setSuccessMessage();
        setErrorMessage();

        setIsLoading(true);

        // debugger;
        Axios.post(`${ROUTES.viewBranches}/?page=${pageNumber}`, search)
            .then((response) => {
                console.log(response);
                // debugger;
                setPagination(response.data.branches);
                setBranches(response.data.branches.data);
                setIsLoading(false);
                setSuccessMessage(response.data.success_message);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }

                setIsLoading(false);
            });
    };

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch({ ...search, [e.target.name]: e.target.value.trim() });
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
                            value={search.search_value}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="search_by"
                            value={search.search_by}
                            onChange={handleSearchChange}
                        >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="local_address">Local Address</option>
                            <option value="police_station">
                                Police Station
                            </option>
                            <option value="city">City</option>
                            <option value="country">Country</option>
                            <option value="zip_code">Zip Code</option>
                            <option value="country">Country</option>
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches && branches.length > 0
                            ? branches.map((branch, index) => (
                                  <tr key={index}>
                                      <td>{branch.id}</td>
                                      <td>{branch.name}</td>
                                      <td>
                                          {branch.address.local_address},{" "}
                                          {branch.address.police_station},{" "}
                                          {branch.address.city},{" "}
                                          {branch.address.country},{" "}
                                          {branch.address.zip_code}
                                      </td>
                                      <td>
                                          {/* <Link
                                              to={ROUTES.editUser.replace(
                                                  ":id",
                                                  branch.id
                                              )}
                                              className="btn btn-primary"
                                          >
                                              Edit
                                          </Link> */}
                                          <Link
                                              to={ROUTES.deleteBranch.replace(
                                                  ":id",
                                                  branch.id
                                              )}
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
                        if (
                            search.search_by.length === 0 ||
                            search.search_value.length === 0
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

export default ViewBranches;
