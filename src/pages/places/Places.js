import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {useDelete} from "../../hooks/useDelete";
import {PlaceListItem} from "../../components/PlacesListItem";
import {useFilter} from "../../hooks/useFilter";
import {PlaceContent} from "../../components/create/PlaceContent";
import {useEdit} from "../../hooks/useEdit";

function Places() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'places')));
    const items = snapshots.map(e => {
        const val = e.val();
        return ({...val, id: e.key, place: val.name});
    })
    const deleteName = useDelete("places")
    const {filterComponent, filterClb} = useFilter({initData: items})
    const editPlace = useEdit("places", PlaceContent)

    return <DataList items={items}
                     loading={loading}
                     error={error}
                     sortingKeys={["place", "description"]}
                     filter={filterComponent}
                     filterClb={filterClb}
                     defaultSortKey={"place"}>
        {(item) => (<PlaceListItem key={item.id} item={item} onDelete={() => deleteName(item.id)} onEdit={()=>editPlace(item)} />)}
    </DataList>
}

export default Places;
