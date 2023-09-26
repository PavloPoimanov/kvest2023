import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {create} from "../api/firebase/names";
import {Dialog, Transition} from "@headlessui/react";

const NamesCreateModal = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        first_mention: '',
        usage_count: '',
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

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
            first_mention: formData.first_mention,
            usage_count: formData.usage_count
        })
        closeModal();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{t('features')}</h1>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                {t('addNewFeature')}
            </button>

            <Transition appear show={isOpen} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>

                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
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
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                        >
                                            {t('save')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
