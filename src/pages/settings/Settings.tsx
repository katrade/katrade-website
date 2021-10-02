import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import useAuthorization from "../../hooks/useAuthorization";
import Block from "../../components/Block";
import Footer from "../../components/Footer";
import { H4 } from "../../components/standard/H";
import P from "../../components/standard/P";
import Background from "../../components/Background";

const PStyle = {
    fontWeight: 500,
    fontSize: "23px"
}


export default function Settings() {
    const [selected, setSelected] = useState(0);
    const { getUserData } = useAuthorization();
    return (
        <Background>
            <Navbar />
            <Block height="100vh" className="my-5">
                <H4>Settings</H4>
                <div className="row my-4 m-0 p-0" style={{ minHeight: "500px",boxShadow: "0 0 7px rgba(30,30,30,0.1)" }}>
                    <div className="col-lg-3 p-0">
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "transparent",
                                boxShadow: "5px 0 20px rgba(30,30,30,0.03)"
                            }}
                        >
                            <div>
                                <ListContainer>
                                    <List active={selected === 0 ? true : false} onClick={() => setSelected(0)}>
                                        <P style={PStyle}>Theme</P>
                                    </List>
                                </ListContainer>
                                <ListContainer>
                                    <List active={selected === 1 ? true : false} onClick={() => setSelected(1)}>
                                        <P style={PStyle}>Language</P>
                                    </List>
                                </ListContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 px-4" style={{ backgroundColor: "transparent"}}>

                    </div>
                </div>
            </Block>
        </Background>
    )
}

interface IList {
    active?: boolean
}

const List = styled.div`
    background-color: ${(props: IList) => props.active ? "rgba(0,0,0,0.03)" : "transparent"};
    width: 100%;
    height: 50px;
    border: solid ${(props: IList) => props.active ? "#00f098" : "transparent"};
    border-width: 0 0 0 3px;
    padding: 3px 30px;
    display: flex;
    justify-content: start;
    align-items: center;

    &:hover {
        cursor: pointer;
        background-color: ${(props: IList) => props.active ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.013)"};
    }
`
const ListContainer = styled.div`
    background-color: transparent;
    width: 100%;
    height: 50px;
    border: solid rgba(100,100,100,0.1);
    border-width: 1px 0 1px 0;
`
