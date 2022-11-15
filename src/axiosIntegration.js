import axios from "axios"

export const publicUrl = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});

export const privateUrl = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});

export const gpConnectPublicUrl = axios.create({
    baseURL: import.meta.env.VITE_GP_CONNECT_URL
});


export const gpConnectPrivateUrl = axios.create({
    baseURL: import.meta.env.VITE_GP_CONNECT_URL
});

export const biDirectionalPublicUrl = axios.create({
    baseURL: import.meta.env.VITE_BI_DIRECTIONAL_MESSAGE_URL
});
export const biDirectionalPrivateUrl = axios.create({
    baseURL: import.meta.env.VITE_BI_DIRECTIONAL_MESSAGE_URL
});
// configure baseURL
// privateUrl.defaults.baseURL = config.baseUrl
// publicUrl.defaults.baseURL  =  config.baseURL

//define request interceptors

privateUrl.interceptors.request.use(request => {
    const accessToken = localStorage.getItem("token");
    request.headers['Authorization'] = 'Bearer'.concat(' ', accessToken);
    return request;
}, function (error) {
    return Promise.reject(error);
});
privateUrl.interceptors.response.use(response => {
    return Promise.resolve(response);
}, (error) => {
    return Promise.reject(error);
})

//================== this interceptors is use for gps connect profile ======================//
gpConnectPrivateUrl.interceptors.request.use(request => {
    const gpConnectAccessToken = localStorage.getItem("gp-connect-token");
    // console.log("access_token",access_token)
    request.headers['Authorization'] = 'Bearer'.concat(' ', gpConnectAccessToken);
    return request;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
gpConnectPrivateUrl.interceptors.response.use(response => {
    return Promise.resolve(response);
}, (error) => {
    return Promise.reject(error);
})
//================================================//
//================== this interceptors is use for gps connect profile ======================//
biDirectionalPrivateUrl.interceptors.request.use(request => {
    const biDirectionalAccessToken = localStorage.getItem("bi-directional-token");
    // console.log("access_token",access_token)
    request.headers['Authorization'] = 'Bearer'.concat(' ', biDirectionalAccessToken);
    return request;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
biDirectionalPrivateUrl.interceptors.response.use(response => {
    return Promise.resolve(response);
}, (error) => {
    return Promise.reject(error);
})
//================================================//