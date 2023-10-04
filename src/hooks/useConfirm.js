import {useCallback} from 'react'
import {usePopupDialog} from "../context/dialogContext";
import {Dialog} from '@headlessui/react'
import {useTranslation} from "react-i18next";

export const useConfirm = () => {
    const {openModal, closeModal} = usePopupDialog()
    const {t} = useTranslation()

    const confirm = useCallback((text, content, confirmText) => {
        let resolveCallback
        const handleConfirm = (isConfirmed) => {
            closeModal()
            resolveCallback(isConfirmed)
        }
        openModal({
            content: (
                <Dialog.Panel>
                    <Dialog.Title className="text-red-600 text-xl font-semibold transition-opacity duration-300">{text}</Dialog.Title>
                    <Dialog.Description className="text-red-600 transition-opacity duration-300">
                        {content}
                    </Dialog.Description>
                    <div className="mt-4 space-x-4 w-full flex justify-between transition-opacity duration-300">
                        <button
                            onClick={() => handleConfirm(true)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-red-200 transition-all duration-300"
                        >
                            {t('common.deleteConfirm')}
                        </button>
                        <button
                            onClick={() => closeModal(false)}
                            className="border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-200 transition-all duration-300"
                        >
                            {t('common.close')}
                        </button>
                    </div>
                </Dialog.Panel>
            )
        })
        return new Promise((resolve) => {
            resolveCallback = resolve
        })
    }, [closeModal, openModal])
    return {confirm}
}
