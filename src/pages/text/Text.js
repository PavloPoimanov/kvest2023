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
    const items = snapshots.map(e => ({...e.val(), id: e.key}))
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

    const chapters = items.map((value) => ({
        key: `${(value.bookId)} ${(value.chapterId)}`,
        label: `${(value.bookId)} ${(value.chapterId)}`,
        value
    }));
    const [selectedChapter, setSelectedChapter] = useState();

    useEffect(() => {
        if (chapters.length>0){
            setSelectedChapter(chapters[0])
        }
    }, [chapters.length]);

    const navigate = useNavigate();

    const setChapter = (chapterKey) => {
        const chapterFounded = chapters.find(({key})=>key===chapterKey)
        setSelectedChapter(chapterFounded);
        scrollTo(`${chapterKey}`)
        navigate(`/text/${chapterFounded.value.bookId}/${chapterFounded.value.chapterId}`)
    }

    return (
        <div className="p-4">
            {loading ? (
                <div className="text-center text-gray-500">{t('common.loading')}</div>
            ) : error ? (
                <div className="text-center text-red-500">{t('common.error')}</div>
            ) : <div className='flex flex-col gap-2'>
                <div className="w-full">
                    {selectedChapter && <Select items={chapters} selected={selectedChapter} setSelected={setChapter}/>}
                </div>
                <div className="overflow-auto max-h-[calc(100vh-13rem)]">
                    {items.map(({bookId, chapterId, value}, index) => {
                        return (
                            <div
                                key={index}
                                className="mb-4 border rounded p-4 sm:p-6 md:p-8 lg:p-10"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2" data-id={`${bookId} ${chapterId}`}>
                                    {bookId}: {chapterId}
                                </h2>
                                <div>
                                    {Object.entries(value).map(([key, verse]) => {
                                        const dataId = `${bookId} ${chapterId}:${key}`
                                        return (
                                            <div key={key} className={`mb-2 ${dataId === paramsId
                                                ? 'bg-gray-300 -mx-4 px-4 hover:bg-gray-400 hover:rounded hover:-mx-4 hover:px-4'
                                                : 'hover:bg-gray-300 hover:-mx-4 hover:px-4'}`}
                                                 data-id={dataId}>
                                                <span className="font-semibold">{key}</span>
                                                <span className="ml-2">{verse}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>}
        </div>
    );
}
