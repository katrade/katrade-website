import React, { useEffect, useState } from 'react'
import { useCookie } from '../hooks/cookies'
import {useLocalStorage} from '../hooks/local-storage'

// edit theme settings here !!
const themeDataStorage = {
    light: {
        backgroundColor: "rgb(247,250,252)",
    },
    dark: {
        backgroundColor: "#1c1c1c",
    }
}


export type themeDataType = {
    backgroundColor: string,
    color: string,
}

type ThemeContextType = {
    theme: string,
    setTheme: any,
    themeData: themeDataType
}

type propsType = {
    children: JSX.Element | null | undefined
}


// Context
export const ThemeContext = React.createContext<ThemeContextType | any>(null);


// Provider
export function ThemeProvider({ children }: propsType) {
    
    
    const [ theme , setTheme ] = useLocalStorage("theme", "light")
    const themeData = theme === "light" ? themeDataStorage.light : themeDataStorage.dark;

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeData }}>
            { children }
        </ThemeContext.Provider>
    )
}
