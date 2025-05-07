import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import SongShowcase from "./SongsSection";
import UploadModal from "../modals/upload-modal";
import SongUpload from "./SongUpload";
import AlbumsSection from "./AlbumsSection";
import SongsSection from "./SongsSection";

const UploadsSection = () => {
  return (
    <div className="text-white mt-6 space-y-8">
      {/* Songs Section */}
      <SongsSection />

      {/* Albums Section */}
      <AlbumsSection />
    </div>
  );
};

export default UploadsSection;
