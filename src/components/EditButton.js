import {IconButton} from "./IconButton";
import {PencilIcon} from "@heroicons/react/20/solid";
import React from "react";

export const EditIconButton = ({onEdit}) => {
    return <IconButton onClick={onEdit}>
        <PencilIcon className="w-5 h-5"/>
    </IconButton>
}
