import {createBy, getBy, updateById} from "../api/firebase/api.js";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {parseLink} from "../lib/parseLink";
import {useConfirm} from "./useConfirm";

export const useUpdate = (path = "names", user = null, orderBy = "name",) => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const {confirm} = useConfirm();
    return async (formData) => {
        const snapshot = await getBy(formData, path, orderBy);
        if (snapshot.exists()) {
            const [[key, val]] = Object.entries(snapshot.val())
           if (await confirm(
                t('common.sureToOverwrite'),
                <></>,
                {yes: t('common.update'), no: t('common.close')}
            )
            ) {
                await updateById(path, key, {
                    ...val,
                    ...formData,
                    users: {
                        ...val.users,
                        ...{[user.uid]: {name: user.displayName, email: user.email}}
                    },
                    user: {name: user.displayName, email: user.email, uid: user.uid},
                    updated: new Date().toISOString()
                })
                enqueueSnackbar(t('common.updated'), {
                    variant: 'success',
                })
            }
        }
    }
}
