import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// 1. Axios Request Interceptor: Attach JWT Bearer Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ai_search_token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Axios Response Interceptor: Capture Expired/Invalid 401 Tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check for 401 Unauthorized status
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized API request caught. Clearing session.");
            
            // Clear local credentials
            localStorage.removeItem("ai_search_token");
            localStorage.removeItem("ai_search_user");

            // Redirect user to login view
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;