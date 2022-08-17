import axios from "axios";
import { ROUTES } from "./Routes";

const Axios = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

Axios.interceptors.request.use(
    (config) => {
        // do something before send the request
        // console.log("sending request");
        switch (config.url) {
            case ROUTES.home:
            case ROUTES.about:
                break;
            case ROUTES.login:
                if (
                    localStorage.getItem("token") &&
                    localStorage.getItem("token")
                ) {
                    window.location = ROUTES.dashboard;
                }

                break;

            default:
                break;
        }
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
