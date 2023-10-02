import {createContext, useContext} from "react";
import {app, auth, database} from "../firebase"
import {GoogleAuthProvider} from "firebase/auth";

export const FireBaseContext = createContext({app, auth, database, googleProvider: {}})

export const FireBaseProvider = ({children}) => {
    return <FireBaseContext.Provider
        value={{app, auth, database, googleProvider: new GoogleAuthProvider()}}>{children}</FireBaseContext.Provider>
}
export const useFireBase = () => useContext(FireBaseContext);
