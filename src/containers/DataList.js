import React, {useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Select} from "../components/Select";
import {Link} from "react-router-dom";

const DataList = ({
                      items,
                      loading,
                      error,
                      defaultSortKey = 'name',
                      sortingKeys = ['name', 'description', 'usage_count'],
                      children,
                      filter,
                      filterClb
                  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState(defaultSortKey);
    const [sortDirection, setSortDirection] = useState('asc');
    const {t} = useTranslation()
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (value) => {
        setSortKey(value);
        setSortDirection('asc');
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const filteredItems = useMemo(() => {
        return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())).filter(filterClb);
    }, [items, searchTerm]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            const order = sortDirection === 'asc' ? 1 : -1;
            const el = a[sortKey];
            if (sortKey === 'created' || sortKey === 'updated') {
                return order * (Date.parse(a[sortKey]) > Date.parse(b[sortKey]))
            }
            const tryParse = parseInt(el);

            if (!isNaN(tryParse)) {
                return -order * (a[sortKey] - b[sortKey]);
            } else {
                if (typeof el === 'string') {
                    return order * a[sortKey].localeCompare(b[sortKey]);
                } else {
                    return order;
                }
            }
        });
    }, [filteredItems, sortKey, sortDirection]);
    const sortingItems = sortingKeys.map(e => ({key: e, label: t(`common.sort.${e}`)}));
    const defaultListItem = (item, index) => (
        <li
            key={index}
            className="border p-4 rounded-md hover:bg-gray-100"
        >
            <Link to={item.link ? `/text/${item.link.bookId}/${item.link.chapterId}/${item.link.verseId}` : ""}>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-600">{item.href}</p>
                <p className="text-gray-600">{item.usage_count}</p>
            </Link>

        </li>
    )
    const listMap = children ?? defaultListItem

    return (
        <div className="max-w-2xl w-full mx-auto p-4 h-full flex-grow flex flex-col">
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder={t('common.search')}
                    className="w-full px-4 py-2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:text-sm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div
                    className="cursor-default flex rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 sm:text-sm">
                    {t('common.filteredCount')}
                    {filteredItems.length}
                </div>
                {filter({allItems: items.length, filteredItems: filteredItems.length})}
            </div>
            {items.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="block text-gray-700">{t('common.sortBy')}</div>
                        <Select items={sortingItems}
                                selected={{key: sortKey, label: t(`common.sort.${sortKey}`)}}
                                setSelected={handleSortChange}
                                sortDirection={sortDirection}
                                toggleSortDirection={toggleSortDirection}
                        />
                    </div>
                </div>
            )}
            {loading && <p className="text-center h-full flex-grow flex flex-col items-center justify-center">{t('common.loading')}</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <ul className="space-y-2">
                    {sortedItems.map(listMap)}
                </ul>
            )}
        </div>
    );
};

export default DataList;
