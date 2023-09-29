import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import React from "react";

export function QuoteListItem({item: {author, quote, link, href}}) {
    return (
        <div className="bg-gray-100 p-4 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            <div className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out mb-2">
                {author}
            </div>
            <div className="border-l-4 border-gray-800 pl-4 italic text-gray-700 text-sm py-2 hover:text-blue-500 transition duration-300 ease-in-out">
                {quote}
            </div>
            <div className="flex justify-end mt-2">
                <Link
                    to={makeLink(link)}
                    className="text-blue-500 hover:underline text-sm"
                >
                    {href}
                </Link>
            </div>
        </div>
    );
}
