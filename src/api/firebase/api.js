import {
    child,
    equalTo,
    get,
    getDatabase,
    limitToFirst,
    orderByChild,
    push,
    query,
    ref,
    remove,
    set,
    update
} from "firebase/database";

export const getBy = (obj, path, orderBy, limit = 1) => {
    const constrain = []
    if (orderBy) {
        constrain.push(orderByChild(orderBy))
    }
    if (obj) {
        constrain.push(equalTo(obj[orderBy]))
    }
    if (limit) {
        constrain.push(limitToFirst(limit))
    }

    return get(query(ref(getDatabase(), path), ...constrain))
}

export const updateById = (path, key, data) => {
    const db = getDatabase();

    return update(ref(db, path), {
        [key]: data
    });
}
export const createBy = (path, data) => {
    const db = getDatabase();
    const namesRef = ref(db, path);
    const newPostRef = push(namesRef);

    return set(newPostRef, data);
}
export const create = (path, key, data) => {
    const db = getDatabase();
    const namesRef = ref(db, path);

    return set(child(namesRef, key), data);
}
export const removeByKey = (path, key) => {
    const db = getDatabase();
    const namesRef = ref(db, path);
    return remove(child(namesRef, key));
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
