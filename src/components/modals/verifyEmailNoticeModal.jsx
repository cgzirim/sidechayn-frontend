const VerifyEmailNoticeModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e1e1e] text-white p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>
        <p className="text-sm mb-6">
          We’ve sent a verification link to your email. Please check your inbox
          and click the link to verify your account.
        </p>
        <button
          onClick={onClose}
          className="bg-[#5634FE] hover:bg-[#452ad1] px-4 py-2 rounded-md w-full text-white font-semibold"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailNoticeModal;
