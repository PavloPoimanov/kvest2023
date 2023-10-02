import {Popover, Transition} from "@headlessui/react";
import {UserCircleIcon} from "@heroicons/react/20/solid";
import {Fragment} from "react";
import {UserInfo} from "./UserInfo";

export function UserInfoPopover({user}) {
    return (
        <Popover className="relative">
            {({open}) => (
                <>
                    <Popover.Button
                        className={`
              ${open ? '' : 'text-opacity-90'}
              group inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        {/* Replace "Solutions" with the InformationCircleIcon */}
                        <UserCircleIcon
                            className={`${open ? '' : 'text-opacity-70'}
                   h-5 w-5 text-gray-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute right-1 z-10 ">
                            <UserInfo user={user}/>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
