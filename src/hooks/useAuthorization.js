import {get, getDatabase, query, ref} from "firebase/database";
import {useEffect, useState} from "react";

export const useAuthorization = (user, role = 'admin') => {
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await get(query(ref(getDatabase(), `users/${user.uid}/roles/${role}`)))
            setAuthorized(!!res.val())
        }

        if (user) {
            fetchData().catch();
        }
    }, [user, role]);

    return {authorized}
}
