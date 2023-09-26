import React from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";

export const Select = ({items, selected, setSelected, toggleSortDirection, sortDirection}) => {
    return (
        <div className="w-full">
            <Listbox value={selected.key} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="flex gap-2">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:text-sm">
                            <span className="block truncate">{selected.label}</span>
                        </Listbox.Button>
                        <button
                            className="shadow-mdcursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:text-sm"
                            onClick={toggleSortDirection}
                        >
                            {sortDirection === 'asc' ? (
                                <ChevronUpIcon className="w-4 h-4"/>
                            ) : (
                                <ChevronDownIcon className="w-4 h-4"/>
                            )}
                        </button>
                    </div>
                    <Transition
                        as={React.Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {items.map((item) => (
                                <Listbox.Option
                                    key={item.key}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-light-blue-gray text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={item.key}
                                >
                                    {({selected}) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {item.label}
                      </span>
                                            {selected ? (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
