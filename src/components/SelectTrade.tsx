import { useState } from 'react';
import useAuthorization from '../hooks/useAuthorization';

import { CgShoppingBag } from "react-icons/all"
import "./SelectTrade.css";
export default function SelectTrade({ onClose, arrayAll, arrayMatch, detailItem }: any) {
    console.log(arrayMatch)
    const { postMyReqeust } = useAuthorization();
    function handleRequest(myIdItem: any) {
        const dataArray = {
            targetUserId: detailItem.owner,
            sourceInventoryId: myIdItem,
            targetInventoryId: detailItem._id,
        }
        postMyReqeust(dataArray);
    }

    const listMatchInventory = arrayMatch.map((data: any, index: any) => {
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

    const listMyInventory = arrayAll.map((data: any, index: any) => {
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

    function noData(){
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight:"300px"}}>
                <p className="">ไม่พบของที่ความต้องการตรงกัน</p>
            </div>
        );
    }

    const [ handleTrade, setHandleTrade ] = useState<any>(listMatchInventory);
    const [ handleSelected, setHandleSelected ] = useState<any>(1);

    return (
        <div className="position-fixed" style={{ zIndex: 99, top: "0", bottom: "0", right: "0", left: "0", }}>
            <div className="position-absolute" onClick={onClose} style={{ backgroundColor: "rgba(0,0,0,0.5)", top: "0", bottom: "0", right: "0", left: "0" }} />
            <div className="position-relative bg-white rounded-3 py-1" style={{ width: "500px", height: "auto", margin: "auto", marginTop: "100px", boxShadow: "0 0 20px rgba(10,10,10,0.3)" }}>
                <div className="m-0 p-0 rounded-top full-width d-flex justify-content-center align-items-center" style={{ backgroundColor: "#fff", height: "70px" }}>
                    <p className="m-0" style={{ fontWeight: 500, color: "#000" }}><CgShoppingBag className="me-2" />Select your item</p>
                </div>
                <div className="row m-0 mx-3" style={{ width: "auto", backgroundColor: "transparent" }}>
                    {/* <div className="col select-items-menu p-0" onClick={() => {setHandleTrade(listMatchInventory); setHandleSelected(1)}}> */}
                    <div className={handleSelected == 1 ? "col select-items-menu p-0 currenttap" : "col select-items-menu p-0"} onClick={() => {setHandleTrade(listMatchInventory); setHandleSelected(1)}}>
                        <p className="m-0 text-center">Matched</p>
                    </div>
                    <div className={handleSelected == 2 ? "col select-items-menu p-0 currenttap" : "col select-items-menu p-0"} onClick={() => {setHandleTrade(listMyInventory); setHandleSelected(2)}}>
                        <p className="m-0 text-center">All</p>
                    </div>
                </div>
                <div className="px-3 py-1" style={{ backgroundColor: '#f0f2f5', height: "400px", overflow:"auto" }}>
                    {handleTrade.length ? handleTrade : noData()}
                </div>

            </div>
        </div>
    );
}