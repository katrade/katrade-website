import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { SocketContext } from "../../contexts/Socket";
import useAuthorization from "../../hooks/useAuthorization";
import "./Chat.css";
import ProfilePic from "./ProfilePic";
import SendIcon from '@material-ui/icons/SendRounded'

export default function Chat() {

    const {
        socket,
        account,
        duo_id,
        duo_username,
        roomId,
        setRoomId,
        messageList,
        setMessageList,
        duoId,
        duoUsername,
        setDuoId
    } = useContext(SocketContext)

    console.log("Chat Reload")
    const [message, setMessage] = useState("");
    const [usernameNow, setUsernameNow] = useState("")

    console.log("KuAYYYYYYY")
    console.log(messageList)

    useEffect(() => {
        console.log(duoUsername)
        setUsernameNow(duoUsername)
        // console.log()
    }, [duoUsername])

    useEffect(() => {
        if (messageList) {
        var msgContainer:any = document.getElementById("messages");
        msgContainer.scrollTop = msgContainer.scrollHeight;
        }
    },[messageList])

    const sendMessage = async () => {
        let messageContent = {
            room: roomId,
            content: {
                sender: account.username,
                senderID: account._id,
                content_type: "Text",
                content: message,
                timeStamp: new Date()
            },
        };
        // console.log(socket.connected)
        socket.emit("message", messageContent)
        // setMessageList([...messageList, messageContent.content]);
        setMessage("");
    };

    return (
        <div>
            <div className="chatContainer">
                <div className="chatContainer-Header d-flex align-items-center px-5">
                    <div style={{
                        minWidth: "47px",
                        minHeight: "47px",
                        maxWidth: "47px",
                        maxHeight: "47px",
                        backgroundImage: `url(${ProfilePic(duoId)})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: "50%",
                        backgroundPosition: "center"
                    }} className="m-0" />
                    <span className="ms-3 text-white">{usernameNow}</span>
                </div>
                <div className="messages" id="messages" style={{ height: "500px", overflow: "auto" }}>
                    {messageList.map((val) => {
                        return (
                            <div className="messageContainer"
                            >
                                <div className={val.sender === account.username ? "yourMsg" : "otherMsg"}>
                                    {val.sender === account.username ?
                                        "" :
                                        <div style={{
                                            minWidth: "47px",
                                            minHeight: "47px",
                                            maxWidth: "47px",
                                            maxHeight: "47px",
                                            backgroundImage: `url(${ProfilePic(duoId)})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderRadius: "50%",
                                            backgroundPosition: "center"
                                        }}>
                                        </div>
                                    }
                                    <div className={val.sender === account.username ? "yourtextBox" : "othertextBox"}>
                                        <p>{val.content}</p>
                                    </div>
                                    {/* <div>
                                            {val.timeStamp}
                                        </div> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="messageInputs p-0 m-0 row my-2" style={{ width: "100%" }}>
                    <div className="col-lg-1">
                        <img
                            src="https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png"
                            style={{
                                maxWidth: "35px",
                                maxHeight: "35px",
                                // margin: "20px 20px",
                                cursor: "pointer"
                            }}
                        />
                    </div>
                    <div className="typingContainer col-lg-10">
                        <input
                            type="text"
                            placeholder="Message..."
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            value={message}
                            id="messageBox"
                            style={{
                                width: "100%",
                                border: "none",
                                margin: "0px"
                            }}
                        />
                    </div>
                    <div className="d-inline-block col-lg-1" >
                        {/* <button onClick={sendMessage}
                            style={{
                                width: "30px",
                                cursor: "pointer"
                            }}
                        > */}
                        <SendIcon
                            style={{
                                //maxWidth: "35px",
                                fontSize: "35px",
                                cursor: "pointer"
                            }}
                            onClick={sendMessage}
                            className="material-icons"
                        />
                        {/* Send */}
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}