import React from 'react'
import "./coming-soon.css"

const ComingSoon = ({ handleClose }) => {
    return (
        <>
            <div className="modal-bg bg-black opacity-75 fixed top-0 left-0 h-screen w-full z-[2000000]" onClick={handleClose}></div>

            <div className="coming-soon card w-[305px] max-w-full mx-auto rounded-[20px] p-10 max-w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999999999] rounded-xl">
                <div className="text-right">
                    <button className='btn rounded-full cursor-pointer' onClick={handleClose}>
                        <div className="cross_button-wrap"><img className='w-6' loading="lazy" src="https://cdn.prod.website-files.com/66b1e34f1cccd77056bac6df/679af985a959812d7b3bd5b7_cross-circle-svgrepo-com.svg" alt="" /></div>
                    </button>
                </div>

                <div className="py-5 px-6">
                    <div className="text-center">
                        <p className="text-[#949494] fw-semibold text-xl">
                            Coming Soon!
                        </p>
                        <p className="text-sm text-[#999] mt-4">
                            This feature is not available in beta, but will be released soon!
                        </p>

                        <button onClick={handleClose} className='upload_button cursor-pointer is-blue w-button px-4 mx-auto text-sm py-2 rounded-md mt-6'>
                            Understood
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComingSoon