// ComingSoon.jsx
import React from 'react';

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center bg-gray-100 p-4">
            <h1 className="lg:text-6xl text-3xl font-bold text-yellow-500">🚧 Coming Soon 🚧</h1>
            <p className="lg:text-2xl mt-4 text-gray-700">We're working hard to launch something awesome!</p>
            <p className="text-gray-600 mt-2">This page is under construction. Stay tuned for updates.</p>
            <a
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go Back Home
            </a>
        </div>
    );
};

export default ComingSoon;
