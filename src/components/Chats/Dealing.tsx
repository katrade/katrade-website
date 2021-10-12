import { useContext } from 'react'
import { SocketContext } from '../../contexts/Socket'
import DealItems from './DealItems'

export default function Dealing() {

    // const { socket } = useContext(SocketContext)
    // console.log(socket)

    return (
        <div className="chatContainer mt-2">
            <div className="chatContainer-Header d-flex align-items-center">
                <span className="ms-5 text-white">Dealing</span>
            </div>
            <DealItems />
            <DealItems />
            <DealItems />
        </div>
    )
}
