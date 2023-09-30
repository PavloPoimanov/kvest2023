import {Fragment, useState} from 'react'
import {Disclosure, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {Logo} from "./Logo";
import {Link} from "react-router-dom";
import {useAppPopupDialog} from "../context/dialogContext";
import {PlusIcon} from "@heroicons/react/20/solid";
import {useTranslation} from "react-i18next";
import CreateFeature from "../containers/CreateFeature";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function IconButton({onClick}) {
    const {t} = useTranslation()
    return (
        <div className="relative inline-block">
            <button
                onClick={onClick}
                className={`flex gap-2 items-center focus:outline-none bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-600 rounded-full p-2`}
            >
                <span className='hidden md:block'>{t('common.add')}</span>
                <PlusIcon className="w-5 h-5"/>
            </button>
        </div>
    );
}

export const Navbar = ({navigation}) => {
    const {openModal, closeModal} = useAppPopupDialog();

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open, close}) =>
                (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button
                                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5"/>
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <Logo close={close}/>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 sm:right-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/*<LanguageSwitch/>*/}
                                    <IconButton onClick={() => openModal({content: <CreateFeature onClose={closeModal}/>})}/>
                                </div>
                            </div>
                        </div>
                        <Transition
                            as={Fragment}
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="sm:hidden fixed w-full bg-gray-700 z-50 h-full" static>
                                <div className="space-y-1 px-2 pb-3 pt-2">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as={Link}
                                            to={item.to}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
        </Disclosure>
    )
}
