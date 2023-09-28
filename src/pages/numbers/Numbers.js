import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";

function Numbers() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'numbers')));
    const items = snapshots.map(e => ({...e.val(), id: e.key}))
    // all items
    return <DataList items={items} loading={loading} error={error} sortingKeys={["name", "description"]}/>
}

export default Numbers;
