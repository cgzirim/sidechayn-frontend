import React from "react";
import "./AnimatedButton.css"; // Don't forget to create this CSS file
// import UploadModal from "../upload-modal";

const AnimatedButton = ({ text = "Upload Your Music", handleBar, setBar, handleClick }) => {
    
    return (
        <>
            <button className="register-button mt-20 animated-button" onClick={handleClick}>
                <div className="gradient-wrapper">
                    <div className="shapes-wrapper">
                        <div className="shape purple rotate"></div>
                        <div className="shape blue spin-reverse"></div>
                        {/* <div className="shape orange float"></div> */}
                    </div>
                    {/* <div className="noise"></div> */}
                </div>
                <div className="text-wrapper">
                    <span className="button-text text-sm">👉 {text}</span>
                </div>
            </button>

            
        </>
    );
};

export default AnimatedButton;
