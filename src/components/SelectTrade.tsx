import { ContactsOutlined } from '@material-ui/icons';
import useAuthorization from '../hooks/useAuthorization';
import { CgShoppingBag } from "react-icons/all"
import "./SelectTrade.css";
export default function SelectTrade({ onClose, array, detailItem }: any) {

    const { postMyReqeust } = useAuthorization();
    function handleRequest(myIdItem: any) {
        const dataArray = {
            userId2: detailItem.owner,
            inventoryId1: myIdItem,
            inventoryId2: detailItem._id,
        }
        // console.log(dataArray);
        postMyReqeust(dataArray);
    }

    const listMyInventory = array.map((data: any, index: any) => {
        console.log(data);
        return (
            <div onClick={() => {
                handleRequest(data._id);
            }}
                style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    margin: "7px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    border: "1px solid #d5d7db",
                    cursor: "pointer",
                }}
                className="d-flex justify-content-start align-items-center"
            >
                <p className="m-0 px-3 me-1" style={{ color: "#000", fontWeight: 500 }}>{data.name}</p>
                <p className="m-0 px-3 me-1" style={{ color: "#999ba1", fontWeight: 400, fontSize: "16px" }}>{data.detail}</p>
            </div >
        );
    })


    return (
        <div className="position-fixed" style={{ zIndex: 99, top: "0", bottom: "0", right: "0", left: "0", }}>
            <div className="position-absolute" onClick={onClose} style={{ backgroundColor: "rgba(0,0,0,0.5)", top: "0", bottom: "0", right: "0", left: "0" }} />
            <div className="position-relative bg-white rounded-3 py-1" style={{ width: "500px", height: "auto", margin: "auto", marginTop: "100px", boxShadow: "0 0 20px rgba(10,10,10,0.3)" }}>
                <div className="m-0 p-0 rounded-top full-width d-flex justify-content-center align-items-center" style={{ backgroundColor: "#fff", height: "70px" }}>
                    <p className="m-0" style={{ fontWeight: 500, color: "#000" }}><CgShoppingBag className="me-2" />Select your item</p>
                </div>
                <div className="row m-0 mx-3" style={{ width: "auto", backgroundColor: "transparent" }}>
                    <div className="col select-items-menu p-0">
                        <p className="m-0 text-center">Matched</p>
                    </div>
                    <div className="col select-items-menu p-0">
                        <p className="m-0 text-center">All</p>
                    </div>
                </div>
                <div className="px-3 py-1" style={{ backgroundColor: '#f0f2f5', minHeight: "500px", maxHeight: "700px" }}>
                    {listMyInventory}
                </div>

            </div>
        </div>
    );
}