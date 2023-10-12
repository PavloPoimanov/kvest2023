import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export function useFormValidation(initialState, validationRules, initialErrors = null) {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (initialErrors){
            setErrors(initialErrors)
        }
    }, [initialErrors]);

    const {t} = useTranslation();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Reset the corresponding error when the field is modified
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validate = () => {
        const newErrors = {};
        Object.keys(validationRules).forEach((field) => {
            const value = formData[field];
            const rules = validationRules[field];
            rules.forEach((rule) => {
                if (typeof rule === 'string') {
                    if (rule === 'required' && !value.trim()) {
                        newErrors[field] = t('common.errorRequired');
                    } else if (rule === 'email' && !isValidEmail(value)) {
                        newErrors[field] = t('common.errorInvalidEmail');
                    } else if (rule.startsWith('minLength:')) {
                        const minLength = parseInt(rule.substring(10), 10); // Extract the dynamic length
                        if (value.length < minLength) {
                            newErrors[field] = `${t('common.errorMinLength')} ${minLength}`;
                        }
                    } else if (rule.startsWith('max') && value.length > parseInt(rule.substring(3), 10)) {
                        newErrors[field] = `${t('common.errorMax')}${parseInt(rule.substring(3), 10)}`;
                    }
                }
                if (rule instanceof RegExp && !rule.test(value)) {
                    newErrors[field] = `${t('common.errorInvalidFormat')} ${t(`common.errorFormat${field}`)}`; // Replace with your own error message
                }
            });
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email) => {
        // You can use a regular expression or a library like validator.js for email validation
        // Here's a simple regular expression for basic email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    return {
        formData,
        setFormData,
        errors,
        handleChange,
        validate,
    };
}
