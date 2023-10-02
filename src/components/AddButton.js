import {useTranslation} from "react-i18next";
import {IconButton} from "./IconButton";
import CreateFeature from "../containers/CreateFeature";
import {PlusIcon} from "@heroicons/react/20/solid";

export function AddButton({
                              closeModal, openModal, compact = true, onClick = () => {
    },
                              user
                          }) {
    const {t} = useTranslation()
    return <IconButton className={"relative inline-block"} onClick={() => {
        onClick()
        openModal({
            content: <CreateFeature onClose={closeModal} userId={user.uid}/>
        })
    }}>
        <span className={compact ? 'hidden md:block' : "block"}>{t('common.add')}</span>
        <PlusIcon className="w-5 h-5"/>
    </IconButton>
}
