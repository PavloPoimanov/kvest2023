import { getDatabase, ref, set } from "firebase/database";

export const create = ({id, name, description, first_mention, usage_count}) => {
    const db = getDatabase();
    set(ref(db, 'names/' + id), {
        name,
        description,
        first_mention,
        usage_count,
    });
};
