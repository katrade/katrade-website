import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { createPortal , render } from 'react-dom';
import styled from 'styled-components';

import cancel from '../pics/cancel.png'

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(51, 51, 51, 0.3);
    backdrop-filter: blur(1px);
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`
const PopupContent = styled.div`
    position: relative;
    padding: 10px 20px;
    box-sizing: border-box;
    height: 50vh;
    width: 80vw;
    max-height: 80vh;
    max-width: 900px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: white;
    border-radius: 6px;
    font-size: 15px;
    font-weight: bold;
    border-style: solid;
    color: white;
`
const TopBar = styled.div`
    width: 100%;
    height: 15px;
    text-align: end;
`

const Body = styled.div`
    width: 100%;
    margin: 40px 0px;
`

interface propsInterface {
    children?: any
    reset: Number
}

const popupCloseButton = {
    cursor: "pointer",
    zIndex: 94,
}



// Not responsive yet

export default function Popup({ children , reset}: propsInterface) {


    const [open, setOpen] = useState(true);
    const [willClose , setWillClose] = useState(false)


    function preClose() {
        setWillClose(true);
        setTimeout(() => {
            setOpen(false);
            setWillClose(false)
        }, 400)
    }

    useEffect(() => {
        setOpen(true)
    }, [reset])

    if (!open) {
        document.body.style.overflow = "visible"
        return null;
    }

    if (open) {
        document.body.style.overflow = "hidden"
    }

    return (

        <>
            <PopupContainer style={{animation: !willClose ? "popup-container-in 0.4s ease" : "popup-container-out 0.4s ease"}}>
                <PopupContent style={{animation: !willClose ? "popupIn 0.4s ease" : "popupOut 0.4s ease"}}>
                    <TopBar>
                        <img src={cancel} width="15px" style={popupCloseButton} onClick={preClose}/>
                    </TopBar>

                    <Body>
                        { children }
                    </Body>

                </PopupContent>
            </PopupContainer>
        </>

    )
}



