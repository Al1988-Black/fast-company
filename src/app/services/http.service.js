import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import authService from "./auth.service";
import localStoradgeService from "./localStoradge. service";

const http = axios.create({
    baseURL: configFile.apiEndPoint
});
// axios.defaults.baseURL = configFile.apiEndPoint;
http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const expiresDate = localStoradgeService.getTokenExpiresDate();
            const refreshToken = localStoradgeService.getRefreshKey();
            if (refreshToken && expiresDate < Date.now()) {
                const data = authService.refresh();
                console.log(data);
                localStoradgeService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accesToken = localStoradgeService.getAccessToken();
            if (accesToken) {
                config.params = { ...config.params, auth: accesToken };
            }
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
function tranformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data;
}
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: tranformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpServece = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};
export default httpServece;
