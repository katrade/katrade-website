import styled from "styled-components";

interface AccountBlockProps {
    width?: string
    height?: string
    color?: string
    borderTop?: string
    borderTopLeftRadius?: string
    borderTopRightRadius?: string
    padding?: string
    paddingLeft?: string
    paddingRight?: string
    paddingTop?: string
    paddingBottom?: string
    children?: string | JSX.Element | JSX.Element[] | null 
}

export const AccountBlockCSS = styled.button`
    min-width: ${(props: AccountBlockProps) => props.width ? props.width : "100%"};
    min-height: ${(props: AccountBlockProps) => props.height ? props.height : "auto"};
    background-color: white;
    
    border-style: solid;
    border-radius: 10px;
    border-top-style: ${(props: AccountBlockProps) => props.borderTop ? props.borderTop : "solid"};
    border-top-left-radius: ${(props: AccountBlockProps) => props.borderTopLeftRadius ? props.borderTopLeftRadius : "10px"};
    border-top-right-radius ${(props: AccountBlockProps) => props.borderTopRightRadius ? props.borderTopRightRadius : "10px"};
    border-color: ${(props: AccountBlockProps) => props.color ? props.color : "#d7d7d7"};
    border-width: 3px;

    padding-left: ${(props: AccountBlockProps) => props.paddingLeft ? props.paddingLeft : "20px"};
    padding-right: ${(props: AccountBlockProps) => props.paddingRight ? props.paddingRight : "20px"};
    padding-top: ${(props: AccountBlockProps) => props.paddingTop ? props.paddingTop : "15px"};
    padding-bottom: ${(props: AccountBlockProps) => props.paddingBottom ? props.paddingBottom : "15px"};

    padding: ${(props: AccountBlockProps) => props.padding ? props.padding : "15px 20px 15px 20px"};

    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 10px;

    cursor: cell;
`

export function AccountBlock({width, height, color, borderTop, borderTopLeftRadius, borderTopRightRadius, children, paddingBottom, paddingLeft, paddingRight, paddingTop, padding}: AccountBlockProps) {
    return (
        <AccountBlockCSS
            width={width} 
            height={height}
            color={color}
            borderTop={borderTop}
            borderTopLeftRadius={borderTopLeftRadius}
            borderTopRightRadius={borderTopRightRadius}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            padding={padding}
        >{ children }</AccountBlockCSS>
    );
}
