import React, {Fragment, useEffect, useState} from 'react';
import {ArrowPathIcon, ChatBubbleLeftRightIcon} from "@heroicons/react/20/solid";
import {useTranslation} from "react-i18next";
import {navigationLinks} from "../../constant/navigation";
import {Link} from "react-router-dom";
import {getBy} from "../../api/firebase/api";
import {usePopupDialog} from "../../context/dialogContext";
import {useSnackbar} from "notistack";

const QuizComponent = () => {
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [answers, setAnswers] = useState([]);
    const getRandomElements = (arr, count) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    const [currentTopic, setCurrentTopic] = useState(getRandomElements(['names', 'places', 'numbers'], 1)[0]);
    const [nextTopic, setNextTopic] = useState(null);

    // Function to fetch data and initialize the quiz
    const fetchData = (next = false) => async () => {
        try {
            const response = await getBy(null, next ? nextTopic: currentTopic, null, null);
            const result = [];
            response.forEach(e => {
                result.push({id: e.key, ...e.val()})
            });
            // Set the data and select a random item
            setData(result);
            selectRandomItem(result);
            setNextTopic(getRandomElements(['names', 'places', 'numbers'], 1)[0])
            if (next){
                setCurrentTopic(nextTopic)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to select a random item from the data
    const selectRandomItem = (data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex];
        setCurrentItem(randomItem);
    };

    // Function to prepare answer choices
    const prepareAnswers = (data, currentItem) => {
        const otherItems = data.filter((item) => item.id !== currentItem.id);
        const randomAnswers = getRandomElements(otherItems, 3);
        const allAnswers = [currentItem, ...randomAnswers];
        shuffleArray(allAnswers);
        setAnswers(allAnswers);
    };

    // Function to get a random number of elements from an array

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    const {openModal} = usePopupDialog()

    // Handle opening the modal and preparing answers when currentItem changes
    useEffect(() => {
        if (currentItem) {
            prepareAnswers(data, currentItem);
        }
    }, [currentItem]);

    useEffect(() => {
        if (currentItem && answers) {
            openModal({
                content: <div className='flex flex-col items-center w-full'>
                    <h2 className="text-2xl font-semibold mb-4">{t(`common.${currentTopic}`)}</h2>
                    <p className="text-gray-800 mb-6 italic">{currentItem.description}</p>
                    <ul className='grid grid-cols-2 grid-rows-2 gap-5 w-full'>
                        {answers.map((answer) => (
                            <li key={answer.id} className="mb-2">
                                <button
                                    onClick={() => handleAnswerSelect(answer)}
                                    className="px-4 w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    {answer.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={fetchData(true)}
                        className="mt-4 px-4 py-2 text-green-500 rounded-md hover:bg-green-600 hover:text-white focus:outline-none focus:ring focus:ring-green-200"
                    >
                        <ArrowPathIcon className='w-8 h-8'/>
                    </button>
                </div>
            })
        }
    }, [currentItem, answers]);


    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation()
    // Function to handle selecting an answer
    const handleAnswerSelect = (selectedAnswer) => {
        if (selectedAnswer.id === currentItem.id) {
            enqueueSnackbar(t("common.correct"), {variant: "success"})
        } else {
            enqueueSnackbar(t("common.unCorrect"), {variant: "warning"})
        }
        // Handle logic when an answer is selected
        // For example, check if it's correct and display feedback
        // You can also update a score or perform other actions here
    };

    return (
        <div>
            {/* Trigger button to start the quiz */}
            <button
                className="bg-amber-300 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-full transition duration-300"
                onClick={fetchData()}>{t('home.start')}</button>
        </div>
    );
};

function HeroSection() {
    const {t} = useTranslation();

    // get random / place/number/...
    // get list only one item
    // name = давид
    // show the описание
    // get 3 more elements not including current one
    // show in modal answers the names
    return (
        <div className="bg-gray-400 py-20 mx-auto px-2 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {t('home.welcome')}
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    {t('home.prepare')}
                </p>
                <QuizComponent/>
            </div>
        </div>
    );
}


function FeaturesSection({features}) {
    const {t} = useTranslation();

    return (
        <section className="py-16 bg-gray-100 mx-auto px-2 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8">{t('home.features')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Link to={feature.to} key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


function SocialMediaLinks({telegramLink}) {
    // Sample Telegram link
    const {t} = useTranslation();

    return (
        <section className="bg-gray-800 text-white py-8 mx-auto px-2 sm:px-6 lg:px-8">
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
                        <ChatBubbleLeftRightIcon className="w-8 h-8"/> {/* Telegram icon */}
                    </a>
                </div>
            </div>
        </section>
    );
}

export const Home = () => {
    const {t} = useTranslation();
    const features = [
        {
            title: t('home.feature1Title'),
            description: t('home.feature1Description'),
            to: navigationLinks(t).find(e => e.name === t('nav.names')).to
        },
        {
            title: t('home.feature2Title'),
            description: t('home.feature2Description'),
            to: navigationLinks(t).find(e => e.name === t('nav.places')).to
        },
        {
            title: t('home.feature3Title'),
            description: t('home.feature3Description'),
            to: navigationLinks(t).find(e => e.name === t('nav.numbers')).to
        },
        {
            title: t('home.feature4Title'),
            description: t('home.feature4Description'),
            to: navigationLinks(t).find(e => e.name === t('nav.quotes')).to
        },
    ];
    const telegramLink = 'https://t.me/pavlo.poimanv';
    return (
        <>
            <HeroSection/>
            <FeaturesSection features={features}/>
            <SocialMediaLinks telegramLink={telegramLink}/>
        </>
    );
};
