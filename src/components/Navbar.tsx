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

const google = 'https://google.com'

interface INavbar {
    image?: string
}

function Navbar({ image }: INavbar) {

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

    var CategoryData;
    if(category){
        CategoryData = category.map((data:any, index:any) => {
            return <li key={index}>{data.parentCategoryEn}</li>
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
                        <a className="menu-button" onClick={() => setDropMenu(!dropMenu)} style={{ backgroundImage: `url(${image})` }}>{image ? <></> : <BsPersonFill />}
                            <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                                <a onClick={() => history.push("/app/aboutaccount?component=account")}>Account</a>
                                <a onClick={() => history.push("/app/aboutaccount?component=following")}>Following</a>
                                <a onClick={() => history.push("/app/aboutaccount?component=followes")}>Followers</a>
                                <a onClick={() => history.push("/app/aboutaccount?component=inventory")}>Inventory</a>
                                <a onClick={signout}><FiLogOut />&nbsp;Logout</a>
                            </div>
                        </a>
                        <a href="/app/request"><FaRegListAlt /></a>
                        <a onClick={() => {window.alert("ระบบแชท ยังไม่เสร็จสมบูรณ์ครับ")}}><MdChat /></a>
                        <a onClick={() => {window.alert("ระบบแจ้งเดือน ยังไม่เสร็จสมบูรณ์ครับ")}}><IoIosNotifications /></a>
                    </div>
                    <div className="menu-button mx-2" onClick={() => setDropMenu(!dropMenu)}>
                        <MenuIcon />
                        <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                            <a onClick={() => history.push("/app/aboutaccount?component=account")}>Account</a>
                            <a onClick={() => {window.alert("ระบบแชท ยังไม่เสร็จสมบูรณ์ครับ")}}>Chat</a>
                            <a onClick={() => {window.alert("ระบบแจ้งเตือน ยังไม่เสร็จสมบูรณ์ครับ")}}>Notification</a>
                            <a onClick={() => history.push("/app/request")}>Request</a>
                            <a onClick={() => history.push("/app/aboutaccount?component=following")}>Following</a>
                            <a onClick={() => history.push("/app/aboutaccount?component=followers")}>Followers</a>
                            <a onClick={() => history.push("/app/aboutaccount?component=inventory")}>Inventory</a>
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
                                <a href="/app/aboutaccount?component=account">Account</a>
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