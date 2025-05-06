import React, { useState } from "react";

const PasswordResetModal = ({ isVisible, handleClose, onResetPassword }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    await onResetPassword({ otp, newPassword, confirmPassword });

    setIsSubmitting(false);
    handleClose();
  };

  return (
    isVisible && (
      <>
        {/* Modal Overlay */}
        <div
          className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-full z-[20000]"
          onClick={handleClose}
        ></div>

        {/* Modal Content */}
        <div className="card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999999] w-full max-w-md bg-[#151515] rounded-xl p-6">
          <h2 className="text-white text-lg font-bold">Reset Your Password</h2>
          <p className="text-gray-300 mt-2 text-sm">
            Enter the OTP sent to your email, along with your new password.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="otp" className="text-gray-300 text-sm">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="input input-bordered w-full bg-[#3d3d38] text-white rounded-md px-3 py-2 mt-1"
                placeholder="Enter 6-digit OTP"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="text-gray-300 text-sm">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full bg-[#3d3d38] text-white rounded-md px-3 py-2 mt-1"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-gray-300 text-sm"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full bg-[#3d3d38] text-white rounded-md px-3 py-2 mt-1"
                placeholder="Confirm new password"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </>
    )
  );
};

export default PasswordResetModal;
