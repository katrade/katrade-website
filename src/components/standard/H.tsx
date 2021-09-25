import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme';

interface propsType {
    children?: any
    className?: string
}


export function H1({ children , className }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h1 className={className+(theme === "light" ? "" : " dark")}>{children}</h1>
    )
}

export function H2({ children , className }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h2 className={className+(theme === "light" ? "" : " dark")}>{children}</h2>
    )
}

export function H3({ children , className }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h3 className={className+(theme === "light" ? "" : " dark")}>{children}</h3>
    )
}

export function H4({ children , className }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h4 className={className+(theme === "light" ? "" : " dark")}>{children}</h4>
    )
}

export function H5({ children , className }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h5 className={className+(theme === "light" ? "" : " dark")}>{children}</h5>
    )
}

export function H6({ children , className }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h6 className={className+(theme === "light" ? "" : " dark")}>{children}</h6>
    )
}
