import {createBy, getBy, updateById} from "../api/firebase/api.js";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {parseLink} from "../lib/parseLink";

export const useExistCreate = (path = "names",userId = null, orderBy = "name", ) => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    return async (formData)=> {
        const snapshot = await getBy(formData, path, orderBy);
        if (snapshot.exists()) {
            const [[key, val]] = Object.entries(snapshot.val())
            await updateById(path, key, {
                ...formData,
                usage_count: val.usage_count + 1,
                link: parseLink(formData.link),
                href: formData.link,
                userId
            })
            enqueueSnackbar(t('common.updated'), {
                variant: 'success',
            })
        } else {
            await createBy(path, {
                usage_count: 1,
                ...formData,
                link: parseLink(formData.link),
                href: formData.link,
                userId
            })
            enqueueSnackbar(t('common.created'), {
                variant: 'success',
            })
        }
    }
}
