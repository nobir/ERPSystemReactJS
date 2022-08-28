import Loading from "../../components/Loading";
import { ROUTES } from "../../app/Routes";
import React, { useEffect, useState } from "react";
import Axios from "../../app/AxiosConfig";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";
import useErrorMessage from "../../hooks/useErrorMessage";

function ViewProfile() {
    const { setErrorMessage } = useErrorMessage();
    useSuccessMessage();
    usePageTitle("View Profile");

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.post("/dashboard/profile/", {})
            .then((response) => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                // console.log(error.response);
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }
            });
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-block">
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4 w-100">
                        <img
                            src={
                                user.avatar
                                    ? `${ROUTES.baseUrl}${user.avatar}`
                                    : `${ROUTES.baseUrl}images/default-user-avatar.png`
                            }
                            className="img-thumbnail rounded mx-auto d-block"
                            alt={user.name}
                        />
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Name</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{user.name}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Username</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{user.username}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Email</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{user.email}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Salary</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{"$" + user.salary}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Post</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">
                            {user.type === 0
                                ? "System Admin"
                                : user.type === 1
                                ? "CEO"
                                : user.type === 2
                                ? "Manager"
                                : user.type === 3
                                ? "Employee"
                                : user.type === 4
                                ? "Receptionist"
                                : null}
                        </span>
                    </div>
                </div>
            </li>
            {user.region || user.branch ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">
                                {user.region ? "Region" : "Branch"}
                            </span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {user.region
                                    ? user.region.name
                                    : user.branch.name}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Permissions</span>
                    </div>
                    <div className="col-md-9">
                        {user?.permissions?.map((permission, i) => (
                            <span key={i} className="text-dark">
                                {permission.name}
                            </span>
                        ))}
                    </div>
                </div>
            </li>
            {user?.address?.local_address ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Local Address</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {user.address.local_address}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {user?.address?.police_station ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Police Station</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {user.address.police_station}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {user?.address?.city ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">City</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {user.address.city}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {user?.address?.country ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Country</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {user.address.country}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {user?.address?.zip_code ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Zip Code</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {user.address.zip_code}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
        </ul>
    );
}

export default ViewProfile;
