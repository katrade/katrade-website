import { useContext } from 'react';

import { BsPersonFill, BsBookmarkFill, BsStarFill, BsBagFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

import { DestCompContext } from '../../pages/AboutAccount/AboutAccount'
import P from '../standard/P';

function LSideMenuComp(props: any) {
    const { destCompState, destCompDispatch } = useContext(DestCompContext);
    function sendDestComp(event: any) {
        if (event === "Account") {
            destCompDispatch({ type: "Account" });
        } else if (event === "Change Password") {
            destCompDispatch({ type: "ChangePassword" });
        } else if (event === "Following") {
            destCompDispatch({ type: "Following" });
        } else if (event === "Followers") {
            destCompDispatch({ type: "Followers" });
        } else if (event === "Favorite") {
            destCompDispatch({ type: "Favorite" });
        } else if (event === "Inventory") {
            destCompDispatch({ type: "Inventory" });
        } else if (event === "History") {
            destCompDispatch({ type: "History" });
        }
    }

    return (
        <div>
            <P className="d-flex align-items-center fs-4 fw-bold mb-0"><BsPersonFill />&nbsp;&nbsp;My Account</P>
            <div className="mb-3 ms-4">
                <P className="pointer" onClick={(e: any) => sendDestComp(e.currentTarget.innerHTML)} style={{fontSize: "20px", margin: "0" }}>Account</P>
                <P className="pointer" onClick={(e: any) => sendDestComp(e.currentTarget.innerHTML)} style={{fontSize: "20px", margin: "0" }}>Change Password</P>
            </div>
            <P className="d-flex align-items-center fs-4 fw-bold mb-0"><BsBookmarkFill />&nbsp;&nbsp;Follow</P>
            <div className="mb-3 ms-4">
                <P className="pointer" onClick={(e: any) => sendDestComp(e.currentTarget.innerHTML)} style={{fontSize: "20px", margin: "0" }}>Following</P>
                <P className="pointer" onClick={(e: any) => sendDestComp(e.currentTarget.innerHTML)} style={{fontSize: "20px", margin: "0" }}>Followers</P>
            </div>
            <P onClick={(e: any) => sendDestComp("Favorite")} className="d-flex align-items-center fs-4 fw-bold mb-3 pointer"><BsStarFill />&nbsp;&nbsp;My Favorite</P>
            <P onClick={(e: any) => sendDestComp("Inventory")} className="d-flex align-items-center fs-4 fw-bold mb-3 pointer"><BsBagFill />&nbsp;&nbsp;Inventory</P>
            <P onClick={(e: any) => sendDestComp("History")} className="d-flex align-items-center fs-4 fw-bold mb-3 pointer"><BiHistory />&nbsp;&nbsp;History</P>
        </div>
    );
}

export default LSideMenuComp;