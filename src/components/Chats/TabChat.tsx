import './Chat.css'

export default function Tabchat(props: any) {
    return (
        <div>
            <div className="tabchat row m-0">
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <img src="https://data.whicdn.com/images/349884984/original.jpg" className="rounded-circle m-0" style={{ maxWidth: 65 }} />
                </div>
                <div className="col-9 justify-content-center align-self-center">
                    <span className="fw-bold fs-4">{props.data.userNameContact}</span><br />
                    <span>Current text...</span>
                </div>
            </div>
        </div>
    )
}