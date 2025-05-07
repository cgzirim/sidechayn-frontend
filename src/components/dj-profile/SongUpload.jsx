import React, { useState } from "react";
import UploadModal from "../modals/upload-modal";

const SongUpload = ({ handleSongUploadClose }) => {
  const [modalStep, setModalStep] = useState(1);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const handleNext = () => {
    if (modalStep === 1) {
      setModalStep(2);
    } else {
      // Handle the final step or submission
      setUploadModalVisible(false);
    }
  };

  const handleUploadClose = () => {
    setUploadModalVisible(false);
    setModalStep(1);
    handleSongUploadClose();
  };

  return (
    <UploadModal
      modalStep={modalStep}
      handleClose={handleUploadClose}
      handleNext={handleNext}
      //   handleSubmit={handleSubmit}
      setModalStep={setModalStep}
    />
  );
};

export default SongUpload;
