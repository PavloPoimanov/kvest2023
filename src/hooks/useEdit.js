import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {useConfirm} from "./useConfirm";
import {removeByKey} from "../api/firebase/api";
import {usePopupDialog} from "../context/dialogContext";
import {NameContent} from "../components/create/NameContent";
import React, {useRef} from "react";
import {makeLink} from "../lib/makeLink";
import {useExistCreate} from "./useExistCreate";
import {useAuthState} from "react-firebase-hooks/auth";
import {useFireBase} from "../context/fireBaseContext";
import {useUpdate} from "./useUpdate";

export const useEdit = (path = "names", Content) => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const {confirm} = useConfirm();
    const {openModal, closeModal} = usePopupDialog();
    const submitRef = useRef();
    const {auth} = useFireBase();
    const [user] = useAuthState(auth);
    const handle = useUpdate(path, user)

    const handleSetOnSubmit = (sendRequest) => (onSubmit) => {
        submitRef.current = {onSubmit, sendRequest}
    }
    const handleClickSaveSubmit = (event) => {
        event.preventDefault();
        submitRef.current.onSubmit((formData) => {
            submitRef.current.sendRequest(formData)
        });
    }
    return async (item ) => {
        openModal({content: <form onSubmit={handleClickSaveSubmit}>
                <Content setOnSubmit={handleSetOnSubmit(handle)} initialValues={item} shouldFormReset={true} />
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={closeModal}
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

            </form>})
    }
}
