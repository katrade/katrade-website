import io from "socket.io-client";


const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to WS server");

    console.log(socket.connected); 
})

export default function Test() {
    console.log(socket)
    return (
        <div>   
            socket
        </div>
    )
}