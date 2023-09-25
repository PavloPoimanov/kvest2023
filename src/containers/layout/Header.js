import React from 'react';
import {Navbar} from "../../components/Navbar";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {navigationLinks} from "../../constant/navigation";

export const Header = () => {
    // Get the current location using React Router's useLocation hook
    const location = useLocation();
    const {t} = useTranslation();

    return (
        <Navbar navigation={navigationLinks(t, location)}/>
    );
};
