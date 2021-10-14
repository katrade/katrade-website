import TabChat from "./TabChat"
import './Chat.css'
import { useState, useEffect, useContext } from "react"
import useAuthorization from "../../hooks/useAuthorization"
import { SocketContext } from "../../contexts/Socket";


export default function SideBar() {
	console.log("Sidebar Reload")
	// console.log(contactList)
	
	const { getChatList, getChatData, updateUserContact, getDealingList} = useAuthorization()
	const { socket, account, duo_id, duo_username, roomId, setRoomId, contactList } = useContext(SocketContext)
	

	return (
		<div>
			<div>
				<div className="tab d-flex align-items-center justify-content-center">
					<span className="text-white fw-bold fs-3">Chat</span>
				</div>
				<div className="d-flex lineBar border-top mb-2"></div>
				<div>
					{contactList.map((ele: any, index: number) => {
						return (
							<TabChat data={ele} index={index+1}/>
						);
					})}
				</div>
			</div>
		</div>
	)
}