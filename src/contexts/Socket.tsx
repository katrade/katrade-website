import React, { useState, useEffect } from 'react';
import { contextType } from '../types/user';
import io from "socket.io-client";
import { useHistory } from "react-router";
import { defaultEmptyAccount, IAccount } from '../interfaces/IUser';
import useAuthorization from "../hooks/useAuthorization";
import { useLocation } from 'react-router-dom';

interface ISocketContext {
    socket: any,
    account: IAccount,
    setAccount: React.Dispatch<React.SetStateAction<IAccount>> | (() => void),
    duo_id: string,
    duo_username: string,
    roomId: string,
    setRoomId: React.Dispatch<React.SetStateAction<string>> | (() => void),
}

export const SocketContext = React.createContext<ISocketContext>({ 
    socket: null ,
    account: defaultEmptyAccount,
    setAccount: () => {},
    duo_id: "",
    duo_username: "",
    roomId: "",
    setRoomId: () => {}                                                     
});

interface propsInterface {
    children: any
}

const queryString = require("query-string");

export function SocketProvider({ children }: propsInterface) {

    const socket = io("https://socketkatrade.herokuapp.com", {
        transports: ["polling"],
        reconnection: false,
    });

    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const [roomId, setRoomId] = useState("");
    const history = useHistory();
    const { getUserData, getChatData } = useAuthorization();
    const { search } = useLocation();
    const { duo_id, duo_username } = queryString.parse(search);

    useEffect(() => {

        async function init() {
            var userData = await getUserData();
            if (userData) {
                setAccount(userData);
            }
            else {
                console.clear();
                history.push('/app/signin');
            }
        }
        init();

    }, []);


    return (
        <SocketContext.Provider value={{ 
            socket,    
            account, 
            setAccount, 
            duo_id, 
            duo_username,
            roomId,
            setRoomId
        }}>
            {children}
        </SocketContext.Provider>
    )
}