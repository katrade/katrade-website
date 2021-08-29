import { useState, useEffect , useContext } from 'react'
import styled from 'styled-components'
import './loading.css'
import maintaining from '../pics/maintainance.jpg'
import { Application, ApplicationContext } from '../contexts/Application';


interface containerProps {
    white: boolean
}

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${(props: containerProps) => props.white ? "white" : "#e1e4eb"};
    opacity: 1;
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
`
const Page = styled.div`
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${(props: containerProps) => props.white ? "white" : "#e1e4eb"};
    opacity: 1;
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

const Display = styled.div`
    min-width: min(350px , 70%);
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function Error() {
    
    const { online, ghost } = useContext(ApplicationContext)

    if (ghost) {
        return null;
    }
    console.log(online);
    // For development only 
    if (online) {
        return null;
    }
    return (
        <>
            <Disconnected />
        </>
    )
}

function Disconnected() {
    return (
        <Container white={false}>
            <Display>
                <div className="text-center">
                    <div className="d-flex justify-content-center align-items-center mb-5">
                        <div className="lds-ring text-center"><div></div><div></div><div></div><div></div></div>
                    </div>
                    <h5>You have been disconnected.</h5>
                    <p>We are trying to bring you back as soon as possible.</p>
                </div>
            </Display>
        </Container>
    )
}

export function Maintainance() {
    return (
        <Page white={true}>
            <Display>
                <div className="text-center">
                    <img src={maintaining} alt="maintainance" width="60%" />
                    <h5>Katrade is now <span style={{ color: "crimson", fontWeight: "bold", fontSize: "30px" }}>CLOSED</span> for maintainance.</h5>
                    <p>We will let you know once we're ready. Thank you for using Katrade.</p>
                </div>
            </Display>
        </Page>
    )
}