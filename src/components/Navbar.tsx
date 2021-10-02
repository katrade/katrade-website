import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API } from '../app.setting.json';
import useAuthorization from '../hooks/useAuthorization';
import { Label } from './Label';
import { ThemeContext } from '../contexts/Theme'

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
import LogoWhite from "../pics/logo_white_green.png";

import Block from './Block';
import { useCookies } from 'react-cookie';
import { CgNpm } from 'react-icons/cg';

const google = 'https://google.com'

const wallpapers = [
    "https://cutewallpaper.org/21/men-fashion-wallpapers/Mens-Fall-Fashion-Wallpapers-High-Quality-Download-Free.jpg",
    "https://i.pinimg.com/originals/c6/23/60/c623608e991cb9d3e106b3ee1227dc2f.jpg",
    "https://wallpaperaccess.com/full/1191051.jpg",
    "https://i2.wp.com/the-avocado.org/wp-content/uploads/2020/08/background-book-bookcase-books.jpg?fit=910%2C607&ssl=1",
    "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzayUyMHNldHVwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://www.santabanta.com/images/wallpapers/babes/black-guitar-musical-instrument-wallpaper-1024-768-0.jpg",
    "https://st2.depositphotos.com/4055463/7397/i/600/depositphotos_73971209-stock-photo-young-gorgeous-caucasian-woman-wearing.jpg",
    "https://i0.wp.com/avante.biz/wp-content/uploads/Doraemon-wallpaper-HD-iphone/Doraemon-wallpaper-HD-iphone2.jpg",
    "https://rosesimstore.com/wp-content/uploads/2019/06/Summers-Men-Shoes-Men-Sneakers-Flat-Male-Casual-Shoes-Comfortable-Men-Footwear-Breathable-Mesh-Sport-Tzapatos-4.jpg",
    "https://ae01.alicdn.com/kf/HTB1l1iStBmWBuNkSndVq6AsApXa9/Women-High-Heels-Office-Shoes-Women-Sandals-Women-Cross-Strap-Brown-Black-Shoes-Pu-Leather-Boots.jpg_Q90.jpg_.webp",
    "https://img1.exportersindia.com/product_images/bc-full/dir_109/3247300/sports-accessories-1482641.jpg",
    "https://joburg.co.za/wp-content/uploads/2016/01/stationery2.jpg",
    "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/snacks-in-america.jpg?quality=82&strip=1&resize=640%2C360",
    "https://wallpaperaccess.com/full/1804560.jpg",
    "https://s.isanook.com/ca/0/ui/281/1405996/oatmealpopcat_234623206_147287474156656_3695665365715248797_n.jpg",
    "https://i.redd.it/wsqdveakw8l41.jpg",
    "https://www.matichon.co.th/wp-content/uploads/2018/05/%E0%B8%AD.%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%B4%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B8%A2OA120360_%E0%B9%91%E0%B9%97%E0%B9%90%E0%B9%93%E0%B9%90%E0%B9%97_0023.jpg"

]
const backgroundImageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: "0.9",
    filter: "brightness(0.2)",
    borderRadius: "2px",
    whitSpace: "normal",
    textWrap: "normal",
}
const subStyles = {
    fontWeight: 500,
    color: "#fff",
    fontSize: "35px",
    display: "inline-block",
    margin: "0 20px",
}
interface INavbar {
    image?: string
}

