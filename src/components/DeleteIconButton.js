import {TrashIcon} from "@heroicons/react/20/solid";
import {IconButton} from "./IconButton";

export const DeleteIconButton = ({onDelete}) => {
    return <IconButton className="absolute right-4 top-2 w-6 h-6 text-gray-600 hover:text-gray-800"
                       btnClassName={"flex gap-2 items-center focus:outline-none bg-gray-200 rounded-full p-2 text-gray-600 hover:text-red-700"}
                       onClick={onDelete}>
        <TrashIcon className="w-5 h-5"/>
    </IconButton>
}
