import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../contexts/Socket'
import useAuthorization from '../../hooks/useAuthorization'
import P from '../standard/P'
// import { IDealing } from '../../interfaces/Chat'
import DealItems from './DealItems'


export default function Dealing() {

    const {
        duo_id,
        duo_username,
        account,
        roomId,
        dealingList,
        setDealingList,
        duoId
    } = useContext(SocketContext)
    const { getDealingList } = useAuthorization()
    const [chkDealing, setChkDealing] = useState(false)

    useEffect(() => {
        async function init() {
            if (duoId) {
                var dealing = await getDealingList(duoId)
                if (dealing) {
                    setDealingList(dealing)
                }
            }
            else {
                if (duo_id) {
                    var dealing = await getDealingList(duo_id)
                    if (dealing) {
                        setDealingList(dealing)
                    }
                }
            }
        }
        init()
    }, [duoId])

    useEffect(() => {
        if (dealingList.length != 0) {
            setChkDealing(true)
            // console.log("UNIIIIIII")
        }
        else {
            setChkDealing(false)
        }
    }, [account, dealingList, roomId])

    // console.log("status chkDealing: " + chkDealing)

    return (
        <div>
            {chkDealing ?
                <div className="chatContainer mt-2">
                    <div className="chatContainer-Header d-flex align-items-center">
                        <span className="ms-5 text-white">Dealing</span>
                    </div>
                    {dealingList.map((ele) => {
                        return (
                            <DealItems data={ele} />
                        )
                    })}
                </div>
                : <div className="chatContainer mt-2">
                    <div className="chatContainer-Header d-flex align-items-center">
                        <span className="ms-5 text-white">Dealing</span>
                    </div>
                    <div
                        className="p-2 m-2 d-flex justify-content-center align-items-center"
                        style={{
                            height: "300px",
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "#c4c4c4"
                        }}>
                        No dealing list
                    </div>
                </div>
            }
        </div>
    )
}
