import {useState} from "react";
import {useTranslation} from "react-i18next";

export function useFormValidation(initialState, validationRules) {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
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
                    } else if (rule.startsWith('max') && value.length > parseInt(rule.substring(3), 10)) {
                        newErrors[field] = `${t('common.errorMax')}${parseInt(rule.substring(3), 10)}`;
                    }
                }
                if (rule instanceof RegExp && !rule.test(value)) {
                    console.log(rule.test(value))
                    newErrors[field] = `${t('common.errorInvalidFormat')} ${t(`common.errorFormat${field}`)}` // Replace with your own error message
                }
            });
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return {
        formData,
        setFormData,
        errors,
        handleChange,
        validate,
    };
}
