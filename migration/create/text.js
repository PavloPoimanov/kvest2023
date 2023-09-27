import {text} from "../data/text.js";
import {createText} from "../api/firebase/api.js";
import {parseLink} from "../lib/parseLink.js";

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
