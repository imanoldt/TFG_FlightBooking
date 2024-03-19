import "./NabvarStyle.css";
import React from "react";
import { FaPlaneDeparture, FaUser, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <FaPlaneDeparture className="text-white text-4xl mr-2" />
          <span className="text-white text-3xl font-semibold">SkySculptor</span>
        </div>

        {/* Menú */}
        <ul className="flex items-center space-x-8">
          <li>
            <a href="#" className="text-black hover:text-black-200 font-semibold text-lg">
              Flights
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-100 font-semibold text-lg">
              LOREM
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-100 font-semibold text-lg">
              LOREM
            </a>
          </li>
          <li className="relative">
            <a href="#" className="text-white hover:text-gray-100 font-semibold text-lg">
              Account
            </a>
            <ul className="absolute hidden bg-purple-700 rounded-lg py-2 mt-2">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-purple-600">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-purple-600">
                  Settings
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-100">
              <FaBell className="text-2xl" />
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-100">
              <FaUser className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
