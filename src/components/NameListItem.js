import {Link} from "react-router-dom";
import {makeLink} from "../lib/makeLink";
import {DeleteIconButton} from "./DeleteIconButton";

export const NameListItem = ({item: {name, description, link, href}, onDelete}) => {
    return (
        <div
            className="relative bg-gray-100 p-4 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            <div className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">
                {name}
            </div>
            <div className="text-gray-700 text-sm my-2 hover:text-blue-500 transition duration-300 ease-in-out">
                {description}
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
}