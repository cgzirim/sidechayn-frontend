import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-[#0A0A0A] py-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
          <Link to="/" className="text-[#ffffff9c] text-sm">
            <span className="text-[#ffffff9c] text-sm">Support</span>
          </Link>
          <Link to="/" className="text-[#ffffff9c] text-sm">
            <span className="text-[#ffffff9c] text-sm">
              Exclusivity Program
            </span>
          </Link>
          <Link to="/" className="text-[#ffffff9c] text-sm">
            <span className="text-[#ffffff9c] text-sm">Features/Changelog</span>
          </Link>
          <Link to="/" className="text-[#ffffff9c] text-sm">
            <span className="text-[#ffffff9c] text-sm">Careers</span>
          </Link>
          <Link to="/" className="text-[#ffffff9c] text-sm">
            <span className="text-[#ffffff9c] text-sm">Investors</span>
          </Link>
          <Link to="/" className="text-[#ffffff9c] text-sm">
            <span className="text-[#ffffff9c] text-sm">
              Urgent Takedown Request
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
