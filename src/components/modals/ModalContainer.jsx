import React, { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

import "../../components/modals/upload-modal/upload-modal.css";

import { FormProvider, useForm } from "react-hook-form";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import useBearer from "../../api/hooks/useBearer";

const ModalContainer = ({
  modalStep,
  handleClose,
  handleNext,
  //   handleSubmit,
  setModalStep,
  title,
  caption,
  children,
}) => {
  return (
    <div>
      <div
        className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-screen z-[20000]"
        onClick={handleClose}
      ></div>
      <div
        className={`upload-modal max-h-[80%] overflow-y-auto overflow-x-hidden ${
          modalStep === 1 ? "w-[450px]" : "w-[750px]"
        } max-w-[90%] bg-[#151515] py-6 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999999999] rounded-xl`}
      >
        <div className="text-right w-full">
          <button
            onClick={handleClose}
            className="cursor-pointer btn ml-auto btn-primary bg-[#fff] outline-[#333333] outline-4 text-black w-[20px] h-[20px] flex justify-center items-center rounded-full"
          >
            <FaTimes className="text-black text-xs" />
          </button>
        </div>

        <div className="mt-2">
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-400">{caption}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
