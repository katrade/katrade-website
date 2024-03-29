import "./Product.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useHistory } from "react-router";
import useAuthorization from "../hooks/useAuthorization";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Block from "../components/Block";
import ProductPost from "../components/ProductPost";
import SelectTrade from "../components/SelectTrade";

import { BsStarFill } from "react-icons/bs";
import { SolidButton, TransparentButton } from "../components/standard/Button";
// import { AiOutlineConsoleSql } from 'react-icons/ai';
import { FcLike } from "react-icons/fc";
import useLoading from "../hooks/useLoading";
import ProfilePic from "../components/Account/ProfilePic";

import Background from "../components/Background";
import Div from "../components/standard/Div";
import { H4 } from "../components/standard/H";
import P from "../components/standard/P";

import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

const queryString = require("query-string");

const backgroundImageStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

function Product() {
  const { search } = useLocation();
  const { product_id } = queryString.parse(search);
  const { theme } = useContext(ThemeContext);

  const {
    getMyInventory,
    getSelectInventory,
    getDetailProduct,
    getUserData,
    postMyReqeust,
    addFavourite,
    deleteFavourite,
    onFollow,
    unFollow,
    getFollowCheck,
    getUserFollowData,
    getAnotherUser,
    getMatchProduct,
  } = useAuthorization();
  const [data, setData] = useState<any>(null);
  const [myAccout, setMyAccout] = useState<any>(null);
  const [inventory, setInventory] = useState<any>();
  const [matchInventory, setMatchInventory] = useState<any>();
  const [mobile, setMobile] = useState(false);
  const [followChk, setFollowChk] = useState<boolean>();
  const [followerData, setFollowerData] = useState<any>();
  const [anotherUserData, setAnotherUserData] = useState<any>();
  const [show, hide] = useLoading();

  // แสดงผลตัวเลขบนหน้าจอ
  const [handleFollow, setHandleFollow] = useState<any>();
  const [waiting, setWaiting] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    resize();
    async function init() {
      var getUser: any = await getUserData();
      if (getUser) {
        setMyAccout(getUser);
      }
      var dataDetail = await getDetailProduct(product_id);
      hide();
      if (dataDetail) {
        setData(dataDetail);
        setHandleFavorite(dataDetail.favourite.length);
        var getMatch = await getMatchProduct(dataDetail._id);
        setMatchInventory(getMatch);
        var dataOwner = await getAnotherUser(dataDetail.owner);
        setAnotherUserData(dataOwner);
        var getFollowChk = await getFollowCheck(dataDetail.owner);
        setFollowChk(getFollowChk.value);
        var getFollowerData = await getUserFollowData(dataDetail.owner);
        setFollowerData(getFollowerData.follower.length);
        setHandleFollow(getFollowerData.follower.length);
        setWaiting(true);
      }

      var getUser: any = await getUserData();
      if (getUser) {
        setMyAccout(getUser);
      }
      var getInventory = await getSelectInventory();
      if (getInventory) {
        setInventory(getInventory);
      }
    }
    init();
  }, []);

  const [checkFavoritetmp, setCheckFavoritetmp] = useState<boolean>();
  useEffect(() => {
    if (myAccout != null && data != null) {
      setCheckFavoritetmp(myAccout.favourite.includes(data._id));
    }
  }, [data, myAccout]);

  var forOwner = 0;
  if (data && myAccout) {
    if (data.owner == myAccout._id) {
      forOwner = 1;
    }
  }

  window.addEventListener("resize", resize);
  function resize() {
    if (window.innerWidth < 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [posiitonPhoto, setPositionPhoto] = useState<any>(null);
  function clickPhoto(position: any) {
    setSelectPhoto("click");
    setPositionPhoto(position);
  }
  function closePhoto() {
    setSelectPhoto(null);
    setPositionPhoto(null);
  }
  let photoPost = null;
  if (!!selectPhoto) {
    photoPost = (
      <ProductPost
        onBgClick={closePhoto}
        photoLink={data.pictures[posiitonPhoto]}
      />
    );
  }

  const [selectTrade, setSelectTrade] = useState<any>(null);
  function clickRequest() {
    if (myAccout.inventories.length == 0) {
      window.alert("คุณยังไม่มีสิ่งของเลย ไปเพิ่มก่อนสิ");
    } else {
      setSelectTrade("Click");
    }
  }
  function closeRequest() {
    setSelectTrade(null);
  }
  let requestTrade = null;
  if (!!selectTrade) {
    if (inventory && matchInventory) {
      requestTrade = (
        <SelectTrade
          onClose={closeRequest}
          arrayAll={inventory}
          arrayMatch={matchInventory}
          detailItem={data}
        />
      );
    }
  }

  const [requireDetail, SetRequireDetail] = useState<any>();
  const [tmpRequireDetailShow, setTmpRequireDetailShow] = useState<any>("m-0");
  function changeRequireDetail(index: any) {
    SetRequireDetail(data.require[index].detail);
    setTmpRequireDetailShow("d-none");
  }

  // Listening for Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePhoto();
    }
  });

  // const [ favorite , setFavorite] = useState(true);
  const [handleFavorite, setHandleFavorite] = useState<any>();
  const handleClickFavorite = () => setCheckFavoritetmp(!checkFavoritetmp);
  function favorite_btn() {
    if (!checkFavoritetmp) {
      return (
        <div style={{ width: "100%" }}>
          <SolidButton
            onClick={() => {
              addFavourite(data._id);
              setHandleFavorite(handleFavorite + 1);
            }}
            className="px-3 d-flex justify-content-center align-items-center"
            width="50px"
            height="50px"
            fontSize="24px"
            buttonColor="transparent"
            margin="0"
            style={{
              boxShadow: "0 0 8px rgba(10,10,10,0.1)",
              color: "#ed2b3e",
              border: "1px solid #ed2b3e",
              width: "100%",
            }}
          >
            <FcLike />
          </SolidButton>
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%" }}>
          <SolidButton
            onClick={() => {
              deleteFavourite(data._id, checkpath);
              setHandleFavorite(handleFavorite - 1);
            }}
            className="px-3 d-flex justify-content-center align-items-center"
            width="50px"
            height="50px"
            fontSize="24px"
            buttonColor="transparent"
            margin="0"
            style={{
              boxShadow: "0 0 8px rgba(10,10,10,0.1)",
              backgroundColor: "#ed2b3e",
              border: "1px solid #ed2b3e",
              color: "#fff",
              width: "100%",
            }}
          >
            <FcLike style={{ filter: "brightness(10)" }} />
          </SolidButton>
        </div>
      );
    }
  }

  const handleClickFollow = () => setFollowChk(!followChk);
  function follow_btn() {
    if (!followChk) {
      return (
        <TransparentButton
          width="80px"
          height="30px"
          buttonColor="blue"
          padding="0"
          margin="10px 5px"
          onClick={() => {
            onFollow(data.owner);
            setHandleFollow(handleFollow + 1);
          }}
        >
          Follow
        </TransparentButton>
      );
    } else {
      return (
        <TransparentButton
          width="80px"
          height="30px"
          buttonColor="blue"
          padding="0"
          margin="10px 5px"
          onClick={() => {
            unFollow(data.owner);
            setHandleFollow(handleFollow - 1);
          }}
        >
          unfollow
        </TransparentButton>
      );
    }
  }

  const handleClickChat = () => {
    history.push(
      `/app/chat?duo_id=${data.owner}&duo_username=${data.username}`
    );
  };

  const [clickSubRequire, setClickSubRequire] = useState<any>(0);
  const [SubRequire, setSubRequire] = useState<any>();
  if (data) {
    var checkpath = window.location.pathname;
    var dateOfProduct = data.timeStamp
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
    const wantCate = data.require.map((data: any, index: any) => {
      // setSubRequire(<p>{data.reqCat.parentCategoryEn} : {data.reqCat.childCategoryEn}</p>);
      return (
        <div
          key={index}
          onClick={() => {
            changeRequireDetail(index);
            setClickSubRequire(index);
            setSubRequire(
              <p>
                {data.reqCat.parentCategoryEn} : {data.reqCat.childCategoryEn}
              </p>
            );
          }}
          className="bagde bagde-sm rounded-pill px-2 m-1 py-1 pointer"
          style={
            clickSubRequire == index
              ? { backgroundColor: "#15C777" }
              : { backgroundColor: "#EDF2F4" }
          }
        >
          {/* style={{ backgroundColor: "#EDF2F4" }}> */}
          <p className={clickSubRequire == index ? "m-0 text-white" : "m-0"}>
            {data.reqCat.parentCategoryEn} : {data.reqCat.childCategoryEn}
          </p>
        </div>
      );
    });

    const tmpRequireDetail = data.require[0].detail;
    const tmpRequireTag = `${data.require[0].reqCat.parentCategoryEn} : ${data.require[0].reqCat.childCategoryEn}`;

    return (
      <Background>
        <div>
          {photoPost}
          {requestTrade}
          <Navbar image={localStorage.getItem("uimg")} />
          <Block
            height="auto"
            backgroundColor="#f7fafc"
            darkBackgroundColor="#1c1c1f"
          >
            {/* <div className="py-3 px-5 my-3 bg-white"> */}
            <Div
              dynamicPair={["#ffffff", "#212121"]}
              className={mobile ? "py-2 px-2 my-3" : "py-3 px-5 my-3"}
            >
              <div className="row mx-auto" style={{ width: "100%" }}>
                <div className="col-lg py-3">
                  <div className="mb-3 full-width" style={{ height: "auto" }}>
                    <div
                      style={{
                        aspectRatio: "6/4",
                        height: "auto",
                        backgroundColor: "#F1F1F1",
                        padding: "0",
                        ...backgroundImageStyles,
                        backgroundImage: `url(${data.pictures[0]})`,
                      }}
                      onClick={() => clickPhoto(0)}
                    ></div>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-around"
                    style={{
                      width: "auto",
                      height: "120px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {data.pictures.map((data: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="pointer"
                          style={{
                            aspectRatio: "6/4",
                            height: "auto",
                            backgroundColor: "#F1F1F1",
                            padding: "0",
                            ...backgroundImageStyles,
                            backgroundImage: `url(${data})`,
                            minHeight: "100%",
                          }}
                          onClick={() => clickPhoto(index)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <Div className="col-lg" style={{ width: "100%" }}>
                  <H4 className="m-0">{data.name}</H4>
                  <div className="d-flex">
                    <div style={{ marginBlock: "2px" }}>
                      <BsStarFill
                        style={{ color: theme === "light" ? "black" : "white" }}
                      />
                    </div>
                    <P className="m-0 mx-2">{handleFavorite}</P>
                    <P className="m-0">Favorites</P>
                  </div>
                  <div>
                    <P className="m-0 text-mute">วันที่ลง : {dateOfProduct}</P>
                  </div>
                  <div className="d-flex mt-3 border border-secondary rounded-3">
                    <p
                      className="m-0 rounded-left px-4 fw-bold p-1 d-flex justify-content-center align-items-center"
                      style={{ color: "white", backgroundColor: "#F66464" }}
                    >
                      Category
                    </p>
                    <div
                      className="d-inline-block bagde bagde-sm rounded-pill px-2 m-1 py-1"
                      style={{ backgroundColor: "#1c64eb" }}
                    >
                      <p className="m-0 text-white px-3">
                        {data.category.parentCategoryEn} :{" "}
                        {data.category.childCategoryEn}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-2 px-3 py-1 border border-secondary rounded-3"
                    style={{ height: "190px", overflow: "auto" }}
                  >
                    <P className="mb-1 fw-bold">Detail</P>
                    <hr className="my-2" />
                    <P className="m-0">{data.detail}</P>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-around mt-3"
                    style={{
                      backgroundColor:
                        theme === "light" ? "#F1F1F170" : "#171717",
                      padding: "10px 0",
                      borderRadius: "7px",
                      boxShadow: "0 0 8px rgba(10,10,10,0.1)",
                    }}
                  >
                    <div className="d-flex">
                      <div
                        className="me-3"
                        style={{
                          minWidth: "47px",
                          minHeight: "47px",
                          maxWidth: "47px",
                          maxHeight: "47px",
                          backgroundImage: `url(${
                            anotherUserData ? anotherUserData.profilePic : ""
                          })`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          borderRadius: "50%",
                          backgroundPosition: "center",
                        }}
                      />
                      <div
                        className="d-flex align-items-center"
                        onClick={() => {
                          if (myAccout._id == data.owner) {
                            history.push("/app/aboutaccount?component=account");
                          } else {
                            history.push(
                              `/app/profileviewer?user_id=${data.owner}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <P className="m-0 p-0 d-flex flex-wrap align-items-center">
                          <P
                            className="me-3"
                            style={{ fontSize: "25px", fontWeight: 500 }}
                          >
                            {data.username}
                          </P>
                          <P style={{ color: "#9e9e9e", fontSize: "18px" }}>
                            {(handleFollow ? handleFollow : "") + " Followers"}
                          </P>
                        </P>
                      </div>
                    </div>

                    {waiting ? (
                      <div className={forOwner ? "d-none" : "d-flex flex-wrap"}>
                        <TransparentButton
                          width="80px"
                          height="30px"
                          buttonColor="blue"
                          padding="0"
                          margin="10px 5px"
                          onClick={handleClickChat}
                        >
                          Chat
                        </TransparentButton>
                        <div onClick={handleClickFollow}>{follow_btn()}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className={
                      forOwner
                        ? "d-none"
                        : "d-flex flew-wrap justify-content-between mt-3"
                    }
                    style={{ height: "50px" }}
                  >
                    {/* <div className="" onClick={handleClickFavorite} style={{ width: "48%" }}>{favorite_btn()}</div>
                                        <SolidButton onClick={clickRequest} fontSize="24px" buttonColor="#15C777" padding="5px" margin="0" style={{ boxShadow: "0 0 8px rgba(10,10,10,0.1)", width: "48%" }}>
                                            Trade
                                        </SolidButton> */}
                    {inventory != null ? (
                      <>
                        <div
                          className=""
                          onClick={handleClickFavorite}
                          style={{ width: "48%" }}
                        >
                          {favorite_btn()}
                        </div>
                        <SolidButton
                          onClick={clickRequest}
                          fontSize="24px"
                          buttonColor="#15C777"
                          padding="5px"
                          margin="0"
                          style={{
                            boxShadow: "0 0 8px rgba(10,10,10,0.1)",
                            width: "48%",
                          }}
                        >
                          Trade
                        </SolidButton>
                      </>
                    ) : (
                      <div className="loader"></div>
                    )}
                  </div>
                </Div>
              </div>

              <div>
                <div className="d-flex mt-3 border border-secondary rounded-3">
                  <p
                    className="m-0 rounded-left px-4 fw-bold p-1 d-flex justify-content-center align-items-center"
                    style={{ color: "white", backgroundColor: "#64B9F6" }}
                  >
                    Require
                  </p>
                  <div className="d-flex">{wantCate}</div>
                </div>
                <div
                  className="mt-3 px-3 pb-4 border border-secondary rounded-3"
                  style={{ minHeight: "250px" }}
                >
                  <P className="my-1 fw-bold fs-3">Details</P>
                  <hr className="my-2" />
                  {SubRequire}
                  <P className={tmpRequireDetailShow}>{tmpRequireTag}</P>
                  <P className="m-0">{requireDetail}</P>
                  <P className={tmpRequireDetailShow}>{tmpRequireDetail}</P>
                </div>
              </div>
            </Div>
          </Block>
          <Footer />
        </div>
      </Background>
    );
  } else {
    show();
    return <></>;
  }
}

export default Product;
