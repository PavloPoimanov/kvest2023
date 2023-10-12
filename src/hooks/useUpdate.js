import {getBy, updateById} from "../api/firebase/api.js";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {useConfirm} from "./useConfirm";
import {get, getDatabase, query, ref} from "firebase/database";

export const useUpdate = (path = "names", user = null, orderBy = "name",) => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const {confirm} = useConfirm();
    const saveData = async (key, val, formData) => {
        if (await confirm(
            t('common.sureToOverwrite'),
            <></>,
            {yes: t('common.update'), no: t('common.close')}
        )
        ) {
            await updateById(path, key, {
                ...val,
                name: formData.name.trim(),
                description: formData.description.trim(),
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
    return async (formData) => {
        const snapshot = await getBy(formData, path, orderBy);
        let key, val;

        if (!snapshot.exists()) {
            const snapshotById = await get(ref(getDatabase(), `${path}/${formData.id}`));
            key = snapshotById.key;
            val = snapshotById.val();
        } else {
            let [[keyFromName, valFromName]] = Object.entries(snapshot.val())
            key = keyFromName;
            val = valFromName;
        }
        await saveData(key, val, formData)

    }
}
