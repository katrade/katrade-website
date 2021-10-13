import React, { useState, useEffect } from 'react';
import { contextType } from '../types/user';
import io, { Socket } from "socket.io-client";
import { useHistory } from "react-router";
import { defaultEmptyAccount, IAccount } from '../interfaces/IUser';
import { IDealing, IMessage } from '../interfaces/Chat';
import useAuthorization from "../hooks/useAuthorization";
import { useLocation } from 'react-router-dom';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface ISocketContext {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    account: IAccount,
    setAccount: React.Dispatch<React.SetStateAction<IAccount>> | (() => void),
    duo_id: string,
    duo_username: string,
    roomId: string,
    setRoomId: React.Dispatch<React.SetStateAction<string>> | (() => void),
    messageList: IMessage[],
    setMessageList: React.Dispatch<React.SetStateAction<any[]>> | (() => void),
    dealingList: IDealing[],
    setDealingList: React.Dispatch<React.SetStateAction<IDealing[]>> | (() => void)
    duoId: string,
    setDuoId: React.Dispatch<React.SetStateAction<string>> | (() => void)
}

const socket = io("https://socketkatrade.herokuapp.com", {
    transports: ["polling"],
    reconnection: false,
});

socket.on("connect", () => {
    console.log("SOCKET is already connected");
    // console.log(socket.connected);
})

export const SocketContext = React.createContext<ISocketContext>({ 
    socket: socket,
    account: defaultEmptyAccount,
    setAccount: () => {},
    duo_id: "",
    duo_username: "",
    roomId: "",
    setRoomId: () => {},
    messageList: [],
    setMessageList: () => {},
    dealingList: [],
    setDealingList: () => {},
    duoId: "",
    setDuoId: () => {}                                     
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
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [chk, setChk] = useState(false);
    const [ dealingList, setDealingList ] = useState<IDealing[]>([])
    const [ duoId, setDuoId ] = useState("")

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

    socket.on("message", (data: any) => {
        console.log("data")
        let a = [...messageList]
        a.push(data.content)
        setMessageList(a);
        setChk(!chk);
    });

    return (
        <SocketContext.Provider value={{ 
            socket,    
            account, 
            setAccount, 
            duo_id, 
            duo_username,
            roomId,
            setRoomId,
            messageList,
            setMessageList,
            dealingList,
            setDealingList,
            duoId,
            setDuoId
        }}>
            {children}
        </SocketContext.Provider>
    )
}