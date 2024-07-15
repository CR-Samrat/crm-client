import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) =>{
    const token = localStorage.getItem("AuthToken");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default axiosInstance;