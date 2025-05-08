import React from "react";

const UploadLoadingModal = ({ visible = false, message = "Uploading..." }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999999999999999999]">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center space-y-4 w-72">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00C2FF] border-opacity-80" />
        <p className="text-center text-sm font-medium text-white">{message}</p>
      </div>
    </div>
  );
};

export default UploadLoadingModal;
