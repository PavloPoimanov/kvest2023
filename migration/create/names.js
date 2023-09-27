import {names} from "../data/names.js";
import {createName} from "../api/firebase/api.js";
import {parseLink} from "../lib/parseLink.js";

const result = {}

Object.entries(names).forEach(([key, value]) => {
    value.forEach((nameItem) => {
        if (!result[nameItem.name]) {
            result[nameItem.name] = nameItem
        } else {
            result[nameItem.name].usage_count += nameItem.usage_count
        }
    })
})

Object.entries(result).forEach(([key, e]) => {
    createName({...e, link: parseLink(e.first_mention)}).then(() => {
        console.log('name:migration successful', e)
    }).catch((er) => {
        console.log('name:migration fail', er)
    })
})
