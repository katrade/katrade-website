import { useState } from "react";
import styled from "styled-components";
interface ILabel {
  className?: string;
  style?: any;
  children?: any;
  content: string;
  onClick?: () => void;
}

const LabelBox = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  transform: translate(-50%, 0);
  padding: 0px 10px;
  color: #4a4b4d;
  border-radius: 5px;
  font-weight: 400;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 1.04rem;
  white-space: nowrap;
`;

export function Label({
  className,
  style,
  children,
  content,
  onClick,
}: ILabel) {
  const [present, setPresent] = useState(false);
  return (
    <div
      className={className}
      style={{ ...style, zIndex: 40, position: "relative" }}
      onMouseOver={() => setPresent(true)}
      onMouseOut={() => setPresent(false)}
      onClick={onClick}
    >
      <div style={{ zIndex: 35 }}>{children}</div>
      {present ? <LabelBox>{content}</LabelBox> : null}
    </div>
  );
}
