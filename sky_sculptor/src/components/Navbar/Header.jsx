import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "./Header.css";

// Import Icons
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";


const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`Navbar ${isScrolled ? "activeHeader" : ""}`}>
            <div className="logoDiv">
                <h1 className="logo">SkySkulptor</h1>
            </div>

            <div className={`menu ${isActive ? "showMenu" : ""}`}>
                <div className="lists flex">
                    <li>
                        <a href="">Destination</a>
                    </li>
                    <li>
                        <a href="">Wishlist</a>
                    </li>
                    <li>
                        <a href="">About</a>
                    </li>
                    <li>
                        <a href="">Contact</a>
                    </li>
                </div>

                <div className="btns flex">
                    <button className="btn">Login</button>
                    <button className="btn">Sign Up</button>
                    <select className="lang">
                        <option value="">ESP</option>
                        <option value="">ENG</option>
                        <option value="">EUS</option>
                    </select>
                </div>

                <div className="closeIcon" onClick={toggleNavbar}>
                    <AiFillCloseCircle className="icon" />
                </div>
            </div>

            <div className="toggleIcon" onClick={toggleNavbar}>
                <TbGridDots className="icon" />
            </div>
        </div>
    );
};

export default Header;
