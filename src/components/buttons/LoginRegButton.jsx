import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginRegButton = ({ handleMobileSidebar }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div>
        <button className="lg:hidden block mr-5" onClick={handleMobileSidebar}>
          <FaChevronLeft className="text-[#ffffff9c] text-2xl" />
        </button>
        <p
          className="register-button cursor-pointer mt-5 flex justify-center items-center flex-col px-1 py-2"
          // onClick={() => setModalVisible(true)}
          onClick={() => navigate("/login", { replace: true })}
        >
          <span>
            Register / Login <br />
          </span>
          <span className="text-[9px]" style={{ letterSpacing: "2px" }}>
            Join 12 New Users This Week
          </span>
        </p>
      </div>
    </section>
  );
};

export default LoginRegButton;
