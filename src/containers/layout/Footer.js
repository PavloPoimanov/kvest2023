import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-light-blue-gray py-4">
            <div className="container mx-auto text-center">
                <p className="text-white">
                    © {new Date().getFullYear()} Kvest 2023. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
