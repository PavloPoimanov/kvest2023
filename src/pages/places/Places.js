import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {Link} from "react-router-dom";
import {makeLink} from "../../lib/makeLink";

export const PlaceListItem = ({item: {place, description, link, href}}) => {
    return (
        <div className="bg-gray-100 p-4 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            <div className="text-lg font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">
                {place}
            </div>
            <div className="italic text-gray-700 text-sm my-2 hover:text-blue-500 transition duration-300 ease-in-out">
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
        </div>
    );
}

function Places() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'places')));
    const items = snapshots.map(e => {
        const val = e.val();
        return ({...val, id: e.key, place: val.name});
    })

    return <DataList items={items} loading={loading} error={error} sortingKeys={["place", "description"]}
                     defaultSortKey={"place"}>
        {(item)=>(<PlaceListItem key={item.id} item={item}/>)}
    </DataList>
}

export default Places;
