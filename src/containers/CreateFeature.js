import React, {useRef, useState} from 'react';
import {Dialog, Switch} from '@headlessui/react';
import {Select} from "../components/Select";
import {useTranslation} from "react-i18next";
import {NameContent} from "../components/create/NameContent";
import {useExistCreate} from "../hooks/useExistCreate";
import {PlaceContent} from "../components/create/PlaceContent";
import {NumberContent} from "../components/create/NumberContent";
import {useCreate} from "../hooks/useCreate";
import {QuoteContent} from "../components/create/QouteContent";

function CreateFeature({onClose}) {
    const {t} = useTranslation();

    const submitRef = useRef();

    const handleSetOnSubmit = (sendRequest) => (onSubmit) => {
        submitRef.current = {onSubmit, sendRequest}
    }
    const [isAddMoreEnabled, setIsAddMoreEnabled] = useState(false); // Toggle state
    const handleClickSaveSubmit = (event) => {
        event.preventDefault();
        submitRef.current.onSubmit((formData) => {
            submitRef.current.sendRequest(formData)
            if (!isAddMoreEnabled) {
                onClose();
            }
        });
    }
    const handleName = useExistCreate("names")
    const handlePlace = useExistCreate("places")
    const handleNumbers = useCreate("numbers")
    const handleQuote = useCreate("quotes")

    const options = [
        {
            key: 'name',
            label: t('common.name'),
            content: <NameContent setOnSubmit={handleSetOnSubmit(handleName)} shouldFormReset={isAddMoreEnabled}/>,
        },
        {
            key: 'place',
            label: t('common.place'),
            content: <PlaceContent setOnSubmit={handleSetOnSubmit(handlePlace)} shouldFormReset={isAddMoreEnabled}/>
        },
        {
            key: 'number',
            label: t('common.number'),
            content: <NumberContent setOnSubmit={handleSetOnSubmit(handleNumbers)} shouldFormReset={isAddMoreEnabled}/>
        },
        {
            key: 'quote',
            label: t('common.quote'),
            content: <QuoteContent setOnSubmit={handleSetOnSubmit(handleQuote)} shouldFormReset={isAddMoreEnabled}/>
        },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionChange = (event) => {
        const newOption = options.find((opt) => opt.key === event);
        setSelectedOption(newOption);
    };

    const handleToggle = () => {
        // When toggling, clear the selected option and set the toggle state
        // setSelectedOption(options[0]);
        setIsAddMoreEnabled(!isAddMoreEnabled);
    };

    return (
        <form onSubmit={handleClickSaveSubmit}>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                {t('common.selectOption')}
            </Dialog.Title>
            <div className="my-4 space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="option"
                        className="block text-sm font-medium text-gray-700"
                    >
                        {t('common.chooseOption')}:
                    </label>
                    <Select
                        items={options}
                        selected={selectedOption}
                        setSelected={handleOptionChange}
                    ></Select>
                </div>
                {selectedOption && (
                    <div>{options.find((opt) => opt.key === selectedOption.key).content}</div>
                )}
            </div>
            <Switch.Group as='div' className={'flex items-center'}>
                <Switch
                    checked={isAddMoreEnabled}
                    onChange={handleToggle}
                    className={`${
                        isAddMoreEnabled ? 'bg-green-500' : 'bg-gray-300'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                    <span className="sr-only">{t('common.continueAdd')}</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            isAddMoreEnabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                </Switch>
                <Switch.Label className="ml-4">{t('common.continueAdd')}</Switch.Label>
            </Switch.Group>
            <div className="mt-6 flex justify-between">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md mr-2"
                >
                    {t('common.close')}
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    {t('common.save')}
                </button>
            </div>
        </form>
    );
}

export default CreateFeature;
