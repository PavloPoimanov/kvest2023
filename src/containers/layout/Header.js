import React from 'react';
import {Navbar} from "../../components/Navbar";
import {useLocation} from "react-router-dom";

export const Header = () => {
    // Get the current location using React Router's useLocation hook
    const location = useLocation();

    // Define the navigation links with their "isActive" property
    const navigationLinks = [
        { name: "Names", to: "/names", current: location.pathname === "/names" },
        { name: "Places", to: "/places", current: location.pathname === "/places" },
        { name: "Numbers", to: "/numbers", current: location.pathname === "/numbers" },
        { name: "Quotes", to: "/quotes", current: location.pathname === "/quotes" }
    ];
    return (
        <Navbar navigation={navigationLinks}/>
    );
};
