import { render } from 'react-dom';
import styled from 'styled-components';


export default function useLoading() {
    const element = document.getElementById('portal');
    function show() {
        render(<LoadingScreen />,element)
    }
    function hide() {
        render(<></>,element)
    }
    return [show, hide]
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`

function LoadingScreen() {
    return (
        <Container>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </Container>
    )
}