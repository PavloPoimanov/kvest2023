import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import React from "react";
import {DeleteIconButton} from "./DeleteIconButton";
import {useFireBase} from "../context/fireBaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {DataTime} from "./DataTime";

export function QuoteListItem(props) {
    const {auth} = useFireBase();
    const [loggedUser] = useAuthState(auth);
    return (
        <div className="bg-gray-100 p-4 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            <div className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out mb-2">
                {props.item.author}
            </div>
            <div className="border-l-4 border-gray-800 pl-4 italic text-gray-700 text-sm py-2 hover:text-blue-500 transition duration-300 ease-in-out">
                {props.item.quote}
            </div>
            <div className="flex justify-between mt-2">
                <DataTime created={props.item?.created} updated={props.item?.updated}></DataTime>
                <Link
                    to={makeLink(props.item.link)}
                    className="text-blue-500 hover:underline text-sm"
                >
                    {props.item.href}
                </Link>
            </div>
            {loggedUser && <DeleteIconButton onDelete={props.onDelete}/>}
        </div>
    );
}
