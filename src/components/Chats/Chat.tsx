import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";

// const socket = io("http://localhost:5000");
console.log("sus")
const socket = io("https://socketkatrade.herokuapp.com", {
    transports: ["polling"],
    reconnection: false,
});

socket.on("connect", () => {
    console.log("Connected to WS server");
    console.log(socket.connected);
})

export default function Chat() {
    // Before Login
    const [loggedIn, setLoggedIn] = useState(false);
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");

    // After Login
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState<any[]>([]);

    const [chk, setChk] = useState(false);

    useEffect(() => {
        socket.on("message", (data) => {
            let a = messageList
            a.push(data.content)
            setMessageList(a);
            console.log(messageList);
            setMessage("");
        });
    }, []);

    setInterval(() => {
        setChk(!chk);
    }, 1000);

    const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit("joinroom", 123);
    };

    const sendMessage = async () => {
        let messageContent = {
            room: 123,
            content: {
                author: userName,
                message: message,
            },
        };

        socket.emit("message", messageContent)
        // setMessageList([...messageList, messageContent.content]);
        setMessage("");
    };

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
                    <button onClick={connectToRoom}>Enter Chat</button>
                </div>
            ) : (
                <div className="chatContainer">
                    <div className="chatContainer-Header d-flex align-items-center px-5">
                        <img src="https://data.whicdn.com/images/349884984/original.jpg" className="rounded-circle m-0" style={{ maxWidth: "47px" }} />
                        <span className="ms-3 text-white">FranKydeSU</span>
                    </div>
                    <div className="messages" style={{ height: "500px", overflow: "auto" }}>
                        {messageList.map((val, key) => {
                            return (
                                <div className="messageContainer"
                                // id={val.author == userName ? "You" : "Other"}
                                >
                                    <div className={val.author === userName ? "yourMsg" : "otherMsg"}>
                                        {val.author === userName ? "" :
                                            <div style={{ 
                                                    minWidth: "47px", 
                                                    minHeight: "47px",
                                                    maxWidth: "47px", 
                                                    maxHeight: "47px",
                                                    backgroundImage:"url(https://lordsofgaming.net/wp-content/uploads/2020/10/Screen-Shot-2020-10-19-at-11.15.33-PM.png)",
                                                    backgroundSize: 'cover' , 
                                                    backgroundRepeat: 'no-repeat',
                                                    borderRadius:"50%",
                                                    backgroundPosition:"center"
                                                }}>
                                            </div>
                                        }
                                        <div className={val.author === userName ? "owntextBox" : "othertextBox"}>
                                            {val.message} ({val.author})
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="messageInputs row p-0 m-0" style={{ width: "100%" }}>
                        <input
                            className="col-9"
                            type="text"
                            placeholder="Message..."
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            value={message}
                            style={{ borderBottomLeftRadius: "10px" }}
                        />
                        <button className="col-3" onClick={sendMessage} style={{ borderBottomRightRadius: "10px" }}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}