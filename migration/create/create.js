import {names} from "../data/names.js";
import {createName, createNumber, createPlace, createQuote, createText} from "../api/firebase/api.js";
import {parseLink} from "../lib/parseLink.js";
import {numbers} from "../data/numbers.js";
import {places} from "../data/places.js";
import {quotes} from "../data/quotes.js";

export const createTexts = (text) => {

    Object.entries(text).forEach(([bookId, chapters]) => {
        createText({bookId, chapters}).then(() => {
            console.log('text:migration successful', bookId)
        }).catch((er) => {
            console.log('text:migration fail', er)
        })
    })

}

export const createNames = () => {

    const result = {}

    Object.entries(names).forEach(([key, value]) => {
        value.forEach((nameItem) => {
            if (!result[nameItem.name]) {
                result[nameItem.name] = {...nameItem, links: {[nameItem.link]: parseLink(nameItem.link)}}
            } else {
                result[nameItem.name].usage_count += nameItem.usage_count
                result[nameItem.name].links = {...result[nameItem.name].links, ...{[nameItem.link]: parseLink(nameItem.link)}}
            }
        })
    })

    Object.entries(result).forEach(([key, e]) => {
        createName({...e}).then(() => {
            console.log('name:migration successful', e)
        }).catch((er) => {
            console.log('name:migration fail', er)
        })
    })
}

export const createNumbers = () => {
    numbers.forEach((e) => {
        createNumber({...e, href: e.link, link: parseLink(e.link)}).then(() => {
            console.log('numbers:migration successful', e)
        }).catch((er) => {
            console.log('numbers:migration fail', er)
        })
    })
}

export const createPlaces = () => {
    places.forEach((e) => {
        createPlace({...e, links: {[e.link]: parseLink(e.link)}}).then(() => {
            console.log('places:migration successful', e)
        }).catch((er) => {
            console.log('places:migration fail', er)
        })
    })
}

export const createQuotes = () => {
    quotes.forEach((e) => {
        createQuote({...e, href: e.link, link: parseLink(e.link)}).then(() => {
            console.log('quotes:migration successful', e)
        }).catch((er) => {
            console.log('quotes:migration fail', er)
        })
    })
}
