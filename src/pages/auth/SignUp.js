import React, {useEffect} from "react";
import {useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useTranslation} from "react-i18next";
import {useFireBase} from "../../context/fireBaseContext";
import {useFormValidation} from "../../hooks/useFormValidaiton";
import {Link, useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

export const SignUp = () => {
    const {auth, googleProvider} = useFireBase();
    const [loggedUser] = useAuthState(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate(); // Initialize the history object
    const {t} = useTranslation();
    const {enqueueSnackbar} = useSnackbar();
    const initialFormState = {
        email: "",
        password: "",
    };

    const validationRules = {
        email: ["required", "email"],
        password: ["required", "minLength:6"],
    };

    const {
        formData,
        errors,
        handleChange,
        validate,
    } = useFormValidation(initialFormState, validationRules);

    const handleSignUp = async () => {
        const isValid = validate();

        if (isValid) {
            await createUserWithEmailAndPassword(formData.email, formData.password);
        }
    };

    useEffect(() => {
        if (loggedUser) {
            enqueueSnackbar(t('common.alreadySignedIn'), {variant: "info"});

            navigate('/');
        }
    }, [loggedUser])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex items-center justify-center flex-grow bg-gray-100 ">
            <div className="bg-white p-8 rounded-lg shadow-md  w-[400px]">
                <h2 className="text-2xl font-semibold mb-4">{t('common.signUp')}</h2>
                <div className="mb-4">
                    <label className="block text-gray-600">{t('common.emailLabel')}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder={t('common.emailPlaceholder')}
                    />
                    {errors.email && (
                        <p className="text-red-600 mt-2">{errors.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">{t('common.passwordLabel')}</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${
                            errors.password ? 'border-red-500' : ''
                        }`}
                        placeholder={t('common.passwordPlaceholder')}
                    />
                    {errors.password && (
                        <p className="text-red-600 mt-2">{errors.password}</p>
                    )}
                </div>
                <button
                    onClick={handleSignUp}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    {t('common.signUpButton')}
                </button>
                {error && (
                    <p className="text-red-600 mt-2">{error.message}</p>
                )}
                <p className="text-gray-600 mt-2">
                    {t('common.alreadyHaveAccount')}{' '}
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        {t('common.signIn')}
                    </Link>
                </p>
            </div>
        </div>
    );
};
