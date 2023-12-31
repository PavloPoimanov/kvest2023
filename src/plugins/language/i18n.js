
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '../../constant/translation/index'

i18n
    .use(initReactI18next)
    .init({
        resources,
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'sessionStorage'],
        },
        fallbackLng: 'uk',
        ns: ['translations'],
        interpolation: {
            escapeValue: false, // React already does escaping
        }
    }).catch(e => console.log(e))

i18n.languages = ['en', 'uk']

export default i18n
