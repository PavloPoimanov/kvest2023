import React from 'react';
import DataList from "../../containers/DataList";
import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import {QuoteListItem} from "../../components/QuoteListItem";

function Quotes() {
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'quotes')));
    const items = snapshots.map(e => {
        const val = e.val();
        return ({...val, id: e.key, author: val.name, quote: val.description});
    })

    return <DataList items={items} loading={loading} error={error} sortingKeys={["author", "quote"]}
                     defaultSortKey={"author"}>
        {(item) => <QuoteListItem key={item.id} item={item}/>}
    </DataList>
}

export default Quotes;
