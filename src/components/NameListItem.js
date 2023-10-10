import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import {DeleteIconButton} from "./DeleteIconButton";
import {useAuthState} from "react-firebase-hooks/auth";
import {useFireBase} from "../context/fireBaseContext";
import React from "react";
import {ShowMore} from "./ShowMore";
import {DataTime} from "./DataTime";
import {useTranslation} from "react-i18next";
import {getUserInfo} from "../lib/getUserInfo";
import {useAuthorization} from "../hooks/useAuthorization";


export const NameListItem = (props) => {
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
        <div
            className="bg-gray-100 p-4 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            <div className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">
                {props.item.name}
            </div>
            <div className="text-gray-700 italic text-sm my-2 hover:text-blue-500 transition duration-300 ease-in-out">
                {props.item.description}
            </div>
            {lastUpdatedUser &&
                <div className="text-gray-700 text-xs my-2 hover:text-blue-500 transition duration-300 ease-in-out">
                    {t("common.lastUpdatedBy")} {lastUpdatedUser}
                </div>}

            <div className="flex justify-between mt-2 items-center">
                <DataTime created={props.item?.created} updated={props.item?.updated}></DataTime>
                {props.item?.links && <ShowMore items={Object.entries(props.item?.links).map(([key, value]) => ({key, ...value}))}>
                    {(item) => (
                        <Link
                            key={item.key}
                            to={makeLink(item)}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            {item.key}
                        </Link>
                    )}
                </ShowMore>}
            </div>
            {authorized && <DeleteIconButton onDelete={props.onDelete}/>}
        </div>
    );
}
