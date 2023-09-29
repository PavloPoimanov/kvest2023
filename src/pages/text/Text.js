import {getDatabase, query, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {Select} from "../../components/Select";

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
    const [bookId, setBookId] = useState();


    const navigate = useNavigate();

    const selectedBook = useMemo(() => itemsBooks.find(e => e.bookId === bookId?.key), [itemsBooks.length, bookId])
    const chapters = selectedBook ? Object.keys(selectedBook?.chapters).map(e=>({key: e, label: e})) : []
    const [chapter, setChapter] = useState()
    useEffect(() => {
        if (books.length > 0) {
            setBookScroll(books[0].key)
        }
    }, [books.length]);

    useEffect(() => {
        if (chapters.length > 0) {
            setChapterScroll(chapters[0].key)
        }
    }, [chapters.length]);

    const setBookScroll = (bookId) => {
        const booksNew = books.find(({key}) => key === bookId)
        setBookId(booksNew)
    }

    const setChapterScroll = (val)=>{
        const chapterNew = chapters.find((e)=>e.key === val)
        setChapter(chapterNew)
        scrollTo(`${bookId.key} ${chapterNew.key}`)
    }
    return (
        <div className="p-4">
            {loading ? (
                <div className="text-center text-gray-500">{t('common.loading')}</div>
            ) : error ? (
                <div className="text-center text-red-500">{t('common.error')}</div>
            ) : <div className='flex flex-col gap-2'>
                <div className="w-full flex gap-2">
                    {bookId && <div className='w-full'><Select items={books} selected={bookId} setSelected={setBookScroll}/></div>}
                    {selectedBook && <div className='flex-auto'><Select icon={false} items={chapters} selected={chapter} setSelected={setChapterScroll}/></div>}
                </div>
                <div className="overflow-auto max-h-[calc(100vh-13rem)]">
                    {selectedBook && Object.entries(selectedBook.chapters).map(([chapterId, value]) => {
                        //         console.log(val)
                        return <div key={chapterId}>
                            <h2 className="font-semibold mb-2"
                                data-id={`${bookId.key} ${chapterId}`}>
                                {bookId.label}: {chapterId}
                            </h2>
                            {Object.entries(value).map(([verseId, text]) => {
                                const dataId = `${bookId.key} ${chapterId}:${verseId}`
                                return (
                                    <div
                                        key={dataId}
                                        className={`mb-2 ${dataId === paramsId
                                            ? 'bg-gray-300 hover:bg-gray-400 transition duration-300'
                                            : 'hover:bg-gray-300 transition duration-300'}`}
                                        data-id={dataId}
                                    >
                                        <span className="font-semibold">{verseId}</span>
                                        <span className="ml-2">{text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    })}
                </div>
            </div>}
        </div>
    );
}
