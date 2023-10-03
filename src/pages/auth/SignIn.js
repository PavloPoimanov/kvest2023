import {useFireBase} from "../../context/fireBaseContext";
import {useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle,} from "react-firebase-hooks/auth";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {useFormValidation} from "../../hooks/useFormValidaiton";


export const SignIn = () => {
    const {auth} = useFireBase()
    const [loggedUser] = useAuthState(auth);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate(); // Initialize the history object
    const {t} = useTranslation()
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    // Define your initial state and validation rules
    const initialState = {
        email: '',
        password: '',
    };

    const validationRules = {
        email: ['required', 'email'],
        password: ['required', 'minLength:6'], // Example: Custom rule for minimum length
    };

    // Use the useFormValidation hook to manage form state and validation
    const {
        formData,
        errors,
        handleChange,
        validate,
    } = useFormValidation(initialState, validationRules);

    const handleSignIn = async () => {
        const isFormValid = validate();
        if (isFormValid) {
            await signInWithEmailAndPassword(formData.email, formData.password);
        }
    };
    useEffect(() => {
        if (loggedUser) {
            enqueueSnackbar(t('common.alreadySignedIn'), {variant: "info"});

            navigate('/');
        }
    }, [loggedUser]);

    // Google Sign-up
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const handleSignUpWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Google sign-up error', error);
        }
    };
    return (
        <div className="flex items-center justify-center flex-grow bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-[400px]"><h2
                className="text-2xl font-semibold mb-4">{t('common.signIn')}</h2>
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
                        <p className="text-red-600 mt-2">{t('common.errorRequired')}</p>
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
                        <p className="text-red-600 mt-2">{t('common.errorRequired')}</p>
                    )}
                </div>
                <button
                    onClick={handleSignIn}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    {t('common.signInButton')}
                </button>
                <button
                    onClick={handleSignUpWithGoogle}
                    className="w-full py-2 px-4 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                >{t('common.signInButtonGoogle')}</button>
                {googleError && (
                    <p className="text-red-600 mt-2">{googleError.message}</p>
                )}
                {error && (
                    <p className="text-red-600 mt-2">{error.message}</p>
                )}
                <p className="text-gray-600 mt-2">
                    {t('common.dontHaveAccount')}{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        {t('common.signUp')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
