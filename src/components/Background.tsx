import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

interface backgroundPropsInterface {
  children: JSX.Element | JSX.Element[] | string | null;
}

export default function Background({ children }: backgroundPropsInterface) {
  const { themeData } = useContext(ThemeContext);
  const style = {
    backgroundColor: themeData.backgroundColor,
    width: "100%",
    maxWidth: "100%",
    transition: "400ms ease",
  };
  return <div style={style}>{children}</div>;
}
