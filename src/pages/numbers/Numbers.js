import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {NumberListItem} from "../../components/NumberListItem";
import {useDelete} from "../../hooks/useDelete";

function Numbers() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'numbers')));
    const items = snapshots.map(e => {
        const val = e.val()
        return ({...val, id: e.key, number: val.name});
    })
    const deleteName = useDelete("numbers")

    return <DataList items={items} loading={loading} error={error} sortingKeys={["number", "description"]}
                     defaultSortKey={"number"}>
        {(item) => (<NumberListItem key={item.id} item={item} onDelete={()=>deleteName(item.id)}/>)}
    </DataList>
}

export default Numbers;
