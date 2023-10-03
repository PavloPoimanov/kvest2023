import {getDatabase, ref, set,get, push,query, child, update} from "firebase/database";


export const getByPath = (path) => {
    return get(ref(getDatabase(), path))
}

export const updateById = (path, key, data) => {
    const db = getDatabase();

    return update(ref(db, path), {
        [key]: data
    });
}

export const createName = ({name, description, usage_count, links}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'names');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        usage_count,
        links,
        created: new Date().toISOString()
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
        link: link ? link : "",
        created: new Date().toISOString()
    });
};

export const createPlace = ({name, description, links}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'places');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        links,
        created: new Date().toISOString()
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
        created: new Date().toISOString(),
        link: link ? link : ""
    });
};

export const createText = (value) => {
    const db = getDatabase();
    const textRef = ref(db, 'text');
    const newPostRef = push(textRef);

    return set(newPostRef, value);
};
