import React from "react";
import PropTypes from "prop-types";

const Input = ({ label = "Title", ...rest }) => {
  return (
    <div className="upload-input lg:col-span-2 col-span-1 mb-2">
      <label className="text-white text-[17px]">{label}</label>
      <input
        className="input border border-dashed border-white input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
};

export default Input;
