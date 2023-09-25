import React from 'react';
import {Navbar} from "../../components/Navbar";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Header = () => {
    // Get the current location using React Router's useLocation hook
    const location = useLocation();
    const {t} = useTranslation();

    // Define the navigation links with their "isActive" property
    const navigationLinks = [
        {name: t('nav.names'), to: "/names", current: location.pathname === "/names"},
        {name: t('nav.places'), to: "/places", current: location.pathname === "/places"},
        {name: t('nav.numbers'), to: "/numbers", current: location.pathname === "/numbers"},
        {name: t('nav.quotes'), to: "/quotes", current: location.pathname === "/quotes"}
    ];
    return (
        <Navbar navigation={navigationLinks}/>
    );
};
