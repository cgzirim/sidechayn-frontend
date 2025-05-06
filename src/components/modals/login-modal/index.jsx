import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import OTPModal from "../otpModal";

import "./login-modal.css";

const LoginModal = ({
  modalVisible,
  activeModal,
  handleClose,
  changeModal,
  setActiveModal,
}) => {
  const { register, isRegistrationReqSent, verifyEmail } = useAuth();
  const { login, loading, isLoginSuccessful, error } = useAuth();
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [isOtpModalVisible, setOtpModalVisible] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    await login({ identifier, password });
    if (isLoginSuccessful) {
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
    if (isRegistrationReqSent) {
      console.log("Registration successful");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleVerifyOTP = async (otp) => {
    verifyEmail(otp);
  };

  return (
    modalVisible && (
      <>
        <div
          className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-full z-[20000]"
          onClick={handleClose}
        ></div>

        {activeModal === "login" ? (
          <>
            <div className="card login-modal w-5xl max-w-full mx-auto rounded-[20px] bg-[#232323] p-10 max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999999] rounded-xl">
              <div>
                <button
                  className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
                  onClick={() => changeModal("register")}
                >
                  Don’t have an account? <b>Register</b>
                </button>
              </div>

              <div className="mt-6">
                <p className="text-gray-400">Login with:</p>

                <div className="grid my-3 lg:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
                  <button className="btn btn-primary bg-[#3d3d38] google text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaGoogle className="text-white mr-2" />
                    Google
                  </button>
                  <button className="btn btn-primary bg-[#3d3d38] fb text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaFacebookF className="text-white mr-2" />
                    Facebook
                  </button>
                  <button className="btn btn-primary bg-[#3d3d38] insta text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaInstagram className="text-white mr-2" />
                    Instagram
                  </button>
                </div>

                <div className="form_line-box my-5">
                  <div className="form_line"></div>
                  <div className="text-sm">Or</div>
                  <div className="form_line"></div>
                </div>

                <form className="grid gap-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="identifier"
                      className="text-gray-300 text-sm"
                    >
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
                      placeholder=""
                      required
                    />
                    <span className="text-xs text-gray-400">
                      Forgot your password?{" "}
                      <Link to="/reset" className="text-gray-300 underline">
                        Reset it
                      </Link>
                    </span>
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
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
          </>
        ) : (
          <>
            <div className="card w-5xl login-modal max-w-full mx-auto rounded-[20px] bg-[#232323] p-10 max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999999] rounded-xl">
              <div>
                <button
                  className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
                  onClick={() => changeModal("login")}
                >
                  Already have an account? <b>Login</b>
                </button>
              </div>

              <div className="mt-6">
                <p className="text-gray-400">Register with:</p>

                <div className="grid my-3 lg:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
                  <button className="btn btn-primary bg-[#3d3d38] google text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaGoogle className="text-white mr-2" />
                    Google
                  </button>
                  <button className="btn btn-primary bg-[#3d3d38] fb text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaFacebookF className="text-white mr-2" />
                    Facebook
                  </button>
                  <button className="btn btn-primary bg-[#3d3d38] insta text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaInstagram className="text-white mr-2" />
                    Instagram
                  </button>
                </div>

                <div className="form_line-box my-5">
                  <div className="form_line"></div>
                  <div className="text-sm">Or</div>
                  <div className="form_line"></div>
                </div>

                <form className="grid gap-6">
                  <div>
                    <label htmlFor="email" className="text-gray-300 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-gray-300 text-sm">
                      Password
                    </label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                      placeholder=""
                    />
                    <span
                      className="cursor-pointer text-xs text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? "Hide" : "Show"} Password
                    </span>
                    <span className="text-xs text-gray-400">
                      Forgot your password?{" "}
                      <Link to="/reset" className="text-gray-300 underline">
                        Reset it
                      </Link>
                    </span>
                  </div>
                  <div>
                    <button className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md">
                      Login
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
            ) : (
            <div className="card w-5xl login-modal max-w-full mx-auto rounded-[20px] bg-[#232323] p-10 max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999999] rounded-xl">
              <div>
                <button
                  className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
                  onClick={() => changeModal("login")}
                >
                  Already have an account? <b>Login</b>
                </button>
              </div>

              <div className="mt-6">
                <p className="text-gray-400">Register with:</p>

                <div className="grid my-3 lg:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
                  <button className="btn btn-primary bg-[#3d3d38] google text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaGoogle className="text-white mr-2" />
                    Google
                  </button>
                  <button className="btn btn-primary bg-[#3d3d38] fb text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaFacebookF className="text-white mr-2" />
                    Facebook
                  </button>
                  <button className="btn btn-primary bg-[#3d3d38] insta text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                    <FaInstagram className="text-white mr-2" />
                    Instagram
                  </button>
                </div>

                <div className="form_line-box my-5">
                  <div className="form_line"></div>
                  <div className="text-sm">Or</div>
                  <div className="form_line"></div>
                </div>

                <form
                  className="grid lg:grid-cols-2 gap-6"
                  onSubmit={handleRegisterSubmit}
                >
                  <div className="col-span-1">
                    <label htmlFor="name" className="text-gray-300 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                      placeholder=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="username" className="text-gray-300 text-sm">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                      placeholder=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="email" className="text-gray-300 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                      placeholder=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="password" className="text-gray-300 text-sm">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                      placeholder=""
                    />
                    <span className="text-xs text-gray-400">
                      minimum length is 9 characters
                    </span>
                  </div>
                  {/* submit */}
                  <div className="col-span-2">
                    <button className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md">
                      Register
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 col-span-2">
                    By creating an account you agree to our{" "}
                    <Link className="text-gray-300 underline" to={"/"}>
                      terms of service
                    </Link>
                    , We will NEVER share your personal info or send you any
                    emails unless you specifically ask us to (reset password /
                    support request).
                  </span>
                </form>
              </div>

              <OTPModal
                isVisible={isOtpModalVisible}
                handleClose={() => setOtpModalVisible(false)}
                onVerifyOTP={handleVerifyOTP}
              />
            </div>
          </>
        )}
      </>
    )
  );
};

export default LoginModal;
