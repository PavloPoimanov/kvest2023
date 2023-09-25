import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Logo = ({close}) => {
    const {t} = useTranslation();

    return <Link to="/" onClick={()=>close()} className="text-2xl text-gray-300 hover:bg-gray-700 font-semibold hover:text-white">
        {t('common.logo')}
    </Link>
}
