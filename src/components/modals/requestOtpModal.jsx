import React, { useState } from "react";

const RequestOTPModal = ({
  isVisible,
  handleClose,
  onRequestOTP,
  onEmailProvided,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleResendSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    await onRequestOTP(email, "EmailVerification");
    onEmailProvided(email);
    setIsSubmitting(false);
    handleClose();
  };

  return (
    isVisible && (
      <>
        <div
          className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-full z-[20000]"
          onClick={handleClose}
        ></div>

        <div className="card otp-modal w-5xl max-w-full mx-auto rounded-[20px] bg-[#151515] p-10 max-w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999999] rounded-xl">
          <h2 className="text-white text-lg font-bold">Resend OTP</h2>

          <p className="text-gray-300 mt-2">
            Enter your email address to receive a new OTP.
          </p>

          <form onSubmit={handleResendSubmit} className="mt-6">
            <div>
              <label htmlFor="email" className="text-gray-300 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                placeholder="example@email.com"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default RequestOTPModal;
