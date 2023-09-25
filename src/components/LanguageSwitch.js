import {useTranslation} from "react-i18next";
import {Listbox} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";

const languages = (t) => [
    {value: 'en', name: t('common.en')},
    {value: 'uk', name: t('common.uk')},
]
export const LanguageSwitch = () => {
    const {i18n, t} = useTranslation();

    const languageOptions = [
        {value: 'en', label: t('common.en')},
        {value: 'uk', label: t('common.uk')},
    ];
    const [lang, setLang] = useState(i18n.language)

    useEffect(() => {
        i18n.changeLanguage(lang).catch(e => console.log(e));
    }, [i18n, lang]);

    const changeLanguage = (value) => {
        console.log(value)
        setLang(value)
    }
    const activeLanguage = languages(t).find(e => e.value === lang);

    return (
        <div className="language-switcher">
            <Listbox as="div" className="space-x-2">
                {({open}) => (
                    <>
                        <div className="relative">
                            <Listbox.Button
                                className="bg-white py-2 px-4 border rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-200">
                                {activeLanguage?.name || t('common.lang')}
                            </Listbox.Button>
                            <Listbox.Options
                                className={`${
                                    open ? 'block' : 'hidden'
                                } absolute py-1 mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10`}
                            >
                                {languageOptions.map((lang) => (
                                    <Listbox.Option
                                        key={lang.value}
                                        value={lang.value}
                                        onClick={() => changeLanguage(lang.value)}
                                    >
                                        {({active}) => (
                                            <div
                                                className={`${
                                                    activeLanguage.value === lang.value ? 'bg-blue-100' : ''
                                                } cursor-pointer select-none relative px-4 py-2`}
                                            >
                                                {lang.label}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}
