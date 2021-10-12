import * as React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = ({ error, ...rest }: InputProps) => (
  <div>
    <input {...rest} />
    {error && <div>{error}</div>}
  </div>
);
export default Input