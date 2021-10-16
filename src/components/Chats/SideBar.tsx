import TabChat from "./TabChat"
import './Chat.css'
import { useState, useEffect, useContext } from "react"
import useAuthorization from "../../hooks/useAuthorization"
import { SocketContext } from "../../contexts/Socket";


export default function SideBar() {
	console.log("Sidebar Reload")
	// console.log(contactList)
	const { getChatList, getChatData, updateUserContact, getDealingList } = useAuthorization()
	const {
		contactList,
		setContactList,
		messageList,
		duoId,
		account,
		duoUsername,
		chkReRenderSidebar,
		setChkReRenderSidebar
	} = useContext(SocketContext)

	// useEffect(() => {
	// 	async function reRenderSidebar() {
	// 		if (chkReRenderSidebar) {
	// 			if (duoId) {
	// 				var contactData = await getChatList(account._id)
	// 				if (contactData) {
	// 					let tmp = [...contactData.userContacts]
	// 					for (var i = 0; i < contactData.userContacts.length; i++) {
	// 						if (contactData.userContacts[i].userIdContact === duoId) {
	// 							tmp.splice(i, 1)
	// 							tmp.splice(0, 0, {
    //                                 userIdContact: duoId,
    //                                 userNameContact: duoUsername
    //                             })
	// 							setContactList(tmp)
	// 							console.log(tmp)
	// 							setChkReRenderSidebar(false)
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	reRenderSidebar()

	// }, [chkReRenderSidebar])

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
							<TabChat data={ele} index={index + 1} />
						);
					})}
				</div>
			</div>
		</div>
	)
}