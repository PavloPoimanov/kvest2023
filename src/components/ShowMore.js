import {useAppPopupDialog} from "../context/dialogContext";
import {EllipsisHorizontalCircleIcon} from "@heroicons/react/20/solid";
import React from "react";
const show = 1

export function ShowMore({children, items}) {
    const all = items.map(children)
    const {openModal, closeModal} = useAppPopupDialog();
    // we use modal because it has portal
    const mainItems = all.slice(0, show)
    return (
        <div className='flex items-center overflow-auto gap-2'>
            {mainItems}
            {all.length > show &&
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md text-gray-400"
                    onClick={() => openModal({content: <div className='flex flex-col gap-2 max-h-40 overflow-auto' onClick={closeModal}>{all}</div>})}
                >
                    <span className="sr-only">selectOption</span>
                    <EllipsisHorizontalCircleIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" aria-hidden="true"/>
                </button>
            }
        </div>)
}
