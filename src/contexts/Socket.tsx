import React, { useState, useEffect } from 'react';
import { contextType } from '../types/user';
import io, { Socket } from "socket.io-client";
import { useHistory } from "react-router";
import { defaultEmptyAccount, IAccount } from '../interfaces/IUser';
import { IDealing, IMessage, IChat } from '../interfaces/Chat';
import useAuthorization from "../hooks/useAuthorization";
import { useLocation } from 'react-router-dom';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface ISocketContext {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    account: IAccount,
    setAccount: React.Dispatch<React.SetStateAction<IAccount>> | (() => void),
    duo_id: string,
    duo_username: string,
    index: number,
    roomId: string,
    setRoomId: React.Dispatch<React.SetStateAction<string>> | (() => void),
    messageList: IMessage[],
    setMessageList: React.Dispatch<React.SetStateAction<any[]>> | (() => void),
    dealingList: IDealing[],
    setDealingList: React.Dispatch<React.SetStateAction<IDealing[]>> | (() => void)
    duoId: string,
    setDuoId: React.Dispatch<React.SetStateAction<string>> | (() => void),
    contactList: any[],
    setContactList: React.Dispatch<React.SetStateAction<any[]>> | (() => void),
    roomIdForTabChat: string,
    setRoomIdForTabChat: React.Dispatch<React.SetStateAction<string>> | (() => void),
    duoUsername: string,
    setDuoUsername: React.Dispatch<React.SetStateAction<string>> | (() => void),
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>> | (() => void)

}

const socket = io("https://socketkatrade.herokuapp.com", {
    timeout: 2000, 
    secure: true,
    transports: [ "websocket", "polling", "flashsocket" ],
})

socket.on("connect", () => {
    console.log("SOCKET is already connected");
    // console.log(socket.connected);
})

export const SocketContext = React.createContext<ISocketContext>({
    socket: io("https://socketkatrade.herokuapp.com", {
        timeout: 2000,
        secure: true,
        transports: [ "polling", "websocket", "flashsocket" ]
    }),
    account: defaultEmptyAccount,
    setAccount: () => { },
    duo_id: "",
    duo_username: "",
    index: 0,
    roomId: "",
    setRoomId: () => { },
    messageList: [],
    setMessageList: () => { },
    dealingList: [],
    setDealingList: () => { },
    duoId: "",
    setDuoId: () => { },
    contactList: [],
    setContactList: () => { },
    roomIdForTabChat: "",
    setRoomIdForTabChat: () => { },
    duoUsername: "",
    setDuoUsername: () => { },
    currentIndex: 0,
    setCurrentIndex: () => { }
});

interface propsInterface {
    children: any
}

const queryString = require("query-string");

export function SocketProvider({ children }: propsInterface) {

    // const socket = null;
    // const socket = io("https://socketkatrade.herokuapp.com", {
    //     secure: true,
    //     transports: ["flashsocket", "polling", "websocket"]
    // });

    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const [roomId, setRoomId] = useState("");
    const history = useHistory();
    const { getUserData, getChatData, getChatList, updateUserContact } = useAuthorization();
    const { search } = useLocation();
    const { duo_id, duo_username, index } = queryString.parse(search);
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [chk, setChk] = useState(false);
    const [dealingList, setDealingList] = useState<IDealing[]>([])
    const [duoId, setDuoId] = useState(duo_id)
    const [contactList, setContactList] = useState<any[]>([])
    const [roomIdForTabChat, setRoomIdForTabChat] = useState("")
    const [duoUsername, setDuoUsername] = useState(duo_username)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

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

    useEffect(() => {
        async function chat() {
            var room;
            if (account._id) {
                if (duo_id < account._id) {
                    room = duo_id + account._id
                }
                else {
                    room = account._id + duo_id
                }
                setRoomId(room)

                var chatData = await getChatData(room);
                // console.log(room)
                // console.log(chatData)
                if (chatData) {
                    setMessageList(chatData.messages)
                }
                // else {
                //     console.log("mai meee naaa ไอบอง")
                // }
            }
        }
        async function sidebar() {
            if (duo_id) {
                if (account._id) {
                    var contactData = await getChatList(account._id)
                    // console.log(contactData)
                    if (contactData) {
                        if (contactData.userContacts.length === 0) {
                            setContactList([{
                                userIdContact: duo_id,
                                userNameContact: duo_username
                            }])
                            updateUserContact(
                                account._id,
                                account.username,
                                duo_id,
                                duo_username
                            )
                        }
                        else {
                            let chkUser = false
                            for (var i = 0; i < contactData.userContacts.length; i++) {
                                if (contactData.userContacts[i].userIdContact === duo_id) {
                                    chkUser = true
                                }
                            }
                            // console.log(contactData.userContacts)
                            // console.log(chkUser)
                            if (!chkUser) {
                                let tmp = [...contactData.userContacts]
                                tmp.splice(0, 0, {
                                    userIdContact: duo_id,
                                    userNameContact: duo_username
                                })
                                setContactList(tmp)
                                updateUserContact(account._id, account.username, duo_id, duo_username)
                            }
                            else {
                                setContactList(contactData.userContacts)
                            }
                        }
                    }
                }
            }
            else {
                if (account._id) {
                    var contactData = await getChatList(account._id)
                    if (contactData) {
                        setContactList(contactData.userContacts)
                    }
                }
            }
        }
        chat()
        sidebar()

    }, [account])

    useEffect(() => {
        // console.log(roomId)
        if (roomId) {
            socket.emit("joinroom", roomId);
        }
    }, [roomId])

    useEffect(() => {
        async function init() {
            var chatData = await getChatData(roomId);
            if (chatData) {
                setMessageList(chatData.messages)
            }
        }
        init()

    }, [roomId])

    socket.on("message", (data: any) => {
        console.log(data)
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
            index,
            roomId,
            setRoomId,
            messageList,
            setMessageList,
            dealingList,
            setDealingList,
            duoId,
            setDuoId,
            contactList,
            setContactList,
            roomIdForTabChat,
            setRoomIdForTabChat,
            duoUsername,
            setDuoUsername,
            currentIndex,
            setCurrentIndex
        }}>
            {children}
        </SocketContext.Provider>
    )
}