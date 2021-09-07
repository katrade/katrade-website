import { createContext , useState , useEffect } from 'react'
import setting from '../app.setting.json'

interface propsInterface {
    children: any
}
const defaultValue = {
    allowClient: true,
    ghost: setting.GHOST_MODE,
    online: setting.ONLINE,
    server: setting.SERVER,
}



export const ApplicationContext = createContext(defaultValue);

export function Application({ children }: propsInterface) {

    const [ isSocketConnected , setIsSocketConnected ] = useState(false);
    const [ allowClient , setAllowClient ] = useState(true);
    const [ ghost , setGhost ] = useState(setting.GHOST_MODE);
    const [ online , setOnline ] = useState(setting.ONLINE);
    const [ server , setServer ] = useState(setting.SERVER)
    useEffect(() => {
        // Initialize Socket and connect to validator.
        // If connect succeeds, check allowClient
        if (setting.GHOST_MODE) {
            return setAllowClient(true);
        }

        return setAllowClient(false);
    } , [])

    return (
        <ApplicationContext.Provider value={{ allowClient , ghost , online , server }}>
            { children }
        </ApplicationContext.Provider>
    )
}