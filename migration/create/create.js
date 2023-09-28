import {names} from "../data/names.js";
import {createName, createNumber, createText} from "../api/firebase/api.js";
import {parseLink} from "../lib/parseLink.js";
import {text} from "../data/text.js";
import {numbers} from "../data/numbers.js";

export const createNames = () => {

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
}

export const createTexts = () => {

    const result = []


    Object.entries(text).forEach(([bookChapterKey, value]) => {
        const {bookId, chapterId} = parseLink(bookChapterKey)

        result.push({
            bookId,
            chapterId,
            value
        })
    })

    result.forEach((e) => {
        createText({...e}).then(() => {
            console.log('text:migration successful', e)
        }).catch((er) => {
            console.log('text:migration fail', er)
        })
    })

}

export const createNumbers = () => {
    numbers.forEach((e) => {
        createNumber(e).then(() => {
            console.log('numbers:migration successful', e)
        }).catch((er) => {
            console.log('numbers:migration fail', er)
        })
    })
}
