import axios from "axios";
import { ROUTES } from "./Routes";

const Axios = axios.create({
    baseURL: ROUTES.baseApiUrl,
});

Axios.interceptors.request.use(
    (config) => {
        // do something before send the request
        // console.log("sending request");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        // do something before revieve the response
        // console.log("receiveing response");
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;
