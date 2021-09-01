import { useState } from 'react';

import './AccountMenu.css';

import { BsPersonFill , BsBookmarkFill , BsStarFill , BsBagFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";
// import { BsBookmarkFill } from "react-icons/";
// import { BsBookmarkFill } from "react-icons/";

function AccountMenu() {
    
    const [mobile, setMobile] = useState(false);

    window.addEventListener("resize", resize);

    function resize() {
        console.log(window.innerWidth)
        if (window.innerWidth < 600) {
            if (mobile) {
                return
            }
            return setMobile(true) 
        }
        else {
            if (!mobile) {
                return
            }
            return setMobile(false)
        }
    }

    if (mobile) {
        return <MobileAccountMenu />
    }

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

function MobileAccountMenu() {
    return(
        <div className="accountmenu-mobile">
            <BsPersonFill />
            <BsBookmarkFill />
            <BsStarFill />
            <BsBagFill />
            <BiHistory />
        </div>
    );
}

export default AccountMenu;