import {names} from "../data/names.js";
import {create} from "../api/firebase/names.js";

const result = {}

Object.entries(names).forEach(([key, value])=>{
    value.forEach((nameItem)=>{
        if (!result[nameItem.name]){
            result[nameItem.name] = nameItem
        }else{
            result[nameItem.name].usage_count += nameItem.usage_count
        }
    })
})

Object.entries(result).forEach(([key, e]) => {
    create({ ...e}).then(() => {
        console.log('name:migration successful', e)
    }).catch((er) => {
        console.log('name:migration fail', er)
    })
})
