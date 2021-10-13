import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../contexts/Socket'
import useAuthorization from '../../hooks/useAuthorization'
import { IDealing } from '../../interfaces/Chat'
import DealItems from './DealItems'


export default function Dealing() {

    const { 
        duo_id, 
        duo_username, 
        account, 
        roomId, 
        dealingList, 
        setDealingList
    } = useContext(SocketContext)
    const { getDealingList } = useAuthorization()


    useEffect(() => {
        async function init() {
            if (duo_id){
                var dealing = await getDealingList(duo_id)
                if (dealing) {
                    setDealingList(dealing)
                }
            }
        }
        init()

    }, [duo_id])

    console.log(dealingList)

    return (
        <div className="chatContainer mt-2">
            <div className="chatContainer-Header d-flex align-items-center">
                <span className="ms-5 text-white">Dealing</span>
            </div>
            {dealingList.map((ele) => {
                return (
                    <DealItems data={ele}/>
                )
            })}
            
        </div>
    )
}
