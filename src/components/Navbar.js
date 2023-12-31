import {useState} from 'react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {Logo} from "./Logo";
import {Link} from "react-router-dom";
import {usePopupDialog} from "../context/dialogContext";
import {useTranslation} from "react-i18next";
import {useFireBase} from "../context/fireBaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {Dialog, Popover} from '@headlessui/react'
import {AddButton} from "./AddButton";
import {UserInfo} from "./UserInfo";
import {UserInfoPopover} from "./UserInfoPopover";
import {useAuthorization} from "../hooks/useAuthorization";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const Navbar = ({navigation}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {t} = useTranslation()

    const {openModal, closeModal} = usePopupDialog();
    const {auth} = useFireBase();
    const [user] = useAuthState(auth);
    const {authorized} = useAuthorization(user)

    return (<header className="bg-gray-800">
        <nav className="mx-auto flex max-w-6xl items-center h-16 px-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                {authorized && <AddButton openModal={openModal} closeModal={closeModal} user={user}/>}
            </div>
            <div className="flex lg:flex-1 flex-grow justify-center">
                <Logo/>
            </div>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md text-gray-400"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">{t('common.openSideMenu')}</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (<Link
                    key={item.name}
                    to={item.to}
                    className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </Link>))}

            </Popover.Group>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {!user && <Link to="/signin"
                                className=" flex gap-2 items-center -mx-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
                    {t('common.auth')}
                    <ArrowRightIcon className='w-4 h-4'></ArrowRightIcon>
                </Link>}
                {user && <UserInfoPopover user={user}/>}
            </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10"/>
            <Dialog.Panel
                className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-800 px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between h-16 md:flex-row-reverse">
                    {authorized && <div className='md:hidden block'><AddButton
                        user={user}
                        onClick={() => setMobileMenuOpen(false)}
                        openModal={openModal} closeModal={closeModal}/></div>}
                    <div className='md:hidden block'><Logo
                        onClick={() => setMobileMenuOpen(false)}
                    /></div>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-400 "
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-white/10">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (<Link
                                onClick={() => setMobileMenuOpen(false)}
                                key={item.name}
                                to={item.to}
                                className={classNames(item.current ? 'bg-gray-900 text-white hover:bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white', '-mx-3 block rounded-md px-3 py-2 text-base font-medium')}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>))}

                        </div>
                        {!user &&
                            <div className="py-6 w-full">
                                <Link to="/signin"
                                      onClick={() => setMobileMenuOpen(false)}
                                      className=" flex gap-2 items-center -mx-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
                                    {t('common.auth')}
                                    <ArrowRightIcon className='w-4 h-4'></ArrowRightIcon>
                                </Link>
                            </div>}
                        {user && <UserInfo user={user} onSignOut={() => {
                            setMobileMenuOpen(false)
                            window.location.reload(false)
                        }}/>}

                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    </header>);
}
