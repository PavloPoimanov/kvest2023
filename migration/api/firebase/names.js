import { getDatabase, ref, set, push } from "firebase/database";

export const create = ({name, description, first_mention, usage_count}) => {
    const db = getDatabase();
    const namesRef = ref(db, 'names');
    const newPostRef = push(namesRef);
    return set(newPostRef, {
        name,
        description,
        first_mention,
        usage_count,
    });
};
