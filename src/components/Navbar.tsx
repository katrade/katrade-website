import { useState , useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API } from '../app.setting.json';
import useAuthorization from '../hooks/useAuthorization';

import './Navbar.css';

// icon
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosNotifications } from "react-icons/io";
import { MdChat } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import WidgetsIcon from '@material-ui/icons/Widgets';
import MenuIcon from '@material-ui/icons/Menu';

// pics
import Logo from '../pics/logo_dark_green.png';

import Block from './Block';
import { useCookies } from 'react-cookie';

import { DestCompContext } from '../pages/AboutAccount/AboutAccount'

const google = 'https://google.com'

interface INavbar {
    image?: string
}

function Navbar({ image }: INavbar) {
    // const { destCompState , destCompDispatch } = useContext(DestCompContext);
    // function sendDestComp(event:any) {
    //     // console.log(event);
    //     if(event === "Account"){
    //         destCompDispatch({ type: "Account"});
    //     }else if(event === "ChangePassword"){
    //         destCompDispatch({ type: "ChangePassword"});
    //     }else if(event === "Following"){
    //         destCompDispatch({ type: "Following"});
    //     }else if(event === "Followers"){
    //         destCompDispatch({ type: "Followers"});
    //     }else if(event === "Favorite"){
    //         destCompDispatch({ type: "Favorite"});
    //     }else if(event === "Inventory"){
    //         destCompDispatch({ type: "Inventory"});
    //     }else if(event === "History"){
    //         destCompDispatch({ type: "History"});
    //     }
    // }
    // console.log(destCompState + "test rabob");

    const [drop, setDrop] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const [cookies, setCookies, removeCookies] = useCookies(['DaveTheHornyDuck']);

    window.addEventListener("resize", resize);
    // console.log("Navbar พูดว่า : " + window.innerWidth);
    function resize() {
        // console.log(window.innerWidth)
        if (window.innerWidth < 600) {
            if (mobile) {
                return
            }
            return setMobile(true)
        } else {
            if (!mobile) {
                return
            }
            return setMobile(false)
        }
    }

    const [ category , setCategory ] = useState<any>();
    const { getUserData , getCategory} = useAuthorization();

    useEffect(() => {
        resize();
        async function init() {
            var CategoryData = await getCategory();
            if (CategoryData) {
                setCategory(CategoryData);
            }
        }
        init();
    }, []);

    var CategoryData:any;
    if(category){
        CategoryData = category.map((data:any, index:any) => {
            return <li>{data.parentCategoryEn}</li>
        });
    }else{
    }

    if (mobile) {
        return <MobileNavbar signout={signout}/>
    }

    function dropIcon() {
        if (!drop) {
            return <RiArrowDropDownLine />
        } else {
            return <RiArrowDropUpLine />
        }
    }
    function search() {
        if (!searchText) {
            return alert('Type something, Idiot!!!')
        }
        history.push(`/app/search/${searchText}`)
    }

    function signout() {
        setCookies('DaveTheHornyDuck', '', { path: '/' });
        history.push('/app/signin');
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
                            <Block height="auto">
                                {CategoryData}
                            </Block>
                        </ul>
                    </div>
                    <form className="search">
                        <input type="search" className="search-bar" placeholder="Search an items" id="searchbar" onChange={(e) => setSearchText(e.target.value)} value={searchText}></input>
                        <button type="submit" className="search-btn" onClick={search}><GoSearch /></button>
                    </form>
                    <div className="desktop-icon">
<<<<<<< HEAD

                        <a onClick={signout} className="pointer"><FaSignOutAlt /></a>
                        <a href="/app/account" style={{ backgroundImage: `url(${image})` }}>{image ? <></> : <BsPersonFill />}</a>
                        <a href="/app/request"><FaRegListAlt /></a>
                        <a><MdChat /></a>
                        <a href=""><IoIosNotifications /></a>
                        
=======
                        <a className="menu-button" onClick={() => setDropMenu(!dropMenu)} style={{ backgroundImage: `url(${image})` }}>{image ? <></> : <BsPersonFill />}
                            <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                                {/* <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>Account</a> */}
                                <a onClick={() => history.push("/app/account")}>Account</a>
                                {/* <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>Following</a> */}
                                <a onClick={() => history.push("/app/following")}>Following</a>
                                {/* <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>Followers</a> */}
                                <a onClick={() => history.push("/app/followers")}>Followers</a>
                                {/* <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>Inventory</a> */}
                                <a onClick={() => history.push("/app/inventory")}>Inventory</a>
                                <a onClick={signout}><FiLogOut />&nbsp;Logout</a>
                            </div>
                        </a>
                        <a href="/app/request"><FaRegListAlt /></a>
                        <a href="#"><MdChat /></a>
                        <a href="#"><IoIosNotifications /></a>
>>>>>>> bc2f12b3c89590035e7b72ce93aa69a2da556451
                    </div>
                    <div className="menu-button mx-2" onClick={() => setDropMenu(!dropMenu)}>
                        <MenuIcon />
                        <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                            <a onClick={() => history.push("/app/account")}>Account</a>
                            <a onClick={() => history.push("#")}>Chat</a>
                            <a onClick={() => history.push("/app/request")}>Notification</a>
                            <a onClick={() => history.push("/app/following")}>Following</a>
                            <a onClick={() => history.push("/app/followers")}>Followers</a>
                            <a onClick={() => history.push("/app/inventory")}>Inventory</a>
                            <a onClick={signout}><FiLogOut />&nbsp;Logout</a>
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

function MobileNavbar({signout}: any) {

    // const [clickMobile, SetClickMobile] = useState(false);
    // const handleClickMobile = () => SetClickMobile(!clickMobile);

    const [drop, setDrop] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);

    var pathname = window.location.pathname.split('/')[2];
    function displaySearch() {
        if (pathname != "Market" && pathname != "search") {
            return "d-none";
        } else {
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
                                <a href="#">Chat</a>
                            </li>
                            <li className="text-center">
                                <a href="/app/request">Notification</a>
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
                                <a onClick={signout}>Logout</a>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className={displaySearch()}>
                    <form className="search" action="/app/search">
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