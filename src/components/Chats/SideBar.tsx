import TabChat from "./TabChat"
import './Chat.css'
import { useState, useEffect, useContext } from "react"
import useAuthorization from "../../hooks/useAuthorization"
import { SocketContext } from "../../contexts/Socket";


export default function SideBar() {
	console.log("Sidebar Reload")
	const [contactList, setContactList] = useState<any[]>([])
	const { getChatList } = useAuthorization()
	const { socket, account, duo_id, duo_username, roomId, setRoomId } = useContext(SocketContext)

	useEffect(() => {
		async function init() {
			if (account._id) {
				var contactData = await getChatList(account._id)
				console.log(contactData)
				if (contactData) {
					if (contactData.userContacts.length === 0) {
						setContactList([{userIdContact: duo_id, userNameContact: duo_username}])
					}
					else {
						let tmp = [...contactData.userContacts]
						tmp.splice(0, 0, {userIdContact: duo_id, userNameContact: duo_username})
						setContactList(tmp)
					}
				}
			}
		}

		init()
	}, [account])


	return (
		<div>
			<div>
				<div className="tab d-flex align-items-center justify-content-center">
					<span className="text-white fw-bold fs-3">Chat</span>
				</div>
				<div className="d-flex lineBar border-top mb-2"></div>
				<div>
					{contactList.map((ele: any) => {
						return (
							<TabChat data={ele} />
						);
					})}
				</div>
			</div>
		</div>
	)
}