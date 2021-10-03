import Chat from '../components/Chats/Chat'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import SideBar from '../components/Chats/SideBar'
import Block from '../components/Block'
import Dealing from '../components/Chats/Dealing'

export default function ChatDashboard() {
    return (
        <Background>
            <Navbar />
            <Block height="85vh" backgroundColor="#f7f7f7" darkBackgroundColor="#3d3d3d">
                <div className="row bg-white p-2 mt-4 pt-3">
                    <div className="col-lg-4">
                        <SideBar />
                    </div>
                    <div className="col-lg-8">
                        <Chat />
                        <Dealing />
                    </div>
                </div>
            </Block>
            <Footer />
        </Background>
    )
}
