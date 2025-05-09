import React from "react";

const EmptyState = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">{children}</p>
    </div>
  );
};

export default EmptyState;
