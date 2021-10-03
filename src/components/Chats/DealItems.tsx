import { TransparentButton } from '../../components/standard/Button'
import { AiOutlineSwap } from 'react-icons/ai';

export default function DealItems() {
    return (
        <div className="dealHover p-2 m-2" style={{ height: "167px", borderRadius: "10px", border: "1px solid grey" }}>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <img src="https://www.thaitopinstrument.com/wp-content/uploads/2020/06/s560209402725084130_p1682_i1_w1400-1-1-1024x439.jpeg" alt="" style={{ height: "80px", borderRadius: "10px" }} />
                    <p className="ms-2">Your Item</p>
                </div>
                <div style={{width: "30px"}}>
                    <AiOutlineSwap />
                </div>
                <div className="d-flex">
                    <p className="me-2"><br />BEAM</p>
                    <img src="https://www.flashfly.net/wp/wp-content/uploads/2019/06/apple-car.jpg" alt="" style={{ height: "80px", borderRadius: "10px" }} />
                </div>
            </div>
            <div className="row m-0 p-0 mt-3">
                <div className="col-6">
                    <TransparentButton buttonColor="#00CC52" width="100%" margin="0" padding="0">Confirm Trade</TransparentButton>
                    {/* <button className="btn fs-4" style={{ width: "100%", border: "2px solid #00CC52", borderRadius: "10px", color:"#00CC52"}>Confirm Trade</button> */}
                </div>
                <div className="col-6">
                    <TransparentButton buttonColor="#E20000" width="100%" margin="0" padding="0">Cancel Trade</TransparentButton>
                    {/* <button className="btn fs-4" style={{ width: "100%", border: "2px solid #E20000", borderRadius: "10px", color: "#E20000" }}>Cancel Trade</button> */}
                </div>
            </div>
        </div>
    )
}
