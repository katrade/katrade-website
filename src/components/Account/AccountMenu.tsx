import React from "react";

import './AccountMenu.css';

import { BsPersonFill , BsBookmarkFill , BsStarFill , BsBagFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";
// import { BsBookmarkFill } from "react-icons/";
// import { BsBookmarkFill } from "react-icons/";

export default function AccountMenu() {
    return (
        <div className="accountmenu">
            <h5><BsPersonFill />&nbsp;&nbsp;My Account</h5>
            <a href="/app/account"><h6>Proflie</h6></a>
            <a href="/app/changepassword"><h6>Change Password</h6></a>
            <h5><BsBookmarkFill />&nbsp;&nbsp;Follow</h5>
            <a href="/app/following"><h6>Following</h6></a>
            <a href="/app/followers"><h6>Followers</h6></a>
            <a href="/app/favorite"><h5><BsStarFill />&nbsp;&nbsp;My Favorite</h5></a>
            <a href="/app/inventory"><h5><BsBagFill />&nbsp;&nbsp;Inventory</h5></a>
            <a href="/app/history"><h5><BiHistory />&nbsp;&nbsp;History</h5></a>
        </div>
    );
}
