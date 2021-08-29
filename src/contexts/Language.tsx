import React , { useEffect } from 'react';
import { useCookie } from '../hooks/cookies'
import { useLocalStorage } from '../hooks/local-storage'



let defaultValue = {
    lang: 'th',
    setLangCookie: null,
    toggleLanguage: null
}


type LanguageContextType = {
    lang: string | null,
    setLangCookie: any,
    toggleLanguage: any,
}

interface propsInterface {
    children: any
}


export const LanguageContext = React.createContext<LanguageContextType>(defaultValue);


export function LanguageProvider({ children }: propsInterface) {

    const [ lang , setLangCookie ] = useLocalStorage("lang" , "th")

    
    function toggleLanguage() {
        if (lang === 'en') {
            setLangCookie('th');
        }
        else {
            setLangCookie('en');
        }
    }

    useEffect(() => {
        if (!lang) {
            setLangCookie('th');
        }
    }, [])

    return (
        <LanguageContext.Provider value={{lang , setLangCookie , toggleLanguage}}>
            { children }
        </LanguageContext.Provider>
    )
}