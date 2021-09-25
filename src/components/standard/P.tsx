import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme';

interface propsType {
    children?: any
    className?: string
    style?: any
}

export default function P({ children, className, style }: propsType) {
    const { theme } = useContext(ThemeContext);
    return (
        <p className={className+(theme === "light" ? "" : " dark")} style={style}>{children}</p>
    )
}