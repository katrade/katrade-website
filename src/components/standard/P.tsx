import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme';

interface propsType {
    children: JSX.Element | JSX.Element[] | undefined | null | string;
}

export default function P({ children }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <p className={theme === "light" ? "" : "dark"}>{children}</p>
    )
}