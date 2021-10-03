import TabChat from "./TabChat"
import './Chat.css'

export default function SideBar() {
    return (
        <div>
            <div>
				<div className="tab d-flex justify-content-center align-items-center">
					<span className="text-white fw-bold fs-3">Chat</span>
				</div>
				<div className="d-flex lineBar border-top mb-2"></div>
				<TabChat />
				<TabChat />
				<TabChat />
				<TabChat />
			</div>
        </div>
    )
}
