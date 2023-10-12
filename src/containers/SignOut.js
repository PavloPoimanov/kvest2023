import {useFireBase} from "../context/fireBaseContext";
import {useSignOut} from "react-firebase-hooks/auth";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

export const SignOut = ({
                     onSignOut = () => {
                     }
                 }) => {
    const {auth} = useFireBase()
    const [signOut, loading, error] = useSignOut(auth);
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>{t('common.loading')}</p>;
    }
    return (
        <button
            className="mt-4 text-left w-full  hover:bg-gray-700 hover:text-white -mx-3 block rounded-md px-3 py-2 text-base font-medium"
            onClick={async () => {
                const success = await signOut();
                if (success) {
                    enqueueSnackbar(t('common.logoutSuccess'), {variant: "info"});
                    onSignOut(success);
                }
            }}
        >
            {t('common.logout')}

        </button>
    );
};
