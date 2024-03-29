import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API } from "../app.setting";
import useAuthorization from "../hooks/useAuthorization";

import "./Navbar.css";

// icon
import { IoIosNotifications } from "react-icons/io";
import { MdChat } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import WidgetsIcon from "@material-ui/icons/Widgets";
import MenuIcon from "@material-ui/icons/Menu";

// pics
import Logo from "../pics/logo_dark_green.png";

import Block from "./Block";
import { useCookies } from "react-cookie";

// from aboutaccount
import { DestCompContext } from "../pages/AboutAccount/AboutAccount";
// from market
// import { DestCompContext } from '../pages/Market'

const google = "https://google.com";

interface INavbar {
  image?: string;
}
const subStyles = {
  fontWeight: 500,
  color: "#fff",
  fontSize: "35px",
  display: "inline-block",
  margin: "0 20px",
  cursor: "pointer",
};

function NavbarSpare({ image }: INavbar) {
  const { destCompState, destCompDispatch } = useContext(DestCompContext);
  function sendDestComp(event: any) {
    if (event === "Account") {
      destCompDispatch({ type: "Account" });
    } else if (event === "ChangePassword") {
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
    var pathname = window.location.pathname.split("/")[2];
    function checkpath() {
      if (pathname != "aboutaccount") {
        return history.push(`/app/aboutaccount`);
      }
    }
    checkpath();
  }

  const [drop, setDrop] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const [cookies, setCookies, removeCookies] = useCookies(["DaveTheHornyDuck"]);

  window.addEventListener("resize", resize);
  function resize() {
    if (window.innerWidth < 600) {
      if (mobile) {
        return;
      }
      return setMobile(true);
    } else {
      if (!mobile) {
        return;
      }
      return setMobile(false);
    }
  }

  const [category, setCategory] = useState<any>();
  const { getUserData, getCategory } = useAuthorization();
  const [selectMainCate, setSelcetMainCate] = useState<any>();

  useEffect(() => {
    resize();
    async function init() {
      var CategoryData = await getCategory();
      if (CategoryData) {
        setCategory(CategoryData);
        setSelcetMainCate(CategoryData[0].parentCategoryEn);
      }
    }
    init();
  }, []);

  var CategoryData: any;
  var SubCategoryArrayEn: any = [];
  var SubCategoryArrayTh: any = [];
  const [selectIndex, setSelectIndex] = useState<any>(0);
  if (category) {
    CategoryData = category.map((data: any, index: any) => {
      SubCategoryArrayEn.push(
        data.childCategoryEn.map((subdata: any) => {
          return (
            <span
              onClick={() => {
                searchByNav(subdata);
                setDrop(!drop);
              }}
              style={subStyles}
            >
              {subdata.includes("Faculty of")
                ? subdata.split("Faculty of")[1]
                : subdata}
            </span>
          );
        })
      );
      SubCategoryArrayTh.push(
        data.childCategoryTh.map((subdata: any) => {
          return (
            <span
              onClick={() => {
                searchByNav(subdata);
                setDrop(!drop);
              }}
              style={subStyles}
            >
              {subdata}
            </span>
          );
        })
      );

      return (
        <li
          className=""
          onClick={() => {
            setSelectIndex(index);
            setSelcetMainCate(data.parentCategoryEn);
          }}
          key={index}
        >
          {data.parentCategoryEn}
        </li>
      );
    });
  }

  if (mobile) {
    return <MobileNavbar signout={signout} />;
  }

  function dropIcon() {
    if (!drop) {
      return <RiArrowDropDownLine />;
    } else {
      return <RiArrowDropUpLine />;
    }
  }
  function search() {
    if (!searchText) {
      return alert("Type something, Idiot!!!");
    }
    history.push(`/app/search/${searchText}`);
  }
  function searchByNav(searchNav: any) {
    history.push(
      `/app/search/${selectMainCate + "-" + searchNav + "-byCategory"}`
    );
    window.location.reload();
  }

  function signout() {
    setCookies("DaveTheHornyDuck", "", { path: "/" });
    history.push("/app/signin");
  }

  return (
    <div className="header py-3 bg-white">
      <Block height="auto">
        <div className="header-con">
          <a href="/app/Market">
            <img className="logo" src={Logo} />
          </a>
          <div>
            <p className="cate" onClick={() => setDrop(!drop)}>
              Categories{dropIcon()}
            </p>
            <p className="cate-hidden" onClick={() => setDrop(!drop)}>
              <WidgetsIcon />
              <span className="cat-text"></span>
              {drop ? (
                <ExpandLessIcon style={{ color: "#757d80" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "#757d80" }} />
              )}
            </p>
            <ul className={drop ? "categories active" : "categories"}>
              <Block height="auto">{CategoryData}</Block>
            </ul>
          </div>
          <form className="search">
            <input
              type="search"
              className="search-bar"
              placeholder="Search an items"
              id="searchbar"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            ></input>
            <button type="submit" className="search-btn" onClick={search}>
              <GoSearch />
            </button>
          </form>
          <div className="desktop-icon">
            <a
              className="menu-button"
              onClick={() => setDropMenu(!dropMenu)}
              style={{ backgroundImage: `url(${image})` }}
            >
              {image ? <></> : <BsPersonFill />}
              <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
                <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                  Account
                </a>
                <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                  Following
                </a>
                <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                  Followers
                </a>
                <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                  Inventory
                </a>
                <a onClick={signout}>
                  <FiLogOut />
                  &nbsp;Logout
                </a>
              </div>
            </a>
            <a href="/app/request">
              <FaRegListAlt />
            </a>
            <a href="#">
              <MdChat />
            </a>
            <a href="#">
              <IoIosNotifications />
            </a>
          </div>
          <div
            className="menu-button mx-2"
            onClick={() => setDropMenu(!dropMenu)}
          >
            <MenuIcon />
            <div className={"menu-drop" + (dropMenu ? " show" : " hide")}>
              <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                Account
              </a>
              <a
                onClick={() => {
                  window.alert("ระบบแชท ยังไม่เสร็จสมบูรณ์ครับ");
                }}
              >
                Chat
              </a>
              <a
                onClick={() => {
                  window.alert("ระบบแจ้งเตือน ยังไม่เสร็จสมบูรณ์ครับ");
                }}
              >
                Notification
              </a>
              <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                Following
              </a>
              <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                Followers
              </a>
              <a onClick={(e) => sendDestComp(e.currentTarget.innerHTML)}>
                Inventory
              </a>
              <a onClick={signout}>
                <FiLogOut />
                &nbsp;Logout
              </a>
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
  min-height: auto;
  padding: 16px;
  height: auto;
  position: sticky;
  top: 0;
  z-index: 50;
`;

function MobileNavbar({ signout }: any) {
  // const [clickMobile, SetClickMobile] = useState(false);
  // const handleClickMobile = () => SetClickMobile(!clickMobile);

  const [drop, setDrop] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);

  var pathname = window.location.pathname.split("/")[2];
  function displaySearch() {
    if (pathname != "Market" && pathname != "search") {
      return "d-none";
    } else {
      return "header-con justify-content-center";
    }
  }

  return (
    <MobileNavbarContainer>
      <Block height="auto">
        <div className="header-con float-right">
          <a href="/app/Market">
            <img className="logo" src={Logo} height="60px" />
          </a>

          <div
            className="categories-button mx-2"
            onClick={() => setDrop(!drop)}
          >
            <WidgetsIcon
              style={{ color: "#5e5e5e", width: "20px", margin: "4px" }}
            />
            <span className="cat-text"></span>
            {drop ? (
              <ExpandLessIcon style={{ color: "#757d80" }} />
            ) : (
              <ExpandMoreIcon style={{ color: "#757d80" }} />
            )}
            {/* <div className={"categories-drop" + (drop ? " show" : " hide")}>
                            <p>Cats</p>
                            <p>Meowww</p>
                            <p>Lemons</p>
                            <p>Master Yoda</p>
                            <p>Snoopdog</p>
                        </div> */}
          </div>

          <div
            className="menu-button mx-2"
            onClick={() => setDropMenu(!dropMenu)}
          >
            <MenuIcon />
          </div>
          <div
            className={dropMenu ? "sidemenu-bg" : "d-none"}
            onClick={() => setDropMenu(!dropMenu)}
          />
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
            <input
              type="search"
              className="search-bar"
              placeholder="Search an items"
            ></input>
            <button type="submit" className="search-btn">
              <GoSearch />
            </button>
          </form>
        </div>
      </Block>
      <ul
        className={
          drop ? "categories-mobile active-mobile" : "categories-mobile"
        }
      >
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
  );
}

export default NavbarSpare;
