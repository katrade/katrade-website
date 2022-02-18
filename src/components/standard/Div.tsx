import { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";

interface IDiv {
  children: any;
  dynamicPair?: [string, string];
  className?: string;
  style?: any;
  onClick?: any;
}

export default function Div({ children, dynamicPair, className, style }: IDiv) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={className}
      style={{
        backgroundColor: dynamicPair
          ? theme === "light"
            ? dynamicPair[0]
            : dynamicPair[1]
          : "transparent",
        transition: "400ms ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
