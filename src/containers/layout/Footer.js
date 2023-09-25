import React from 'react';
import {useTranslation} from "react-i18next";

export const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer className="bg-light-blue-gray py-4">
            <div className="container mx-auto text-center">
                <p className="text-white">
                    © {new Date().getFullYear()} {t('common.footer')}
                </p>
            </div>
        </footer>
    );
};
