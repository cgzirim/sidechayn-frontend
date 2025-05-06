import React, { useState, useEffect } from "react";

const OTPModal = ({ isVisible, handleClose, onVerifyOTP, onResendOTP }) => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setIsSubmitting(true);
    await onVerifyOTP(otp);
    handleClose();
    setIsSubmitting(false);
  };

  const [resendCooldown, setResendCooldown] = useState(0);

  const handleResendClick = () => {
    setError("");
    onResendOTP();
    setResendCooldown(30);
  };

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    isVisible && (
      <>
        <div
          className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-full z-[20000]"
          onClick={handleClose}
        ></div>

        <div className="card otp-modal w-5xl max-w-full mx-auto rounded-[20px] bg-[#232323] p-10 max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999999] rounded-xl">
          <h2 className="text-white text-lg font-bold">Confirm Your Email</h2>

          <p className="text-gray-300 mt-2">
            An OTP has been sent to your email. Please enter the OTP to confirm
            your email address.
          </p>

          <form onSubmit={handleOTPSubmit} className="mt-6">
            <div>
              <label htmlFor="otp" className="text-gray-300 text-sm">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-xs text-gray-400">
            Didn't receive the OTP?{" "}
            {resendCooldown > 0 ? (
              <span className="text-gray-500">Resend in {resendCooldown}s</span>
            ) : (
              <button
                className="text-[#5634FE] font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
                onClick={handleResendClick}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default OTPModal;
