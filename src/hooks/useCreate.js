import {createBy} from "../api/firebase/api.js";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {parseLink} from "../lib/parseLink";

export const useCreate = (path = "names", user) => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    return async (formData) => {
        await createBy(path, {
            ...formData,
            link: parseLink(formData.link),
            href: formData.link,
            users: {[user.uid]: {name: user.displayName, email: user.email}},
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        })
        enqueueSnackbar(t('common.created'), {
            variant: 'success',
        })
    }
}
