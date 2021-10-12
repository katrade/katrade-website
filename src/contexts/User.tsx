import React , { useState , useEffect } from 'react';
import { contextType } from '../types/user';

// Disable authentication by set devMode as true.
const devMode = true;

const authenticator = "";

export const UserContext = React.createContext<contextType>({ allow: false });

interface propsInterface {
    children: any
}
export function UserProvider({ children }: propsInterface) {
    const [ allow, setAllow ] = useState(false);

    useEffect(() => {
        if (devMode) { return } ;
        fetch(authenticator)
            .then(res => res.json())
            .then(res => {
                if (res.isAllow) {
                    setAllow(true);
                }
            })
    } , [])

    return (
        <UserContext.Provider value={{ allow }}>
            { children }
        </UserContext.Provider>
    )
} 