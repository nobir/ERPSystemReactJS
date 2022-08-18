import axios from "axios";
// import { ROUTES } from "./Routes";

const Axios = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
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
