import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {NameListItem} from "../../components/NameListItem";
import {useDelete} from "../../hooks/useDelete";
import {useFilter} from "../../hooks/useFilter";
import {useEdit} from "../../hooks/useEdit";
import {NameContent} from "../../components/create/NameContent";

export const Names = () => {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'names')));
    const items = snapshots.map(e => ({...e.val(), id: e.key}))
    const deleteName = useDelete("names");
    const editName = useEdit("names", NameContent);
    const {filterComponent, filterClb} = useFilter({initData: items})

    return <DataList items={items} loading={loading} error={error}
                     sortingKeys={['name', 'description', 'usage_count', 'created', 'updated']}
                     filter={filterComponent}
                     filterClb={filterClb}
    >
        {(item) => (
            <NameListItem key={item.id} item={item} onDelete={() => deleteName(item.id)} onEdit={()=>editName(item)}/>)}
    </DataList>
}

