import React, { useEffect, useState } from 'react'
import { useCookie } from '../hooks/cookies'
import {useLocalStorage} from '../hooks/local-storage'

// edit theme settings here !!
const themeDataStorage = {
    light: {
        backgroundColor: "white",
    },
    dark: {
        backgroundColor: "#1c1c1c",
    }
}

function setCookie(cname: string, cvalue: string) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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

// Context
export const ThemeContext = React.createContext<ThemeContextType | any>(null);

type propsType = {
    children: JSX.Element | null | undefined
}

function initTheme() {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light")
        return "light"
    }
    else {
        return localStorage.getItem("theme")
    }
}

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
