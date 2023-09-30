import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {Select} from "../../components/Select";

function ChapterTextItem({chapterId, book, verses, active}) {
    return <div className="mb-4">
        <div className="bg-white  rounded-lg shadow-md">
            <h2 className=" px-2 font-semibold mb-2" data-id={`${book.key} ${chapterId}`}>
                {book.label}: {chapterId}
            </h2>
            {Object.entries(verses).map(([verseId, text]) => {
                const dataId = `${book.key} ${chapterId}:${verseId}`;
                return (
                    <div
                        key={dataId}
                        className={`mb-2 p-2 rounded-lg ${
                            active(dataId)
                                ? 'bg-gray-300 hover:bg-gray-400 transition duration-300'
                                : 'hover:bg-gray-300 transition duration-300'
                        }`}
                        data-id={dataId}
                    >
                        <span className="font-semibold">{verseId}</span>
                        <span className="ml-2">{text}</span>
                    </div>
                );
            })}
        </div>
    </div>
}

export const Text = () => {
    const {t} = useTranslation()
    const database = getDatabase();
    const [snapshots, loading, error] = useList(query(ref(database, 'text')));
    const itemsBooks = snapshots.map(e => ({...e.val(), id: e.key}))
    let params = useParams();
    const paramsId = useMemo(() => params.bookId ? `${params.bookId} ${params.chapterId}:${params.verseId}` : null, [params.bookId, params.chapterId, params.verseId])
    const scrollTo = (paramIdToScroll) => {
        const section = document.querySelectorAll(`[data-id='${paramIdToScroll}']`);
        if (section?.length) {
            section[0].scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }
    useEffect(() => {
        scrollTo(paramsId)
    }, [paramsId, snapshots.length]);

    const books = itemsBooks.map(({bookId}) => ({key: bookId, label: bookId}));
    const [book, setBook] = useState();

    const selectedBook = useMemo(() => itemsBooks.find(e => e.bookId === book?.key), [itemsBooks.length, book])
    const chapters = selectedBook ? Object.keys(selectedBook?.chapters).map(e => ({key: e, label: e})) : []
    const [chapter, setChapter] = useState()
    useEffect(() => {
        if (books.length > 0) {
            setBookScroll(params.bookId ? params.bookId : books[0].key)
        }
    }, [books.length, params.bookId]);

    useEffect(() => {
        if (chapters.length > 0) {
            setChapterScroll(params.chapterId ? params.chapterId : chapters[0].key, params.verseId)
        }
    }, [chapters.length, params.chapterId, params.verseId]);

    const setBookScroll = (bookId) => {
        const booksNew = books.find(({key}) => key === bookId)
        setBook(booksNew)
    }

    const setChapterScroll = (val, verseId = null) => {
        const chapterNew = chapters.find((e) => e.key === val)
        setChapter(chapterNew)
        scrollTo(`${book.key} ${chapterNew.key}${verseId ? ":" + verseId : ""}`)
    }
    return (
        <div className="p-4">
            {loading ? (
                <div className="text-center text-gray-500">{t('common.loading')}</div>
            ) : error ? (
                <div className="text-center text-red-500">{t('common.error')}</div>
            ) : <div className='flex flex-col gap-2'>
                <div className="w-full flex gap-2">
                    {book &&
                        <div className='w-full'>
                            <Select items={books}
                                    selected={book}
                                    setSelected={setBookScroll}/>
                        </div>}
                    {selectedBook && <div className='flex-auto'>
                        <Select icon={false}
                                items={chapters}
                                selected={chapter}
                                setSelected={setChapterScroll}/></div>}
                </div>
                <div className="overflow-auto max-h-[calc(100vh-64px-56px-86px)]">
                    {selectedBook && Object.entries(selectedBook.chapters).map(([chapterId, value]) =>
                        (
                            <ChapterTextItem key={chapterId}
                                             verses={value}
                                             book={book}
                                             chapterId={chapterId}
                                             active={(dataId) => dataId === paramsId}/>
                        ))}
                </div>
            </div>}
        </div>
    );
}
