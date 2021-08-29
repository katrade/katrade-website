import { useState, useContext } from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';

import { ApplicationContext } from '../contexts/Application';

const Container = styled.div`
    position: fixed;
    top: 93%;
    right: 0;
    bottom: 0;
    left: auto;
    background-color: transparent;
    opacity: 1;
    z-index: 31;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 30px;
`
const AppAlert = styled.div`
    background-color: crimson;
    min-height: 50px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 22px;
    padding: 1px 12px;
    border-radius: 10px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    animation: sys-show 300ms ease;
`
const AppNotification = styled.div`
    background-color: #4281f5;
    min-height: 50px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 22px;
    padding: 1px 12px;
    border-radius: 10px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    animation: sys-show 300ms ease;
`

const AppWarning = styled.div`
    background-color: #ffc34a;
    min-height: 50px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 22px;
    padding: 1px 12px;
    border-radius: 10px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    animation: sys-show 300ms ease;
`

const AppMessage = styled.div`
    background-color: #00e893;
    min-height: 50px;
    min-width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 22px;
    padding: 1px 12x;
    border-radius: 10px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    animation: sys-show 300ms ease;
`

const sysDiv = document.getElementById("system")

export function Window() {

    const [active , setActive] = useState(false);
    const { ghost, server } = useContext(ApplicationContext)
    console.log(ghost);

    if (!sysDiv || !window.location.href.includes("/app/") || ghost) {
        return null;
    }
    if (!server) {
        window.location.href = '/error/server-in-maintainance';
    }

    return createPortal(
        <Container>
            <AppAlert>
                <ErrorIcon className="mx-2"/> Can't connect to the server.
            </AppAlert>

        </Container>
    , sysDiv)
}

