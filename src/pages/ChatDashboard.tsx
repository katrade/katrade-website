import Chat from "../components/Chats/Chat";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import SideBar from "../components/Chats/SideBar";
import Block from "../components/Block";
import Dealing from "../components/Chats/Dealing";
import { SocketContext, SocketProvider } from "../contexts/Socket";
import { useContext, useEffect, useState } from "react";
import "../components/Chats/Chat.css";
import LogoBg from "../pics/mainlogo-black.png";
import LogoBgDarkMode from "../pics/mainlogo-white.png";
import Div from "../components/standard/Div";
import { ThemeContext } from "../contexts/Theme";

export default function ChatDashboard() {
  const { socket, account, duo_id, duo_username, roomId, setRoomId, duoId } =
    useContext(SocketContext);
  const [handleHide, setHandleHide] = useState(true);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (duo_id || duoId) {
      setHandleHide(false);
    }
  }, [account, duoId]);

  return (
    <Background>
      <Navbar />
      <Block height="90vh">
        <Div dynamicPair={["#ffffff", "#212121"]} className="row p-2 mt-4 pt-3">
          {!handleHide ? (
            <>
              <div className="col-lg-4 pe-0">
                <SideBar />
              </div>
              <div className="col-lg-8">
                <Chat />
                <Dealing />
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-4 pe-0 sidebar">
                <SideBar />
              </div>
              <div className="col-lg-8 d-flex justify-content-center align-items-center">
                <img
                  src={theme === "light" ? LogoBg : LogoBgDarkMode}
                  className="LogoBg"
                />
              </div>
            </>
          )}
        </Div>
      </Block>
      <Footer />
    </Background>
  );
}
