import { getDatabase, ref, set, push, child } from "firebase/database";

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

export const createText = ({bookId, chapterId, value}) => {
    const db = getDatabase();
    const textRef = ref(db, 'text');
    const newPostRef = push(textRef);

    return set(newPostRef, {bookId, chapterId, value});
};
