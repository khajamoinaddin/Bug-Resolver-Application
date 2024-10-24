import React from "react";
import { Link } from "react-router-dom";
import { FaBug, FaUserPlus, FaSignInAlt, FaEnvelope, FaPhone } from "react-icons/fa"; 
import logo from '../layouts/images/logo.jpg';

const Abhishyandh = () => {
    return (
        <div className="homepagedesign flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="welcome-container text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold mb-4 ">
                   <img src={logo} className="Homeimagelogo"/> Welcome to Abhishyandh's Bug Resolver Tool
                </h1>
                <p className="Homeparagraph">
                <FaBug/>Every bug is just a puzzle waiting to be solved. With Abhishyandh, we turn those challenges into victories, making software better one fix at a time.
                </p>
                <div className="buttons flex justify-center gap-4 mb-6">
                    <Link to="/register">
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                            <FaUserPlus className="mr-2" /> Register
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                            <FaSignInAlt className="mr-2" /> Login
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bug-icon mt-6">
                <FaBug className="text-gray-400 text-8xl" />
            </div>

             
        </div>
    );
};

export default Abhishyandh;
