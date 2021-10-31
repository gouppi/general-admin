import { globalHistory } from '@reach/router';
import {useState, useCallback, useEffect, createContext, FC} from 'react';

type ContextType = {
    user: {
        id: number;
        email: string;
        username: string;
        token: string;
        isLogged: boolean;
    },
    updateUser: (newUser: User) => void;
    initialCheckDone: boolean;
    isLoggedIn: () => Promise<boolean>;
    logout: () => void;
}

interface User {
    id: number,
    email: string,
    username: string,
    token: string,
    isLogged: boolean
}

const GlobalContext = createContext<ContextType>({
    user: {
        id: 0,
        email: "",
        username: "",
        token: "",
        isLogged: false 
    },
    updateUser: () => null,
    isLoggedIn: async () => false,
    initialCheckDone: false,
    logout: () => null
});



const GlobalContextProvider : FC = (props) => {
    const [user, setUser] = useState<User>({email: "", id: 0, username: "", token : "", isLogged: false});
    const updateUser = async (newUser : User) => {
        setUser(newUser);
    }

    const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);

    const isLoggedIn = useCallback(async () => {
        if (localStorage.getItem("token") !== null) {
            let result = await fetch("/userInfo", {headers: {"x-access-token": localStorage.getItem("token")}});
            let data : any = await result.json();
            if (data.data.loggedIn) {
                updateUser({email: data.data.email, id: data.data.id, isLogged: true, token: "", username: "Test"})
                setTimeout(function(){ setInitialCheckDone(true) }, 1000);
                console.log("DONE, LOGGED IN");
                return true;
            } else {
                updateUser({email: "", id: 0, username: "", token : "", isLogged: false});
            }
        }
        setTimeout(function(){ console.log("MOI"); setInitialCheckDone(true) }, 250);
        console.log("DONE, NOT LOGGED IN");
        return false;
    }, []);

    const logout = useCallback(() => {
        console.log("LOGOUT CALLED");
        localStorage.removeItem("token");
        updateUser({email: "", id: 0, username: "", token : "", isLogged: false});
        setInitialCheckDone(false);
        globalHistory.navigate(0);
    }, []);


    useEffect(() => {
        const func = async () => {
            if (user === undefined || user.id === 0) {
                console.log("UseEffect, user id was 0 so i'm fetching isloggedIn info to global context for everyone to use.");
                await isLoggedIn();
            }
        }
        func();
    }, [])

    return (
        <GlobalContext.Provider value={{user, updateUser, isLoggedIn, initialCheckDone, logout}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export {GlobalContextProvider};

export default GlobalContext;