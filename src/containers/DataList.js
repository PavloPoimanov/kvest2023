import React, {useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Select} from "../components/Select"; // Import icons

const DataList = ({items, loading, error}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('name');
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
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            const order = sortDirection === 'asc' ? 1 : -1;
            if (typeof a[sortKey] === 'string') {
                return order * a[sortKey].localeCompare(b[sortKey]);
            } else if (typeof a[sortKey] === 'number') {
                return order * (a[sortKey] - b[sortKey]);
            }
        });
    }, [filteredItems, sortKey, sortDirection]);

    return (
        <div className="max-w-md mx-auto p-4">
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
                    {t('common.allCount')}
                    {items.length}
                </div>
            </div>
            {items.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="block text-gray-700">{t('common.sortBy')}</div>
                        <Select items={Object.keys(items[0]).map(e => ({key: e, label: t(`common.sort.${e}`)}))}
                                selected={{key: sortKey, label: t(`common.sort.${sortKey}`)}}
                                setSelected={handleSortChange}
                                sortDirection={sortDirection}
                                toggleSortDirection={toggleSortDirection}
                        />
                    </div>
                </div>
            )}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <ul className="space-y-2">
                    {sortedItems.map((item, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded-md hover:bg-gray-100"
                        >
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-600">{item.description}</p>
                            <p className="text-gray-600">{item.first_mention}</p>
                            <p className="text-gray-600">{item.usage_count}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DataList;
