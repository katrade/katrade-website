import { SettingsSystemDaydreamOutlined } from '@material-ui/icons'
import { useState, useContext, useEffect } from 'react'
import { SocketContext } from '../../contexts/Socket'
import useAuthorization from '../../hooks/useAuthorization'
import './Chat.css'
// import { IChat, IContact, IMessage } from "../../interfaces/Chat";


export default function Tabchat(props: any) {

    const { socket, account, setAccount, roomId, setRoomId, messageList, duo_id, duoId, setDuoId} = useContext(SocketContext)
    const [lastMessage, setLastMessage] = useState<string>()
    const [sender, setSender] = useState<string>()
    const [haveMessage, setHaveMessage] = useState(false)
    const { getChatData } = useAuthorization();

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
        console.log("CLICK RoomId: " + roomId)

        // setAccount(account)
    }

    useEffect(() => {
        // console.log(account)
        async function init() {
            if (duo_id){
                if (account._id) {
                    var room
                    if (props.data.userIdContact < account._id) {
                        room = props.data.userIdContact + account._id
                    }
                    else {
                        room = account._id + props.data.userIdContact
                    }
                    // console.log("Room:"+room)
                    // array.slice(-1)[0]
                    var chatData = await getChatData(room)
                        if (chatData){
                            if (chatData.messages.length > 0) {
                                let tmp = [...chatData.messages]
                                console.log(tmp)
                                setHaveMessage(true)
                                setLastMessage(tmp[tmp.length - 1].content)
                                setSender(tmp[tmp.length - 1].sender)
                            }
                        }
                }
            }
        }
        init()
        
    }, [account, messageList])

    return (
        <div onClick={handleDivClick}>
            <div className="tabchat row m-0">
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <img src="https://data.whicdn.com/images/349884984/original.jpg" className="rounded-circle m-0" style={{ maxWidth: 65 }} />
                </div>
                <div className="col-9 justify-content-center align-self-center">
                    <span className="fw-bold fs-4">{props.data.userNameContact}</span><br />
                    {haveMessage ?
                        <span>{sender}: {lastMessage}</span>
                        : <span>No Message</span>
                    }

                </div>
            </div>
        </div>
    )
}