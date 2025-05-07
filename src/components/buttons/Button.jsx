import React from "react";

const Button = ({ children }) => {
  return (
    <button
      type="submit"
      onClick={handleSubmit}
      className="cursor-pointer hover:scale-105 transition-all duration-500 
      upload_button is-blue w-button inline-block w-[100px] px-1 
      text-center py-2 text-sm rounded-xl ml-auto"
    >
      {children}
    </button>
  );
};

export default Button;
