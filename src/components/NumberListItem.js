import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import React from "react";
import {DeleteIconButton} from "./DeleteIconButton";

export const NumberListItem = ({item: {number, description, href, link}, onDelete}) => {
    return (
        <div className="bg-gray-100 p-4 shadow-lg rounded-lg transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
                <span
                    className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">{number}</span>
                <span
                    className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out mx-2">-</span>
                <span
                    className="italic text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out text-sm py-2">
        {description}
      </span>
            </div>

            <div className="flex justify-end mt-2">
                <Link
                    to={makeLink(link)}
                    className="text-blue-500 hover:underline text-sm"
                >
                    {href}
                </Link>
            </div>
            <DeleteIconButton onDelete={onDelete}/>
        </div>
    );
};
