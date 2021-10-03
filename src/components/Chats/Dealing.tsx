import DealItems from './DealItems'

export default function Dealing() {
    return (
        <div className="chatContainer mt-2">
            <div className="headerChat d-flex align-items-center">
                <span className="ms-5 text-white">Dealing</span>
            </div>
            <DealItems />
            <DealItems />
            <DealItems />
        </div>
    )
}
