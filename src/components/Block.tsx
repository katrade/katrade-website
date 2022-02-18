import { useEffect } from "react";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/Theme";
interface BlockProps {
  height: string;
  children?: JSX.Element | never[] | JSX.Element[] | string;
  backgroundColor?: string;
  darkBackgroundColor?: string;
  className?: string;
  backgroundImage?: string;
}

const BlockDiv = styled.div`
  min-height: ${({ height }: BlockProps) => height};
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: 400ms ease;
`;
const InnerBlock = styled.div`
  padding: 0 !important;
  margin: 0 !important;
  max-width: 1300px;
  width: 100%;
`;

export default function Block({
  height,
  children,
  backgroundColor,
  darkBackgroundColor,
  className,
  backgroundImage,
}: BlockProps) {
  const { theme } = useContext(ThemeContext);
  const [mobile, setMobile] = useState<boolean>(false);
  window.addEventListener("resize", resize);
  function resize() {
    if (window.innerWidth < 576) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }
  useEffect(() => {
    resize();
  }, []);
  return (
    <BlockDiv
      height={height}
      style={{
        backgroundColor:
          theme === "light"
            ? backgroundColor
              ? backgroundColor
              : "transparent"
            : darkBackgroundColor
            ? darkBackgroundColor
            : backgroundColor
            ? backgroundColor
            : "transparent",
        paddingLeft: mobile ? "20px" : "30px",
        paddingRight: mobile ? "20px" : "30px",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={className}
    >
      <InnerBlock>{children}</InnerBlock>
    </BlockDiv>
  );
}

export function BlockWithImageAttachment({
  height,
  children,
  backgroundColor,
  darkBackgroundColor,
  className,
  backgroundImage,
}: BlockProps) {
  const { theme } = useContext(ThemeContext);
  const [mobile, setMobile] = useState<boolean>(false);
  window.addEventListener("resize", resize);
  function resize() {
    if (window.innerWidth < 576) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }
  useEffect(() => {
    resize();
  }, []);
  return (
    <BlockDiv
      height={height}
      style={{
        backgroundColor:
          theme === "light"
            ? backgroundColor
            : darkBackgroundColor
            ? darkBackgroundColor
            : backgroundColor,
        paddingLeft: mobile ? "10px" : "30px",
        paddingRight: mobile ? "10px" : "30px",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className={className}
    >
      <InnerBlock>{children}</InnerBlock>
    </BlockDiv>
  );
}
