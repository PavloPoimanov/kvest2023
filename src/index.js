import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import './styles/index.css';
import './plugins/language/i18n'
import {ModalProvider} from "./context/dialogContext";
import {SnackbarProvider} from 'notistack';
import {FireBaseProvider} from "./context/fireBaseContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <FireBaseProvider>
            <SnackbarProvider autoHideDuration={2000} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}>
                <ModalProvider>
                    <App/>
                </ModalProvider>
            </SnackbarProvider>
        </FireBaseProvider>
    </BrowserRouter>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
