import { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";

interface propsType {
  children?: any;
  className?: string;
  style?: any;
  dynamicPair?: [string, string];
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
}

export default function Input({
  children,
  className,
  style,
  dynamicPair,
  type,
  placeholder,
  onChange,
  value,
  name,
}: propsType) {
  const { theme } = useContext(ThemeContext);

  return (
    <input
      className={className}
      style={{
        backgroundColor: dynamicPair
          ? theme === "light"
            ? dynamicPair[0]
            : dynamicPair[1]
          : "transparent",
        transition: "400ms ease",
        border: "1px solid",
        borderColor: theme === "light" ? "#1c1c1c" : "#ffffff",
        color: theme === "light" ? "#000000" : "#fff",
        ...style,
      }}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
    >
      {children}
    </input>
  );
}
