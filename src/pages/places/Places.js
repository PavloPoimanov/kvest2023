import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {useDelete} from "../../hooks/useDelete";
import {PlaceListItem} from "../../components/PlacesListItem";

function Places() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'places')));
    const items = snapshots.map(e => {
        const val = e.val();
        return ({...val, id: e.key, place: val.name});
    })
    const deleteName = useDelete("places")

    return <DataList items={items} loading={loading} error={error} sortingKeys={["place", "description"]}
                     defaultSortKey={"place"}>
        {(item) => (<PlaceListItem key={item.id} item={item} onDelete={() => deleteName(item.id)}/>)}
    </DataList>
}

export default Places;
