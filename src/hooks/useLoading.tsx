import { render } from 'react-dom';
import styled from 'styled-components';

export default function useLoading() {
    const element = document.getElementById('portal');
    function show(str?: string) {
        render(<LoadingScreen loadingString={str} />, element)
    }
    function hide() {
        render(<></>, element)
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

function LoadingScreen({ loadingString }: any) {
    return (
        <Container>
            <div>
                <div className="d-flex justify-content-center">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
                <p className="mt-3">{loadingString}</p>
            </div>

        </Container>
    )
}