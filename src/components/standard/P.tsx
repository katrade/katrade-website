import { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";

interface propsType {
  children?: any;
  className?: string;
  style?: any;
  onClick?: any;
}

export default function P({ children, className, style, onClick }: propsType) {
  const { theme } = useContext(ThemeContext);
  return (
    <p
      className={className + (theme === "light" ? "" : " dark")}
      style={style}
      onClick={onClick}
    >
      {children}
    </p>
  );
}
