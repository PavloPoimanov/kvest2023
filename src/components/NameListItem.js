import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import {DeleteIconButton} from "./DeleteIconButton";
import {useAuthState} from "react-firebase-hooks/auth";
import {useFireBase} from "../context/fireBaseContext";
import React from "react";
import {ShowMore} from "./ShowMore";
import {DataTime} from "./DataTime";


export const NameListItem = (props) => {
    const {auth, googleProvider} = useFireBase();
    const [loggedUser] = useAuthState(auth);

    return (
        <div
            className="bg-gray-100 p-4 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            <div className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">
                {props.item.name}
            </div>
            <div className="text-gray-700 text-sm my-2 hover:text-blue-500 transition duration-300 ease-in-out">
                {props.item.description}
            </div>

            <div className="flex justify-between mt-2 items-center">
                <DataTime created={props.item?.created} updated={props.item?.updated}></DataTime>
                <ShowMore items={Object.entries(props.item?.links).map(([key, value]) => ({key, ...value}))}>
                    {(item) => (
                        <Link
                            key={item.key}
                            to={makeLink(item)}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            {item.key}
                        </Link>
                    )}
                </ShowMore>
            </div>
            {loggedUser && <DeleteIconButton onDelete={props.onDelete}/>}
        </div>
    );
}
