import {removeByKey} from "../api/firebase/api.js";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {useConfirm} from "./useConfirm";

export const useDelete = (path = "names") => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const {confirm} = useConfirm();
    return async (key) => {
        await confirm(t('common.sureToDelete'), t('common.sureToDeleteDescription'))
        && await removeByKey(path, key)
        && enqueueSnackbar(t('common.deleted'), {
            variant: 'error',
        })
    }
}
