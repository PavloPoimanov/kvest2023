import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {NumberListItem} from "../../components/NumberListItem";
import {useDelete} from "../../hooks/useDelete";
import {useFilter} from "../../hooks/useFilter";

function Numbers() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'numbers')));
    const items = snapshots.map(e => {
        const val = e.val()
        return ({...val, id: e.key, number: val.name});
    })
    const deleteName = useDelete("numbers")
    const {filterComponent, filterClb} = useFilter({initData: items})

    return <DataList items={items}
                     loading={loading}
                     error={error}
                     sortingKeys={["number", "description"]}
                     filter={filterComponent}
                     filterClb={filterClb}
                     defaultSortKey={"number"}>
        {(item) => (<NumberListItem key={item.id} item={item} onDelete={() => deleteName(item.id)}/>)}
    </DataList>
}

export default Numbers;
