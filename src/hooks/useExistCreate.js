import {createBy, getBy, updateById} from "../api/firebase/api.js";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {parseLink} from "../lib/parseLink";
import {useConfirm} from "./useConfirm";

export const useExistCreate = (path = "names", user = null, orderBy = "name",) => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const {confirm} = useConfirm();
    return async (formData) => {
        const snapshot = await getBy(formData, path, orderBy);
        if (snapshot.exists()) {
            if (await confirm(t('common.sureToOverwrite'), t('common.sureToOverwriteDescription'))) {
                const [[key, val]] = Object.entries(snapshot.val())
                await updateById(path, key, {
                    ...formData,
                    usage_count: val.usage_count + 1,
                    link: parseLink(formData.link),
                    href: formData.link,
                    links: val.links ? {
                        ...val.links, ...{[formData.link]: parseLink(formData.link)}
                    } : {[formData.link]: parseLink(formData.link)},
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
        } else {
            await createBy(path, {
                usage_count: 1, ...formData,
                link: parseLink(formData.link),
                href: formData.link,
                users: {[user.uid]: {name: user.displayName, email: user.email}},
                links: {[formData.link]: parseLink(formData.link)},
                updated: new Date().toISOString(),
                created: new Date().toISOString(),
            })
            enqueueSnackbar(t('common.created'), {
                variant: 'success',
            })
        }
    }
}
