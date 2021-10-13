import Chat from '../components/Chats/Chat'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import SideBar from '../components/Chats/SideBar'
import Block from '../components/Block'
import Dealing from '../components/Chats/Dealing'
import { SocketContext, SocketProvider } from '../contexts/Socket'
import { useContext, useEffect, useState } from 'react'
import '../components/Chats/Chat.css'
import LogoBg from '../pics/mainlogo-black.png'

export default function ChatDashboard() {
    const { socket, account, duo_id, duo_username, roomId, setRoomId } = useContext(SocketContext)
    const [handleHide, setHandleHide] = useState(true)

    useEffect(() => {
        if (duo_id) {
            setHandleHide(false)
        }
        // console.log("NO querystring")
    }, [account])

    return (
        <Background>
            <Navbar />
            <Block height="90vh" backgroundColor="#f7f7f7" darkBackgroundColor="#3d3d3d">
                <SocketProvider>
                    <div className="row bg-white p-2 mt-4 pt-3">
                        {handleHide ?
                            <>
                                <div className="col-lg-4 pe-0 sidebar">
                                    <SideBar />
                                </div>
                                <div className="col-lg-8 d-flex justify-content-center align-items-center">
                                    <img src={LogoBg} className="LogoBg" />
                                </div>
                            </>
                            :<>
                                <div className="col-lg-4 pe-0">
                                    <SideBar />
                                </div>
                                <div className="col-lg-8">
                                    <Chat />
                                    <Dealing />
                                </div>
                            </>
                        }
                    </div>
                </SocketProvider>
            </Block>
            <Footer />
        </Background>
    )
}
