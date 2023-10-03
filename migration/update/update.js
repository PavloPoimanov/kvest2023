import {getByPath, updateById} from "../api/firebase/api.js";

const currentUsers = {
    '6LZhpZ46evbw5GiAObscMnekExz2': {email: 'artem.poimanov@gmail.com', name: "Артем"},
    'stRY6CycceNIUVCwyBKFnpjKlys1': {email: 'zinovevav019@gmail.com', name: "Віка"},
    'JZ164U6yGNM9DxKvnrF2r2JQFaV2': {email: 'kvladik133@gmail.com', name: "Владік"},
    'gzXf7VgZJbTWSqPLO2B7FrvGnpL2': {email: 'pauluxxx746@gmail.com', name: "Павло"}
}
export const namesMigration = (items) => e => {
    const {created, description, links, name, usage_count, userId} = e.val();
    const users = userId ? {[userId]: currentUsers[userId]} : {};
    items[e.key] = {
        description,
        links,
        name,
        usage_count,
        created: created ?? new Date().toISOString(),
        updated: new Date().toISOString(),
        users
    };
}
export const placesMigration = (items) => e => {
    const {created, description, links, name, userId} = e.val();
    const users = userId ? {[userId]: currentUsers[userId]} : {};
    items[e.key] = {
        description,
        links,
        name,
        created: created ?? new Date().toISOString(),
        updated: new Date().toISOString(),
        users
    };
}
export const numbersMigration = (items) => e => {
    const {created, description, link, href, name, userId} = e.val();
    const users = userId ? {[userId]: currentUsers[userId]} : {};
    items[e.key] = {
        description,
        link,
        href,
        name,
        created: created ?? new Date().toISOString(),
        updated: new Date().toISOString(),
        users
    };
}
export const quotesMigration = (items) => e => {
    const {created, description, link, href, name, userId} = e.val();
    const users = userId ? {[userId]: currentUsers[userId]} : {};
    items[e.key] = {
        description,
        link,
        href,
        name,
        created: created ?? new Date().toISOString(),
        updated: new Date().toISOString(),
        users
    };
}
export const migrateData = (path, mapClb) => async () => {
    const snapshots = await getByPath(path);
    const items = {}

    snapshots.forEach(mapClb(items))
    for (const [key, val] of Object.entries(items)) {
        await updateById(path, key, val)
        console.log('migration:', path, key, val)
    }
}
