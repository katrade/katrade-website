import TabChat from "./TabChat"
import './Chat.css'
import { useEffect, useContext } from "react"
import useAuthorization from "../../hooks/useAuthorization"
import { SocketContext } from "../../contexts/Socket";

export default function SideBar() {
	console.log("Sidebar Reload")
	// console.log(contactList)
	const { getChatList, replaceAllUserContact } = useAuthorization()
	const {
		contactList,
		setContactList,
		chkReRenderSidebar,
		setChkReRenderSidebar,
		duoId,
		account,
		duoUsername,
		setCurrentIndex,
		chkTabChatClick
	} = useContext(SocketContext)

	useEffect(() => {
		async function reRenderSidebar() {
			if (chkReRenderSidebar) {
				if (duoId) {
					var contactData = await getChatList(account._id)
					if (contactData) {
						let tmp = [...contactData.userContacts]
						for (var i = 0; i < contactData.userContacts.length; i++) {
							if (contactData.userContacts[i].userIdContact === duoId) {
								tmp.splice(i, 1)
								tmp.splice(0, 0, {
									userIdContact: duoId,
									userNameContact: duoUsername,
								})
								setChkReRenderSidebar(false)
								setContactList(tmp)
								setCurrentIndex(1)
								// console.log(tmp)
								replaceAllUserContact(account._id, duoId)
							}
						}
					}
				}
			}
		}
		reRenderSidebar()

	}, [contactList, chkReRenderSidebar])

	return (
		<div>
			<div className="mb-3">
				<div className="tab d-flex align-items-center justify-content-center">
					<span className="text-white fw-bold fs-3">Chat</span>
				</div>
				<div className="d-flex lineBar mb-2"></div>
				<div style={{
					maxHeight: chkTabChatClick === true ? "750px" : "600px",
					overflowY: "scroll"
				}}>
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