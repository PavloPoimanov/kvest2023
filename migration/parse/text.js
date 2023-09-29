import {textRawKhronik1, textRawSamuel1, textRawSamuel2} from "../data/textRawSamuel1.js";

export function parseText() {
    const textBook = {};

    function makeBook(rawValue, bookName = `1 Самуїлова`) {
        // rawValue.
        const bookPattern = new RegExp(bookName + ` (\\d+)$`, '');
        const res = bookPattern.exec(rawValue)

        const bookChapter = res[0];
        // Replace superscript numbers with regular numbers
        const text = rawValue
            .replace(/⁰/g, '0')
            .replace(/¹/g, '1')
            .replace(/²/g, '2')
            .replace(/³/g, '3')
            .replace(/⁴/g, '4')
            .replace(/⁵/g, '5')
            .replace(/⁶/g, '6')
            .replace(/⁷/g, '7')
            .replace(/⁸/g, '8')
            .replace(/⁹/g, '9')
            .replace(bookChapter, '');
        const verseObj = {};

        // const verseIndexes = text.match(/(\b\d+\b)/g); goog capture the index
        const versePattern = /(\d+)\s(.*?)(?=\d+\s|$)/gs;
        let match;
        const verses = [];

        while ((match = versePattern.exec(text))) {
            const verseIndex = match[1];
            const verseText = match[2].trim();
            verses.push({verseIndex, verseText});
        }

        if (verses.length > 0) {
            verses.forEach((verse) => {
                verseObj[verse.verseIndex] = verse.verseText
            });
        } else {
            console.log("No verses found.");
        }
        return {
            bookChapter,
            verseObj
        }
    }

    textRawSamuel1.forEach((rawValue) => {
        const {bookChapter, verseObj} = makeBook(rawValue, `1 Самуїлова`)
        textBook[bookChapter] = verseObj
    })
    textRawSamuel2.forEach((rawValue) => {
        const {bookChapter, verseObj} = makeBook(rawValue, `2 Самуїлова`)
        textBook[bookChapter] = verseObj
    })
    textRawKhronik1.forEach((rawValue) => {
        const {bookChapter, verseObj} = makeBook(rawValue, `1 Хроніки`)
        textBook[bookChapter] = verseObj
    })


    return textBook
}

