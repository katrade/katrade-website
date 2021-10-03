import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";

// const socket = io("http://localhost:5000");
const socket = io("https://socketkatrade.herokuapp.com");

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
                    <div className="headerChat d-flex align-items-center px-5">
                        <img src="https://data.whicdn.com/images/349884984/original.jpg" className="rounded-circle m-0" style={{ maxWidth: 47 }} />
                        <span className="ms-3 text-white">FranKydeSU</span>
                    </div>
                    <div className="messages">
                        {messageList.map((val, key) => {
                            return (
                                <div
                                    className="messageContainer"
                                    id={val.author == userName ? "You" : "Other"}
                                >
                                    <div className="messageIndividual">
                                        {val.author}: {val.message}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="messageInputs">
                        <input
                            type="text"
                            placeholder="Message..."
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            value={message}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}