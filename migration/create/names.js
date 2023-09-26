import {names} from "../data/names.js";
import {create} from "../api/firebase/names.js";

names.concat(names).concat(names).forEach((e) => {
    create({ ...e}).then(() => {
        console.log('name:migration successful', e)
    }).catch((er) => {
        console.log('name:migration fail', er)
    })
})
