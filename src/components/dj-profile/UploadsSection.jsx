import React from "react";
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
