import {equalTo, update, get, getDatabase, orderByChild, push, query, ref, set, limitToFirst} from "firebase/database";

export const getBy = (obj, path, orderBy, limit = 1) => {
    return get(query(ref(getDatabase(), path), orderByChild(orderBy), equalTo(obj[orderBy]), limitToFirst(limit)))
}

export const updateById = (path, key, data)=>{
    const db = getDatabase();

    return update(ref(db, path), {
        [key]: data
    });
}
export const createName = ({name, description, usage_count, link, href}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'names');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        usage_count,
        href,
        link: link ? link : ""
    });
};

export const createNumber = ({name, description, link, href}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'numbers');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        href,
        link: link ? link : ""
    });
};

export const createPlace = ({name, description, link, href}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'places');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        href,
        link: link ? link : ""
    });
};
export const createQuote = ({name, description, link, href}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'quotes');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        href,
        link: link ? link : ""
    });
};

export const createText = (value) => {
    const db = getDatabase();
    const textRef = ref(db, 'text');
    const newPostRef = push(textRef);

    return set(newPostRef, value);
};
