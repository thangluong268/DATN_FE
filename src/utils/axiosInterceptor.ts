import axios from 'axios';

// Tạo một instance Axios tùy chỉnh
const axiosInstance = axios.create();

// // Thêm interceptor cho request
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return error.response
});


export default axiosInstance;