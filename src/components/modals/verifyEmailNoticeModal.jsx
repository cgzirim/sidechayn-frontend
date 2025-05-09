import ConfirmationModal from "./ConfirmationModal";

const VerifyEmailNoticeModal = ({ isVisible, onClose }) => {
  return (
    <ConfirmationModal
      isVisible={isVisible}
      title="Verify Your Email"
      caption="We’ve sent a verification link to your email. Please check your inbox
          and click the link to verify your account."
      onConfirm={onClose}
    />
  );
};

export default VerifyEmailNoticeModal;
