import { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import apiClient from "../apiClient.js";
import {
  getCookie,
  setCookie,
  removeCookie,
  setTokens,
  getTokenExpirationTime,
  isRefreshTokenValid,
} from "../tokenManagement.js";

/**
 * @typedef {Object} UserData
 * @property {Object} user
 * @property {string} user.id
 * @property {string} [access]
 * @property {string} [refresh]
 * @property {string} [access_expiration]
 * @property {string} [refresh_expiration]
 */

/**
 * @typedef {Object} UserCredentialLoginType
 * @property {string} email
 * @property {string} password
 */

/**
 * Authentication hook for managing user login and session state.
 * @returns {Object} Authentication methods and state
 */
export const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUserInfo, setisLoadingUserInfo] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [authErrorMessages, setAuthErrorMessages] = useState({});
  const [axiosErrorMessage, setAxiosErrorMessage] = useState("");
  const [isRegistrationReqSent, setisRegistrationReqSent] = useState(false);
  const [isResetPasswordSuccessful, setIsResetPasswordSuccessful] =
    useState(false);

  // Initialize user state from cookie
  useEffect(() => {
    setisLoadingUserInfo(true);
    const userIdFromCookie = getCookie("userId");
    if (userIdFromCookie) {
      setUserInfo({
        user: { id: userIdFromCookie },
      });
    }
    setisLoadingUserInfo(false);
  }, []);

  // Handle side effects for authErrorMessages changes
  useEffect(() => {
    if (Object.keys(authErrorMessages).length > 0) {
      console.log("Authentication errors updated:", authErrorMessages);
    }
  }, [authErrorMessages]);

  /**
   * Logs in a user with provided credentials.
   * @param {UserCredentialLoginType} credentials - User login credentials
   * @returns {Promise<void>}
   */
  const login = async (credentials) => {
    if (isAuthenticated()) {
      toast.info("User already authenticated", { position: "top-center" });
      return;
    }

    setIsAuthenticating(true);

    try {
      const { identifier, password } = credentials;
      const isEmail = identifier.includes("@");

      const res = await apiClient.post("/users/auth/login/", {
        [isEmail ? "email" : "username"]: identifier,
        password,
      });

      if (res.status === 200) {
        const userData = res.data;

        setCookie(
          "userId",
          userData.user.id || "",
          getTokenExpirationTime(userData.access_expiration || "")
        );

        setTokens({
          access: userData.access || "",
          refresh: userData.refresh || "",
          access_expiration: userData.access_expiration || "",
          refresh_expiration: userData.refresh_expiration || "",
        });

        localStorage.setItem(
          "oldAT",
          new Date(userData.access_expiration || "").getTime().toString()
        );
        localStorage.setItem(
          "oldRT",
          new Date(userData.refresh_expiration || "").getTime().toString()
        );

        setUserInfo({
          user: {
            id: userData.user.id,
            // stats: userData.user.stats,
            // email: userData.user.email,
            // date_joined: userData.user.date_joined,
            // name: userData.user.name,
            // username: userData.user.username,
            // bio: userData.user.bio,
            // location: userData.user.location,
            // picture: userData.user.picture,
            // is_private: userData.user.is_private,
          },
        });

        setIsLoginSuccessful(true);
        toast.success("Login successful", { position: "top-center" });
      } else {
        console.error("Authentication failed");
        toast.error("Authentication failed", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error during authentication:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        const errorMSG = Object.values(errorData).flat().join(", ");
        setAuthErrorMessages(errorData);
        setAxiosErrorMessage(error.message);
        toast.error(errorMSG || "An unexpected error occurred", {
          position: "top-center",
        });
      } else {
        setAxiosErrorMessage(error.message || "Unknown error");
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Registers a new user with provided data.
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User's name
   * @param {string} userData.email - User's email
   * @param {string} userData.username - User's username
   * @param {string} userData.password - User's password
   * @returns {Promise<void>}
   */
  const register = async (userData) => {
    setIsAuthenticating(true);

    try {
      const response = await apiClient.post(`/users/auth/registration/`, {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        password1: userData.password,
        password2: userData.password,
      });

      if (response.status === 200) {
        setisRegistrationReqSent(true);
        const userData = response.data;

        setCookie(
          "userId",
          userData.user.id || "",
          getTokenExpirationTime(userData.access_expiration || "")
        );

        setTokens({
          access: userData.access || "",
          refresh: userData.refresh || "",
          access_expiration: userData.access_expiration || "",
          refresh_expiration: userData.refresh_expiration || "",
        });

        localStorage.setItem(
          "oldAT",
          new Date(userData.access_expiration || "").getTime().toString()
        );
        localStorage.setItem(
          "oldRT",
          new Date(userData.refresh_expiration || "").getTime().toString()
        );

        setUserInfo({
          user: {
            id: userData.user.id,
            // stats: userData.user.stats,
            // email: userData.user.email,
            // date_joined: userData.user.date_joined,
            // name: userData.user.name,
            // username: userData.user.username,
            // bio: userData.user.bio,
            // location: userData.user.location,
            // picture: userData.user.picture,
            // is_private: userData.user.is_private,
          },
        });

        setIsLoginSuccessful(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        const errorMSG = Object.values(errorData).flat().join(", ");
        setAuthErrorMessages(errorData);
        setAxiosErrorMessage(error.message);
        toast.error(errorMSG || "An unexpected error occurred", {
          position: "top-center",
        });
      } else {
        setAxiosErrorMessage(error.message || "Unknown error");
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (
    pwdResetOTP,
    newPassword,
    newPasswordConfirmation
  ) => {
    try {
      const response = await apiClient.post(
        `/users/auth/password/reset/confirm/`,
        {
          pwdResetOTP,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        }
      );

      if (response.status === 200) {
        setIsResetPasswordSuccessful(true);
        toast.success("Password reset successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error during password reset:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        const errorMSG = Object.values(errorData).flat().join(", ");
        setAuthErrorMessages(errorData);
        setAxiosErrorMessage(error.message);
        toast.error(errorMSG || "An unexpected error occurred", {
          position: "top-center",
        });
      } else {
        setAxiosErrorMessage(error.message || "Unknown error");
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
    }
  };

  /**
   * Logs out the current user.
   */
  const logout = () => {
    removeCookie("userId");
    removeCookie("refreshToken");
    removeCookie("accessToken");
    localStorage.removeItem("oldAT");
    localStorage.removeItem("oldRT");
    setUserInfo(null);
    setIsLoginSuccessful(false);
    setAuthErrorMessages({});
    setAxiosErrorMessage("");
    toast.info("Logged out successfully", { position: "top-center" });
  };

  /**
   * Checks if the user is authenticated.
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return !!getCookie("userId") && isRefreshTokenValid();
  };

  /**
   * Automatically logs out if not authenticated.
   */
  const autoLogout = () => {
    if (!isAuthenticated()) {
      logout();
    }
  };

  return {
    userInfo,
    login,
    register,
    logout,
    autoLogout,
    axiosErrorMessage,
    isAuthenticated,
    setAuthErrorMessages,
    authErrorMessages,
    isAuthenticating,
    isLoginSuccessful,
    isLoadingUserInfo,
    isRegistrationReqSent,
    resetPassword,
    isResetPasswordSuccessful,
  };
};
