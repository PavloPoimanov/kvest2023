import React from 'react';
import {ChatBubbleLeftRightIcon} from "@heroicons/react/20/solid";
import {useTranslation} from "react-i18next";

function HeroSection() {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-400 py-20">
            <div className="container mx-auto text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {t('home.welcome')}
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    {t('home.prepare')}
                </p>
                {/*<button className="bg-amber-300 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-full transition duration-300">*/}
                {/*    {t('home.start')}*/}
                {/*</button>*/}
            </div>
        </div>
    );
}


function FeaturesSection({features}) {
    const { t } = useTranslation();

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8">{t('home.features')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


function SocialMediaLinks({telegramLink}) {
    // Sample Telegram link
    const { t } = useTranslation();

    return (
        <section className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">{t('home.reachMe')}</h2>
                <div className="flex justify-center space-x-4">
                    {/* Telegram Link */}
                    <a
                        href={telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-blue-500 transition-colors"
                    >
                        <ChatBubbleLeftRightIcon className="w-8 h-8" /> {/* Telegram icon */}
                    </a>
                </div>
            </div>
        </section>
    );
}

export const Home = () => {
    const { t } = useTranslation();
    const features = [
        {
            title: t('home.feature1Title'),
            description: t('home.feature1Description'),
        },
        {
            title: t('home.feature2Title'),
            description: t('home.feature2Description'),
        },
        {
            title: t('home.feature3Title'),
            description: t('home.feature3Description'),
        },
        {
            title: t('home.feature4Title'),
            description: t('home.feature4Description'),
        },
    ];
    const telegramLink = 'https://t.me/pavlo.poimanv';
    return (
        <>
            <HeroSection />
            <FeaturesSection features={features}/>
            <SocialMediaLinks telegramLink={telegramLink}/>
        </>
    );
};
