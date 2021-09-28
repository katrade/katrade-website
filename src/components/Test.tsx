import { Label } from "./Label"
export default function Test() {
    return (
        <>
        <Label style={{ width: "300px", height: "300px", backgroundColor: "#03b1fc"}} content="This is label">
            <div className="full-width full-height" style={{ backgroundColor: "yellow" }}>
                Hello World
            </div>
        </Label>
        <div style={{ width: "700px", height: "700px", backgroundColor: "#fc0352"}}>

        </div>
        </>
    )
}