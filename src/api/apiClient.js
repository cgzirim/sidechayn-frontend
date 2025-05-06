import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
  removeCookie,
} from "./tokenManagement.js";

// const baseURL = "http://127.0.0.1:8000/v1";
const baseURL = "https://sidechayn-backend-jwkbt.ondigitalocean.app/v1";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshSent = false;

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if error is due to expired access token
    if (
      error.response?.status === 401 ||
      (error.response?.data?.code === "token_not_valid" && !isRefreshSent)
    ) {
      try {
        const refreshToken = getRefreshToken();

        if (refreshToken && !isRefreshSent) {
          isRefreshSent = true;

          // Refresh access token
          const refreshResponse = await apiClient.post(
            "/users/auth/token/refresh/",
            {
              refresh: refreshToken,
            }
          );

          // Get stored expiration times
          const oldAT = localStorage.getItem("oldAT");
          const oldRT = localStorage.getItem("oldRT");

          if (oldAT && oldRT) {
            setTokens({
              access: refreshResponse.data.access || "",
              refresh: refreshResponse.data.refresh || "",
              access_expiration:
                new Date(
                  new Date(oldAT).getTime() + 24 * 60 * 60 * 1000
                ).toDateString() || "",
              refresh_expiration:
                new Date(
                  new Date(oldRT).getTime() + 24 * 60 * 60 * 1000
                ).toDateString() || "",
            });

            // Update original request with new access token
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
            isRefreshSent = false;
            // Retry original request
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        removeTokens();
        removeCookie("userId");
        localStorage.removeItem("oldAT");
        localStorage.removeItem("oldRT");
        // TODO: Redirect to login or handle error
      }
    }

    return Promise.reject(error);
  }
);

// Request interceptor to add Authorization header
apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetchAll = async (config) => {
    return apiClient.get(this.endpoint, config).then((res) => res.data);
  };

  fetch = async (id) => {
    return apiClient.get(this.endpoint + id + "/").then((res) => res.data);
  };

  fetchOne = async () => {
    return apiClient.get(this.endpoint).then((res) => res.data);
  };

  post = async (data, config) => {
    return apiClient.post(this.endpoint, data, config).then((res) => res.data);
  };
}

export default apiClient;
