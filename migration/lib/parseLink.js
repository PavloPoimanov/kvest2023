export function parseLink(inputString) {
    const regex = /^(\d+)?\s?(.+?)\s(\d+)(:(\d+))?$/; // The modified regular expression pattern
    const match = inputString.match(regex);
    if (match) {
        const bookId = match[1] ? match[1] + " " + match[2]: match[2];
        const chapterId = match[3];
        const verseId = match[5];

        return {bookId, chapterId, verseId}
    } else {
        console.log("No match found.", inputString);
    }
}
