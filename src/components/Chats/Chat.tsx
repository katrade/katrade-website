import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
// import { borderRadius } from "react-select/src/theme";
import io from "socket.io-client";
import useAuthorization from "../../hooks/useAuthorization";
import { defaultEmptyAccount, IAccount } from "../../interfaces/IUser";
import "./Chat.css";

// const socket = io("http://localhost:5000");
console.log("sus")
const socket = io("https://socketkatrade.herokuapp.com", {
    transports: ["polling"],
    reconnection: false,
});

socket.on("connect", () => {
    console.log("SOCKET is already connected");
    // console.log(socket.connected);
})

const queryString = require("query-string");

export default function Chat() {
    console.log("Reload")
    // Before Login
    const [loggedIn, setLoggedIn] = useState(true);
    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");

    // After Login
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState<any[]>([]);
    // const [authorName, setAuthorName] = useState<string>("Other");
    const [chk, setChk] = useState(false);
    const { getUserData, getChatData } = useAuthorization();
    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const history = useHistory();

    const { search } = useLocation();
    const { duo_id, duo_username } = queryString.parse(search);


    console.log(messageList)

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
        async function init() {
            var room;
            if (account._id) {
                if (duo_id < account._id) {
                    room = duo_id + account._id
                }
                else {
                    room = account._id + duo_id
                }
                setRoomId(room)
    
                var chatData = await getChatData(roomId);
                // console.log(chatData)
                if (chatData) {
                    setMessageList(chatData.messages)
                }
                else {
                    console.log("mai meee naaa ไอบอง")
                }
            }
        }
        
        init()
        socket.emit("joinroom", roomId);

    }, [account])

    socket.on("message", (data) => {
        let a = [...messageList]
        // console.log(a)
        a.push(data.content)
        setMessageList(a);
        // setMessageList([...messageList, messageContent.content]);
        // console.log(messageList);
        setChk(!chk);
    });

    // const connectToRoom = () => {
    //     setLoggedIn(true);
    //     socket.emit("joinroom", 123);
    // };
    // setInterval(() => {
    //     setChk(!chk);
    // }, 1000);

    const sendMessage = async () => {
        const content: any = document.getElementById("messageBox")

        let messageContent = {
            room: 123,
            content: {
                sender: account.username,
                senderID: account._id,
                content_type: "Text",
                content: content.value,
                timeStamp: new Date()
            },
        };

        socket.emit("message", messageContent)
        // setMessageList([...messageList, messageContent.content]);
        setMessage("");
    };

    // function onKeyDown(event) {
    //     const title = event.target.value;

    //     if (event.key === 'Enter' && title) {
    //     }
    // }

    return (
        <div>
            {!loggedIn ? (
                <div className="logIn">
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="Name..."
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                        {/* <input
                            type="text"
                            placeholder="Room..."
                            onChange={(e) => {
                                setRoom(e.target.value);
                            }}
                        /> */}
                    </div>
                    {/* <button onClick={connectToRoom}>Enter Chat</button> */}
                </div>
            ) : (
                <div className="chatContainer">
                    <div className="chatContainer-Header d-flex align-items-center px-5">
                        <img src="https://data.whicdn.com/images/349884984/original.jpg" className="rounded-circle m-0" style={{ maxWidth: "47px" }} />
                        <span className="ms-3 text-white">{duo_username}</span>
                    </div>
                    <div className="messages" style={{ height: "500px", overflow: "auto" }}>
                        {messageList.map((val, key) => {
                            return (
                                <div className="messageContainer"
                                // id={val.author == userName ? "You" : "Other"}
                                >
                                    <div className={val.sender === account.username ? "yourMsg" : "otherMsg"}>
                                        {val.sender === account.username ? "" :
                                            <div style={{
                                                minWidth: "47px",
                                                minHeight: "47px",
                                                maxWidth: "47px",
                                                maxHeight: "47px",
                                                backgroundImage: "url(https://lordsofgaming.net/wp-content/uploads/2020/10/Screen-Shot-2020-10-19-at-11.15.33-PM.png)",
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                borderRadius: "50%",
                                                backgroundPosition: "center"
                                            }}>
                                            </div>
                                        }
                                        <div className={val.sender === account.username ? "yourtextBox" : "othertextBox"}>
                                            {val.content} ({val.sender})
                                        </div>
                                        {/* <div>
                                            {val.timeStamp}
                                        </div> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="messageInputs p-0 m-0" style={{ width: "100%" }}>
                        <img
                            src="https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png"
                            style={{
                                maxWidth: "35px",
                                maxHeight: "35px",
                                margin: "20px 20px",
                                cursor: "pointer"
                            }}
                        />
                        <div className="typingContainer">
                            <input
                                type="text"
                                placeholder="Message..."
                                // onChange={(e) => {
                                //     setMessage(e.target.value);
                                // }}
                                // value={message}
                                id="messageBox"
                                style={{
                                    width: "95%",
                                    border: "none",
                                    margin: "0px"
                                }}
                            />
                            <div className="d-inline-block">
                                <button onClick={sendMessage}
                                    style={{
                                        width: "30px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}