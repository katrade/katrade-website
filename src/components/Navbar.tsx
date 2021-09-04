import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Navbar.css';

// icon
import { IoIosNotifications } from "react-icons/io";
import { MdChat } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

import { GiHamburgerMenu } from "react-icons/gi";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WidgetsIcon from '@material-ui/icons/Widgets';
import MenuIcon from '@material-ui/icons/Menu';

// pics
import Logo from '../pics/logo_dark_green.png';

import Block from './Block';

const google = "https://www.google.com";

function Navbar() {

    const [drop, setDrop] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);


    window.addEventListener("resize", resize);

    function resize() {
        // console.log(window.innerWidth)
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

    useEffect(() => {
        resize();
    }, [])

    if (mobile) {
        return <MobileNavbar />
    }

    

    function dropIcon() {
        if (!drop) {
            return <RiArrowDropDownLine />
        }else{
            return <RiArrowDropUpLine />
        }
    }

    return (
        <div className="header py-3">
            <Block height="90px">
                    <div className="header-con">
                        <a href="/app/Market">
                            <img className="logo" src={Logo} />
                        </a>
                        <div>
                            <p className="cate" onClick={() => setDrop(!drop)}>Categories{dropIcon()}</p>
                            <p className="cate-hidden" onClick={() => setDrop(!drop)}><WidgetsIcon /><span className="cat-text"></span>{drop ? <ExpandLessIcon style={{ color: "#757d80" }} /> : <ExpandMoreIcon style={{ color: "#757d80" }} />}</p>
                            <ul className={drop ? "categories active" : "categories"}>
                                <Block height="50px">
                                    <li>
                                        <a href={google}>Clothes</a>
                                    </li>
                                    <li>
                                        <a href={google}>Book</a>
                                    </li>
                                    <li>
                                        <a href={google}>Sports</a>
                                    </li>
                                    <li>
                                        <a href={google}>Clothes</a>
                                    </li>
                                    <li>
                                        <a href={google}>Book</a>
                                    </li>
                                    <li>
                                        <a href={google}>Sports</a>
                                    </li>
                                    
                                </Block>
                            </ul>
                        </div>
                        <form className="search" action="https://www.google.com">
                            <input type="search" className="search-bar" placeholder="Search an items"></input>
                            <button type="submit" className="search-btn" ><GoSearch /></button>
                        </form>
                        <div className="desktop-icon">
                            <a href="/app/account"><BsPersonFill /></a>
                            <a href="/app/request"><FaRegListAlt /></a>
                            <a href={google}><MdChat /></a>
                            <a href=""><IoIosNotifications /></a>
                        </div>
                        <div className="menu-button mx-2" onClick={() => setDropMenu(!dropMenu)}>
                            <MenuIcon />
                            <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                                <a href="/app/account">Account</a>
                                <a href={google}>Chat</a>
                                <a href="/app/request">Notification</a>
                                <a href="">Ding Dong</a>
                            </div>
                        </div>
                        
                    </div>
            </Block>
        </div>
    );
}


const MobileNavbarContainer = styled.div`
    width: 100%;
    max-width: 100%;
    background-color: white;
    min-height: 60px;
    height: auto;
    position: sticky;
    top: 0;
    z-index: 50;
`

function MobileNavbar() {

    // const [clickMobile, SetClickMobile] = useState(false);
    // const handleClickMobile = () => SetClickMobile(!clickMobile);
    
    const [drop, setDrop] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);

    var pathname = window.location.pathname.split('/')[2];
    function displaySearch() {
        if (pathname != "Market"){
            return "d-none";
        }else{
            return "header-con justify-content-center";
        }
    }

    return (
        <MobileNavbarContainer>
            <Block height="60px">
                <div className="header-con float-right">
                    <a href="/app/Market">
                        <img className="logo" src={Logo} height="60px" />
                    </a>

                    <div className="categories-button mx-2" onClick={() => setDrop(!drop)}>
                        <WidgetsIcon style={{ color: "#5e5e5e", width: "20px", margin: "4px" }} /><span className="cat-text"></span>{drop ? <ExpandLessIcon style={{ color: "#757d80" }} /> : <ExpandMoreIcon style={{ color: "#757d80" }} />}
                        {/* <div className={"categories-drop" + (drop ? " show" : " hide")}>
                            <p>Cats</p>
                            <p>Meowww</p>
                            <p>Lemons</p>
                            <p>Master Yoda</p>
                            <p>Snoopdog</p>
                        </div> */}
                    </div>

                    <div className="menu-button mx-2" onClick={() => setDropMenu(!dropMenu)}><MenuIcon /></div>
                    <div className={dropMenu ? "sidemenu-bg" : "d-none"} onClick={() => setDropMenu(!dropMenu)} />
                    <ul className={dropMenu ? "sidemenu active-sidemenu" : "sidemenu"}>
                        <div className="sidemenu-content d-block">
                            <li className="text-center">
                                <a href="/app/account">Account</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/following">Following</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/followers">Followers</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/favorite">My Favorite</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/inventory">Inventory</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/request">Request</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/history">History</a>
                            </li>
                            <li className="text-center">
                                <a href={google}>Logout</a>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className={displaySearch()}>
                    <form className="search" action="https://www.google.com">
                        <input type="search" className="search-bar" placeholder="Search an items"></input>
                        <button type="submit" className="search-btn" ><GoSearch /></button>
                    </form>
                </div>
            </Block>
            <ul className={drop ? "categories-mobile active-mobile" : "categories-mobile"}>
                <Block height="50px">
                    <li>
                        <a href={google}>Clothes</a>
                    </li>
                    <li>
                        <a href={google}>Book</a>
                    </li>
                    <li>
                        <a href={google}>Sports</a>
                    </li>
                    <li>
                        <a href={google}>Clothes</a>
                    </li>
                    <li>
                        <a href={google}>Book</a>
                    </li>
                    <li>
                        <a href={google}>Sports</a>
                    </li>
                                    
                </Block>
            </ul>
        </MobileNavbarContainer>
    )
}

export default Navbar;