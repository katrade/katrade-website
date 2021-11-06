import { SettingsSystemDaydreamOutlined } from '@material-ui/icons'
import { useState, useContext, useEffect } from 'react'
import { SocketContext } from '../../contexts/Socket'
import useAuthorization from '../../hooks/useAuthorization'
import P from '../standard/P'
import './Chat.css'
import ProfilePic from './ProfilePic'
// import { IChat, IContact, IMessage } from "../../interfaces/Chat";


export default function Tabchat(props: any) {

    const {
        account,
        setRoomId,
        duo_id,
        duo_username,
        setDuoId,
        setDuoUsername,
        currentIndex,
        setCurrentIndex,
        chkMessage,
        setChkMessage
    } = useContext(SocketContext)
    const [lastMessage, setLastMessage] = useState<string>('')
    const [sender, setSender] = useState<string>()
    const [haveMessage, setHaveMessage] = useState(false)
    const { getLastChatData } = useAuthorization();
    const [classNameActive, setClassNameActive] = useState<string>("tabchat row m-0")

    // console.log(props.data)
    const handleDivClick = () => {
        var room
        if (props.data.userIdContact < account._id) {
            room = props.data.userIdContact + account._id
        }
        else {
            room = account._id + props.data.userIdContact
        }
        setRoomId(room)
        setDuoId(props.data.userIdContact)
        setDuoUsername(props.data.userNameContact)
        // console.log("CLICK RoomId: " + roomId)
        // console.log("SET duoId: " + duoId)
        setCurrentIndex(props.index)
        // setAccount(account)
    }

    useEffect(() => {
        if (props.index === currentIndex) {
            setClassNameActive("tabchat-active row m-0")
        }
        else {
            setClassNameActive("tabchat row m-0")
        }

    }, [currentIndex])

    useEffect(() => {
        // console.log(account)
        async function init() {
            console.log("Fetch Last chat data")
            if (account._id) {
                var room
                if (props.data.userIdContact < account._id) {
                    room = props.data.userIdContact + account._id
                }
                else {
                    room = account._id + props.data.userIdContact
                }
                // console.log("Room:" + room)
                // setRoomIdForTabChat(room)
                var chatData = await getLastChatData(room)
                // console.log(chatData)
                if (chatData) {
                    if (chatData.content) {
                        setHaveMessage(true)
                        setLastMessage(chatData.content)
                        setSender(chatData.sender)
                        setChkMessage(false)
                    }
                }
            }
        }
        init()

    }, [account, chkMessage])

    

    if (duo_id === account._id || duo_username === account.username || props.data.userNameContact == account.username) {
        return null
    } 
    else {
        return (
            <div onClick={handleDivClick}>
                <div className={classNameActive}>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <div className="m-0" style={{
                            minWidth: "65px",
                            minHeight: "65px",
                            maxWidth: "65px",
                            maxHeight: "65px",
                            backgroundImage: `url(${ProfilePic(props.data.userIdContact)})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: "50%",
                            backgroundPosition: "center"
                        }} />
                    </div>
                    <div className="col-9 justify-content-center align-self-center">
                        <P className="fw-bold fs-4">{props.data.userNameContact}</P>
                        {haveMessage ?
                            <P className="limit">{sender}: {lastMessage}</P>
                            : <P>No Message</P>
                        }

                    </div>
                </div>
            </div>
        )
    }
}