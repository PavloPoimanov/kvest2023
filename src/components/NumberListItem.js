import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import React from "react";
import {DeleteIconButton} from "./DeleteIconButton";
import {useFireBase} from "../context/fireBaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {DataTime} from "./DataTime";
import {getUserInfo} from "../lib/getUserInfo";
import {useTranslation} from "react-i18next";
import {useAuthorization} from "../hooks/useAuthorization";

export const NumberListItem = (props) => {
    const {auth, googleProvider} = useFireBase();
    const [loggedUser] = useAuthState(auth);
    const {authorized} = useAuthorization(loggedUser)
    let lastUpdatedUser = ""
    if (props.item?.users) {
        const [_, userInfo] = getUserInfo(props.item.users);
        lastUpdatedUser = userInfo.name ?? userInfo.email
    }
    const {t} = useTranslation()
    return (
        <div className="bg-gray-100 p-4 pr-8 shadow-lg rounded-lg transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center flex-wrap">
                <span
                    className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">{props.item.number}</span>
                <span
                    className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out mx-2">-</span>
                <span
                    className="italic text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out text-sm py-2">
        {props.item.description}
      </span>
            </div>

            <div className="flex justify-between mt-2 flex-wrap gap-2">
                {lastUpdatedUser &&
                    <div className="text-gray-700 text-xs my-2 hover:text-blue-500 transition duration-300 ease-in-out">
                        {t("common.lastUpdatedBy")} {lastUpdatedUser}
                    </div>}
                <DataTime created={props.item?.created} updated={props.item?.updated}></DataTime>
                <Link
                    to={makeLink(props.item.link)}
                    className="text-blue-500 hover:underline text-sm"
                >
                    {props.item.href}
                </Link>
            </div>
            {authorized && <DeleteIconButton onDelete={props.onDelete}/>}
        </div>
    );
};
