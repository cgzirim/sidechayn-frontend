import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RequestOTPModal from "../components/modals/requestOtpModal";
import PasswordResetModal from "../components/modals/passwordResetModal";

const Login = () => {
  const navigate = useNavigate();
  const {
    login,
    hasSentOTP,
    isAuthenticating,
    isLoginSuccessful,
    authErrorMessages,
    requestPwdResetOTP,
    resetPassword,
    isResetPasswordSuccessful,
  } = useAuth();
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailFromPwdReset, setEmailFromPwdReset] = useState("");
  // const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showRequestOTPModal, setShowRequestOTPModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ identifier, password });
  };

  useEffect(() => {
    if (hasSentOTP) {
      setShowOtpModal(true);
    }
  }, [hasSentOTP]);

  useEffect(() => {
    if (isResetPasswordSuccessful) {
      setShowRequestOTPModal(false);
      setShowOtpModal(false);
    }
  }, [isResetPasswordSuccessful]);

  useEffect(() => {
    if (isLoginSuccessful) {
      if (isLoginSuccessful) {
        navigate("/", { replace: true });
      }
    }
  }, [isLoginSuccessful]);

  return (
    <div className="login py-10 flex justify-center items-center h-screen">
      <div className="container">
        <div className="card w-5xl max-w-full mx-auto rounded-[20px] bg-[#232323] p-10">
          <Link to="/register">
            <button className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md">
              Don’t have an account? <b className="cursor-pointer">Register</b>
            </button>
          </Link>

          <div className="mt-6">
            <p className="text-gray-400">Login with:</p>

            <div className="grid my-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              <button className="btn btn-primary bg-[#3d3d38] text-white w-full px-6 py-2 rounded-md flex cursor-pointer justify-center items-center">
                <FaGoogle className="text-white mr-2" />
                Google
              </button>
              <button className="btn btn-primary bg-[#3d3d38] text-white w-full px-6 py-2 rounded-md flex cursor-pointer justify-center items-center">
                <FaFacebookF className="text-white mr-2" />
                Facebook
              </button>
              <button className="btn btn-primary bg-[#3d3d38] text-white w-full px-6 py-2 rounded-md flex cursor-pointer justify-center items-center">
                <FaInstagram className="text-white mr-2" />
                Instagram
              </button>
            </div>

            <div className="form_line-box my-5">
              <div className="form_line"></div>
              <div className="text-sm">Or</div>
              <div className="form_line"></div>
            </div>

            <form onSubmit={handleLogin} className="grid gap-6">
              <div>
                <label htmlFor="identifier" className="text-gray-300 text-sm">
                  Email or Username
                </label>
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                  placeholder=""
                  required
                />
                {authErrorMessages.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {authErrorMessages.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-gray-300 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                  required
                />
                {/* TODO: add button to show/hide password */}
                {authErrorMessages.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {authErrorMessages.password}
                  </p>
                )}
                <span className="text-xs text-gray-400">
                  Forgot your password?{" "}
                  {/* <Link to="/reset" className="text-gray-300 underline">
                    Reset it
                  </Link> */}
                  <button
                    onClick={() => setShowRequestOTPModal(true)}
                    className="text-gray-300 cursor-pointer"
                  >
                    Reset it
                  </button>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md cursor-pointer"
                >
                  {isAuthenticating ? "Logging in..." : "Login"}
                </button>
              </div>
              <span className="text-xs text-gray-400">
                By logging in, you agree to our{" "}
                <Link className="text-gray-300 underline" to={"/"}>
                  terms of service
                </Link>
                .
              </span>
            </form>
          </div>
        </div>
      </div>
      <RequestOTPModal
        isVisible={showRequestOTPModal}
        handleClose={() => setShowRequestOTPModal(false)}
        onRequestOTP={() => requestPwdResetOTP()}
        onEmailProvided={setEmailFromPwdReset}
      />
      <PasswordResetModal
        isVisible={showOtpModal}
        handleClose={() => setShowOtpModal(false)}
        onResetPassword={resetPassword}
      />
    </div>
  );
};

export default Login;
