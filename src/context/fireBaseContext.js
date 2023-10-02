import {createContext, useContext} from "react";
import {app, auth, database} from "../firebase"

export const FireBaseContext = createContext({app, auth, database})

export const FireBaseProvider = ({children}) => {
    return <FireBaseContext.Provider value={{app, auth, database}}>{children}</FireBaseContext.Provider>
}
export const useFireBase = () => useContext(FireBaseContext);
