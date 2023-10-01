import {useTranslation} from "react-i18next";
import React from "react";
import {useFormValidation} from "../../hooks/useFormValidaiton";

export function NameContent({setOnSubmit, shouldFormReset}) {
    const {t} = useTranslation(); // Use the useTranslation hook to access translations

    const onSubmit = (action) => {
        const isValid = validate();
        if (isValid) {
            // Perform further actions when the form is valid
            action(formData);
            if (shouldFormReset) {
                // Reset the form data
                setFormData({
                    name: '',
                    description: '',
                    link: '',
                });
            }
            return formData
        }
    };

    setOnSubmit(onSubmit);

    const validationRules = {
        name: ['required', 'max512'],
        description: ['max2048'],
        link: ['required', 'max512', /^[1,2] (?:Хроніки|Самуїлова) \d*:\d*$/], // Example regex pattern for a URL
    };

    const {
        formData,
        setFormData,
        errors,
        handleChange,
        validate,
    } = useFormValidation(
        {
            name: '',
            description: '',
            link: '',
        },
        validationRules,
    );


    return (
        <div>
            <h4 className="text-lg font-medium">{t('common.nameContent')}</h4>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">{t('common.name')}:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder={t('common.enterName')}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    {t('common.description')}:
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    placeholder={t('common.enterDescription')}
                    onChange={handleChange}
                    rows="3"
                    className={`mt-1 p-2 w-full border rounded-md ${
                        errors.description ? 'border-red-500' : ''
                    }`}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    {t('common.link')}:
                </label>
                <input
                    type="text"
                    name="link"
                    value={formData.link}
                    placeholder={t('common.enterLink')}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                        errors.link ? 'border-red-500' : ''
                    }`}
                />
                {errors.link && (
                    <p className="text-red-500 text-sm mt-1">{errors.link}</p>
                )}
            </div>
        </div>
    );
}
