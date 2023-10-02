import React from "react";
import {useTranslation} from "react-i18next";
import {toLongDate} from "../lib/day";

export function DataTime(props) {
    const {t} = useTranslation()
    const updatedAt = `${t("common.updatedAt")} ${toLongDate(props.updated)}`;
    const createdAt = `${t("common.createdAt")} ${toLongDate(props.created)}`;
    return <div className="text-gray-500 text-sm">
        {props.updated ? updatedAt : props.created ? createdAt : ""}
    </div>
}
