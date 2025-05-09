const ConfirmationModal = ({
  isVisible,
  onClose,
  title,
  caption,
  cancelText,
  onConfirm,
  confirmText = "Okay",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e1e1e] text-white p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-sm mb-6">{caption}</p>

        <div className={`${cancelText ? "flex gap-4 items-center" : ""}`}>
          {cancelText && (
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md w-full 
              text-white font-semibold"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className="bg-[#5634FE] hover:bg-[#452ad1] px-4 py-2 rounded-md w-full text-white font-semibold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
