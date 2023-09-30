import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {create} from "../api/firebase/names";
import {Dialog} from "@headlessui/react";

export const NamesCreateModal = ({closeModal}) => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        link: '',
        usage_count: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Close the modal after submitting
        create({
            id: formData.name,
            name: formData.name,
            description: formData.description,
            link: formData.link,
            usage_count: formData.usage_count
        })
        closeModal();
    };

    return (
        <div
            className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white rounded-md"
        >
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                {t('addNewFeature')}
            </Dialog.Title>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('name')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('description')}
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('first_mention')}
                    </label>
                    <input
                        type="text"
                        name="first_mention"
                        value={formData.first_mention}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('usage_count')}
                    </label>
                    <input
                        type="number"
                        name="usage_count"
                        value={formData.usage_count}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    >
                        {t('save')}
                    </button>
                    <button
                        type="button" // Set the type to "button" to prevent form submission
                        onClick={closeModal} // Add an onClick handler to close the modal
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
                    >
                        {t('cancel')}
                    </button>
                </div>
            </form>
        </div>

    );
}
