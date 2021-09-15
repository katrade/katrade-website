import { useContext } from 'react';

import { BsPersonFill , BsBookmarkFill , BsStarFill , BsBagFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

import { DestCompContext } from '../../pages/AboutAccount/AboutAccount'

function AccountMenu(props:any) {
    const { destCompState , destCompDispatch } = useContext(DestCompContext);
    function sendDestComp(event:any) {
        // console.log(event);
        if(event === "Account"){
            destCompDispatch({ type: "Account"});
        }else if(event === "Change Password"){
            destCompDispatch({ type: "ChangePassword"});
        }else if(event === "Following"){
            destCompDispatch({ type: "Following"});
        }else if(event === "Followers"){
            destCompDispatch({ type: "Followers"});
        }else if(event === "Favorite"){
            destCompDispatch({ type: "Favorite"});
        }else if(event === "Inventory"){
            destCompDispatch({ type: "Inventory"});
        }else if(event === "History"){
            destCompDispatch({ type: "History"});
        }
    }

    return (
        <div>
            <p className="d-flex align-items-center fs-4 fw-bold mb-0 text-dark"><BsPersonFill />&nbsp;&nbsp;My Account</p>
            <div className="mb-3 ms-4">
                <p onClick={(e) => sendDestComp(e.currentTarget.innerHTML)} style={{color:"black",fontSize:"20px",margin:"0"}}>Account</p>
                <p onClick={(e) => sendDestComp(e.currentTarget.innerHTML)} style={{color:"black",fontSize:"20px",margin:"0"}}>Change Password</p>
            </div>
            <p className="d-flex align-items-center fs-4 fw-bold mb-0 text-dark"><BsBookmarkFill />&nbsp;&nbsp;Follow</p>
            <div className="mb-3 ms-4">
                <p onClick={(e) => sendDestComp(e.currentTarget.innerHTML)} style={{color:"black",fontSize:"20px",margin:"0"}}>Following</p>
                <p onClick={(e) => sendDestComp(e.currentTarget.innerHTML)} style={{color:"black",fontSize:"20px",margin:"0"}}>Followers</p>
            </div>
            <p onClick={(e) => sendDestComp("Favorite")} className="d-flex align-items-center fs-4 fw-bold mb-3 text-dark"><BsStarFill />&nbsp;&nbsp;My Favorite</p>
            <p onClick={(e) => sendDestComp("Inventory")} className="d-flex align-items-center fs-4 fw-bold mb-3 text-dark"><BsBagFill />&nbsp;&nbsp;Inventory</p>
            <p onClick={(e) => sendDestComp("History")} className="d-flex align-items-center fs-4 fw-bold mb-3 text-dark"><BiHistory />&nbsp;&nbsp;History</p>
        </div>
    );
}

export default AccountMenu;