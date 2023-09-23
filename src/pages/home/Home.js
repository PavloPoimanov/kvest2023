import React from 'react';

export const Home = () => {
    return (
        <div>
            <div className="bg-primary-light text-white p-4">
                This is a primary light background.
            </div>
            <div className="bg-secondary-dark text-black p-4">
                This is a secondary dark background.
            </div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </div>
    );
};
