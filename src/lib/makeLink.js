export function makeLink(link) {
    return link.bookId ? `/text/${link.bookId}/${link.chapterId}/${link.verseId}` : ""
}
