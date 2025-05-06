import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import OTPModal from "../components/modals/otpModal";
import RequestOTPModal from "../components/modals/requestOtpModal";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailFromResend, setEmailFromResend] = useState("");
  const [showRequestOTPModal, setShowRequestOTPModal] = useState(false);
  const { register, isRegistrationReqSent, isLoginSuccessful } = useAuth();
  const { resendOTP, hasSentOTP, verifyEmail, authErrorMessages } = useAuth();

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
    if (isRegistrationReqSent && !authErrorMessages) {
      setShowOtpModal(true);
    }
  };

  useEffect(() => {
    if (isRegistrationReqSent) {
      setShowOtpModal(true);
    }
  }, [isRegistrationReqSent]);

  useEffect(() => {
    if (hasSentOTP) {
      setShowOtpModal(true);
    }
  }, [hasSentOTP]);

  useEffect(() => {
    if (isLoginSuccessful) {
      navigate("/", { replace: true });
    }
  }, [isLoginSuccessful]);

  return (
    <div className="register py-10 flex justify-center items-center h-screen">
      <div className="container">
        <div className="card w-5xl max-w-full mx-auto rounded-[20px] bg-[#232323] p-10">
          <div className="w-full px-6 py-2 text-center bg-[#5634FE] text-white w-full px-6 py-2 rounded-md">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold hover:opacity-90 cursor-pointer"
            >
              Login
            </Link>{" "}
            /{" "}
            <button
              onClick={() => setShowRequestOTPModal(true)}
              className="font-semibold hover:opacity-90 cursor-pointer bg-transparent border-none text-white p-0"
            >
              Verify Email
            </button>
          </div>

          <div className="mt-6">
            <p className="text-gray-400">Register with:</p>

            <div className="grid my-3 lg:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
              <button className="btn btn-primary bg-[#3d3d38] google text-white w-full px-6 py-2 rounded-md flex justify-center items-center cursor-pointer">
                <FaGoogle className="text-white mr-2" />
                Google
              </button>
              <button className="btn btn-primary bg-[#3d3d38] fb text-white w-full px-6 py-2 rounded-md flex justify-center items-center cursor-pointer">
                <FaFacebookF className="text-white mr-2" />
                Facebook
              </button>
              <button className="btn btn-primary bg-[#3d3d38] insta text-white w-full px-6 py-2 rounded-md flex justify-center items-center cursor-pointer">
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
                  password
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
                <button className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md cursor-pointer">
                  Register
                </button>
              </div>
              <span className="text-xs text-gray-400 col-span-2">
                By creating an account you agree to our{" "}
                <Link className="text-gray-300 underline" to={"/"}>
                  terms of service
                </Link>
                , We will NEVER share your personal info or send you any emails
                unless you specifically ask us to (reset password / support
                request).
              </span>
            </form>
          </div>
        </div>
      </div>
      <OTPModal
        isVisible={showOtpModal}
        handleClose={() => setShowOtpModal(false)}
        onVerifyOTP={verifyEmail}
        onResendOTP={() =>
          resendOTP(formData.email || emailFromResend, "EmailVerification")
        }
      />
      <RequestOTPModal
        isVisible={showRequestOTPModal}
        handleClose={() => setShowRequestOTPModal(false)}
        onRequestOTP={resendOTP}
        onEmailProvided={setEmailFromResend}
      />
    </div>
  );
};

export default Register;
