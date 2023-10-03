import React, {useState} from "react";
import {UserFilter} from "../components/UserFilter";
import {getUserInfo} from "../lib/getUserInfo";

export function useFilter({initData}) {
    const [filterState, setFilterState] = useState({users: []});
    const usersList = initData.reduce((acc, item) => {
        if (item.users) {
            return {...acc, ...item.users}
        }
        return acc
    }, {});
    const filterComponent = Object.keys(usersList).length ? (props) => <UserFilter {...props}
                                                                      usersList={usersList}
                                                                      filterState={filterState}
                                                                      setFilterState={setFilterState}/> : () => null

    const filterClb = Object.keys(usersList).length ? (item) => {
        const [key] = getUserInfo(item.users)
        if (!filterState.users.length) {
            return true
        }
        // filter exists
        if (!key) {
            // if no one
            // no users
            return false
        }
        // check the state in filters
        return filterState.users.includes(key)
    } : () => true;

    return {filterState, setFilterState, filterComponent, filterClb}
}
