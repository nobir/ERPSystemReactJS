import axios from "axios";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "./Routes";

const Axios = axios.create({
    baseURL: ROUTES.baseApiUrl,
});

Axios.interceptors.request.use(
    (config) => {
        // do something before send the request
        const { user, token } = useAuth();

        config.headers.authorized = token && token.length > 0 ? token : "";
        config.headers.auth_id = user && user.id ? user.id : 0;

        // console.log("Request: ", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        // do something before revieve the response

        // console.log("Response: ", response);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;
