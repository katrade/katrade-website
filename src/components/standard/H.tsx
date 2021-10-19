import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme';

interface propsType {
    children?: any
    className?: string
    style?: any
}


export function H1({ children , className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h1 className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</h1>
    )
}

export function H2({ children , className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h2 className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</h2>
    )
}

export function H3({ children , className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h3 className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</h3>
    )
}

export function H4({ children , className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h4 className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</h4>
    )
}

export function H5({ children , className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h5 className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</h5>
    )
}

export function H6({ children , className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <h6 className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</h6>
    )
}
