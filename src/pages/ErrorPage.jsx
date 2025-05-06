// ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Remove if you're not using React Router

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-red-500 text-center">404</h1>
            <p className="text-2xl mt-4 text-gray-700">Oops! Page not found.</p>
            <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;
