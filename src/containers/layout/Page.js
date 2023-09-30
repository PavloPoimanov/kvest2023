import {Content} from "./Content";
import {Footer} from "./Footer";
import {Header} from "./Header";
import React from 'react';

export const Page = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow overflow-y-auto">
                <div className="max-h-[calc(100vh-64px-56px)]">
                    <Content />
                </div>
            </main>

            <Footer />
        </div>
    );
};
