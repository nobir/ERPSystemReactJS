import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../app/Routes";
import React, { useEffect, useState } from "react";
import Axios from "../../app/AxiosConfig";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";
import useErrorMessage from "../../hooks/useErrorMessage";

function ViewProfile() {
    useErrorMessage();
    useSuccessMessage();
    usePageTitle("View Profile");

    const { user, token } = useAuth();
    const [_user, _setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Axios.post("/dashboard/profile/", {
            auth_id: user.id,
            token: token,
        })
            .then((response) => {
                _setUser(response.data);
                setIsLoading(false);
                // console.log(_user);
            })
            .catch((error) => {
                console.log(error.response);
            });
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return isLoading ? (
        <h1 className="text-center">Loading ...</h1>
    ) : (
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-block">
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4 w-100">
                        <img
                            src={
                                _user.avatar
                                    ? `${ROUTES.baseUrl}images/${_user.avatar}`
                                    : `${ROUTES.baseUrl}images/default-user-avatar.png`
                            }
                            className="img-thumbnail rounded mx-auto d-block"
                            alt={_user.name}
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
                        <span className="text-dark">{_user.name}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Username</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{_user.username}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Email</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{_user.email}</span>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        <span className="text-dark">Salary</span>
                    </div>
                    <div className="col-md-9">
                        <span className="text-dark">{"$" + _user.salary}</span>
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
                            {_user.type === 0
                                ? "System Admin"
                                : _user.type === 1
                                ? "CEO"
                                : _user.type === 2
                                ? "Manager"
                                : _user.type === 3
                                ? "Employee"
                                : _user.type === 4
                                ? "Receptionist"
                                : null}
                        </span>
                    </div>
                </div>
            </li>
            {_user.region || _user.branch ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">
                                {_user.region ? "Region" : "Branch"}
                            </span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {_user.region
                                    ? _user.region.name
                                    : _user.branch.name}
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
                        {_user?.permissions?.map((permission, i) => (
                            <span key={i} className="text-dark">
                                {permission.name}
                            </span>
                        ))}
                    </div>
                </div>
            </li>
            {_user?.address?.local_address ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Local Address</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {_user.address.local_address}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {_user?.address?.police_station ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Police Station</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {_user.address.police_station}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {_user?.address?.city ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">City</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {_user.address.city}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {_user?.address?.country ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Country</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {_user.address.country}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
            {_user?.address?.zip_code ? (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <span className="text-dark">Zip Code</span>
                        </div>
                        <div className="col-md-9">
                            <span className="text-dark">
                                {_user.address.zip_code}
                            </span>
                        </div>
                    </div>
                </li>
            ) : null}
        </ul>
    );
}

export default ViewProfile;
