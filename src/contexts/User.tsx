import React , { useState , useEffect } from 'react';
import { useHistory } from 'react-router';
import useAuthorization from '../hooks/useAuthorization';
import useLoading from '../hooks/useLoading';
import { IAccount } from '../interfaces/IUser';


// Disable authentication by set devMode as true.
const devMode = true;

const authenticator = "";

export const UserContext = React.createContext<{valid: boolean | null}>({ valid: null });

interface propsInterface {
    children: any
}
export function UserProvider({ children }: propsInterface) {
    const history = useHistory();
    const [ checked, setChecked ] = useState(false);
    const [valid, setValid] = useState<boolean | null>(null);
    const { getUserData } = useAuthorization();
    const [,hide] = useLoading();
    const checkValidity = async () => {
        setChecked(true);
        await getUserData()
            .then((u: IAccount | null) => {
                setChecked(true);
                if (u === null) {
                    setValid(false);
                    hide();
                    history.push("/app/signin");
                }
                else {
                    setValid(true);
                }
            });
    }
    useEffect(() => {
        checkValidity();
    } , [])

    return (
        <UserContext.Provider value={{ valid }}>
            { children }
        </UserContext.Provider>
    )
} 