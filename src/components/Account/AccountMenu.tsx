import { useState , useEffect } from 'react';

import './AccountMenu.css';

import { BsPersonFill , BsBookmarkFill , BsStarFill , BsBagFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

function AccountMenu() {

    return (
        // ถ้าลบอันนี้ ไปลบ folder CSS AccountMenu ด้วยเด้อ แจ้งเตือนไว้
        // <div className="accountmenu">
        //     <h5><BsPersonFill />&nbsp;&nbsp;My Account</h5>
        //     <a href="/app/account"><h6>Proflie</h6></a>
        //     <a href="/app/changepassword"><h6>Change Password</h6></a>
        //     <h5><BsBookmarkFill />&nbsp;&nbsp;Follow</h5>
        //     <a href="/app/following"><h6>Following</h6></a>
        //     <a href="/app/followers"><h6>Followers</h6></a>
        //     <a href="/app/favorite"><h5><BsStarFill />&nbsp;&nbsp;My Favorite</h5></a>
        //     <a href="/app/inventory"><h5><BsBagFill />&nbsp;&nbsp;Inventory</h5></a>
        //     <a href="/app/history"><h5><BiHistory />&nbsp;&nbsp;History</h5></a>
        // </div>
        <div>
            <p className="d-flex align-items-center fs-4 fw-bold mb-0" style={{color:"black"}}><BsPersonFill />&nbsp;&nbsp;My Account</p>
            <div className="mb-3 ms-4">
                <a href="/app/account" className="d-block" style={{color:"black",textDecoration:"none"}}>Account</a>
                <a href="/app/changepassword" className="d-block" style={{color:"black",textDecoration:"none"}}>Change Password</a>
            </div>
            <p className="d-flex align-items-center fs-4 fw-bold mb-0" style={{color:"black"}}><BsBookmarkFill />&nbsp;&nbsp;Follow</p>
            <div className="mb-3 ms-4">
                <a href="/app/account" className="d-block" style={{color:"black",textDecoration:"none"}}>Following</a>
                <a href="/app/changepassword" className="d-block" style={{color:"black",textDecoration:"none"}}>Followers</a>
            </div>
            <a href="/app/favorite" className="d-flex align-items-center fs-4 fw-bold mb-3" style={{color:"black",textDecoration:"none"}}><BsStarFill />&nbsp;&nbsp;My Favorite</a>
            <a href="/app/inventory" className="d-flex align-items-center fs-4 fw-bold mb-3" style={{color:"black",textDecoration:"none"}}><BsBagFill />&nbsp;&nbsp;Inventory</a>
            <a href="/app/history" className="d-flex align-items-center fs-4 fw-bold mb-3" style={{color:"black",textDecoration:"none"}}><BiHistory />&nbsp;&nbsp;History</a>
        </div>
    );
}

export default AccountMenu;