function Navbar({ image }: INavbar) {

    const [drop, setDrop] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const { theme } = useContext(ThemeContext);
    const [cookies, setCookies, removeCookies] = useCookies(['DaveTheHornyDuck']);

    window.addEventListener("resize", resize);
    function resize() {
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

    const [category, setCategory] = useState<any>();
    const { getCategory } = useAuthorization();

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
    var SubCategoryArrayEn: any = [];
    var SubCategoryArrayTh: any = [];
    const [selectIndex, setSelectIndex] = useState<any>(0);
    if (category) {
        CategoryData = category.map((data: any, index: any) => {
            SubCategoryArrayEn.push(data.childCategoryEn.map((subdata: any) => {
                return <span style={subStyles}>{subdata.includes("Faculty of") ? subdata.split("Faculty of")[1] : subdata}</span>;
            }));
            SubCategoryArrayTh.push(data.childCategoryTh.map((subdata: any) => {
                return <span style={subStyles}>{subdata}</span>;
            }));

            return <li className="" onClick={() => setSelectIndex(index)} key={index}>{data.parentCategoryEn}</li>;
        });

    }

    if (mobile) {
        return <MobileNavbar signout={signout} />
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
        <div className="header py-3" style={{ backgroundColor: theme === "light" ? "#ffffff" : "#141414"}}>
            <Block height="90px">
                <div className="header-con">
                    <a href="/app/Market">
                        <img className="logo" src={theme === "light" ? Logo : LogoWhite} />
                    </a>
                    <div>
                        <p className="cate" onClick={() => setDrop(!drop)} style={{color: theme === "light" ? "rgb(44, 44, 44)" : "#fff"}}>Categories{dropIcon()}</p>
                        <p className="cate-hidden" onClick={() => setDrop(!drop)}><WidgetsIcon /><span className="cat-text"></span>{drop ? <ExpandLessIcon style={{ color: "#757d80" }} /> : <ExpandMoreIcon style={{ color: "#757d80" }} />}</p>
                        <ul className={drop ? "categories active" : "categories"}>
                            { category ?
                            <Block height="auto">
                                <div className="row" style={{ width: "100%"}}>
                                    <div className="col-2" style={{ width: "150px" }}>
                                        {CategoryData}
                                    </div>
                                    <div className="col-1" />
                                    <div 
                                        className="col-8"
                                        style={{
                                            position: "relative"
                                        }}                                  
                                    >
                                        <div style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            right: "0",
                                            bottom: "0",
                                            zIndex: 59,
                                            margin: "70px 20px",
                                            textAlign: "center",
                                        }}>
                                            {/* <h1 className="text-white">{category[selectIndex].parentCategoryEn}</h1>
                                            <hr style={{
                                                backgroundColor: "#fff",
                                                border: "1px #fff solid",
                                                opacity: 0.3,
                                                borderRadius: "1px",
                                            }}/> */}
                                            {SubCategoryArrayEn[selectIndex]}
                                        </div>
                                        <div
                                            style={{ 
                                                backgroundImage: `url(${wallpapers[selectIndex]})`,
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                right: "0",
                                                bottom: "0",
                                                ...backgroundImageStyles,
                                                zIndex: 30,
                                                }}
                                        ></div>
                                        
                                    </div>


                                </div>
                            </Block>
                            : null
                            }
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
                                {/* <a onClick={() => history.push("/app/aboutaccount?component=following")}>Following</a>
                                <a onClick={() => history.push("/app/aboutaccount?component=followers")}>Followers</a> */}
                                <a onClick={() => history.push("/app/aboutaccount?component=inventory")}>Inventory</a>
                                <a onClick={() => history.push("/app/settings")}>Settings</a>
                                <a onClick={signout}><FiLogOut />&nbsp;Logout</a>
                            </div>
                        </a>
                        <Label content="Requests" className="icon pointer">
                            <a href="/app/request"><FaRegListAlt /></a>
                        </Label>
                        <Label content="Chat" className="icon pointer">
                            <a onClick={() => { window.alert("ระบบแชท ยังไม่เสร็จสมบูรณ์ครับ") }}><MdChat /></a>
                        </Label>
                        <Label content="Notification" className="icon pointer">
                            <a onClick={() => { window.alert("ระบบแจ้งเดือน ยังไม่เสร็จสมบูรณ์ครับ") }}><IoIosNotifications /></a>
                        </Label>
                    </div>
                    <div className="menu-button mx-2" onClick={() => setDropMenu(!dropMenu)}>
                        <MenuIcon />
                        <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                            <a onClick={() => history.push("/app/aboutaccount?component=account")}>Account</a>
                            <a onClick={() => { window.alert("ระบบแชท ยังไม่เสร็จสมบูรณ์ครับ") }}>Chat</a>
                            <a onClick={() => { window.alert("ระบบแจ้งเตือน ยังไม่เสร็จสมบูรณ์ครับ") }}>Notification</a>
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
    min-height: 60px;
    height: auto;
    position: sticky;
    top: 0;
    z-index: 50;
`

function MobileNavbar({ signout }: any) {

    // const [clickMobile, SetClickMobile] = useState(false);
    // const handleClickMobile = () => SetClickMobile(!clickMobile);

    const [drop, setDrop] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);
    const { theme } = useContext(ThemeContext);

    var pathname = window.location.pathname.split('/')[2];
    function displaySearch() {
        if (pathname != "Market" && pathname != "search") {
            return "d-none";
        } else {
            return "header-con justify-content-center";
        }
    }

    return (
        <MobileNavbarContainer style={{ backgroundColor: theme === "light" ? "#ffffff" : "#141414"}}>
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

function subdata(subdata: any, any: any): any {
    throw new Error('Function not implemented.');
}
