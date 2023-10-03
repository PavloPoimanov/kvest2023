import {useTranslation} from "react-i18next";
import {Popover, Transition} from "@headlessui/react";
import {FunnelIcon} from "@heroicons/react/20/solid";
import React, {Fragment} from "react";

export const UserFilter = ({usersList, filteredItems, allItems, filterState, setFilterState}) => {
    const {t} = useTranslation()

    function handleUserFilterChange(userKeyToToggle) {

        setFilterState((prev) => {
            const foundedAlready = prev.users.find(e => e === userKeyToToggle)
            let newUsersSelected = [...prev.users]
            if (foundedAlready) {
                // remove it
                newUsersSelected = newUsersSelected.filter((prevUser) => prevUser !== userKeyToToggle)
            } else {
                // add it
                newUsersSelected = [...newUsersSelected, userKeyToToggle]
            }
            return ({...prev, users: newUsersSelected});
        })

    }

    return <Popover className='relative'>
        {({open}) => (<>
            <Popover.Button
                className="cursor-default flex rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:text-sm"
            >
                <FunnelIcon className='w-5 h-5'/>
                {filterState.users.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            {filterState.users.length}
          </span>
                )}
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel
                    className="z-20 mt-2 absolute right-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                    {/* Add your filter options here */}
                    <div className="p-4 space-y-2">
                        {usersList && Object.entries(usersList).map(([key, user]) => (
                            <label
                                key={key}
                                className="flex items-center space-x-2 cursor-pointer hover:text-indigo-600 transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    checked={filterState.users.includes(key)}
                                    onChange={() => handleUserFilterChange(key)}
                                />
                                <span className="text-gray-800">{user.name ?? user.email}</span>
                            </label>
                        ))}
                    </div>
                </Popover.Panel>
            </Transition>
        </>)}
    </Popover>
}
