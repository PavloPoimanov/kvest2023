import { getDatabase, ref, set, push, child } from "firebase/database";

export const createName = ({name, description, first_mention, usage_count, link}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'names');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        first_mention,
        usage_count,
        link: link ? link : ""
    });
};

export const createText = ({bookId, chapterId, value}) => {
    const db = getDatabase();
    const textRef = ref(db, 'text');
    const newPostRef = push(textRef);

    return set(newPostRef, {bookId, chapterId, value});
};
