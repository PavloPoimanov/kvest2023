import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {NameListItem} from "../../components/NameListItem";


function Names() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'names')));
    const items = snapshots.map(e => ({...e.val(), id: e.key}))
    return <DataList items={items} loading={loading} error={error}>
        {(item) => (<NameListItem key={item.id} item={item}/>)}
    </DataList>
}

export default Names;
