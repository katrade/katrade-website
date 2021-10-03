import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { useHistory } from "react-router";
import useAuthorization from '../hooks/useAuthorization';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import ProductPost from '../components/ProductPost';
import SelectTrade from '../components/SelectTrade';

import { BsStarFill } from "react-icons/bs";
import { SolidButton, TransparentButton } from '../components/standard/Button';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { FcLike, CgArrowsExchangeAlt } from 'react-icons/all';

const queryString = require("query-string");

const backgroundImageStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
}





function Product() {
    const { search } = useLocation();
    const { product_id } = queryString.parse(search);

    const { getMyInventory,
        getDetailProduct,
        getUserData,
        postMyReqeust,
        addFavourite,
        deleteFavourite,
        onFollow,
        unFollow,
        getFollowCheck, } = useAuthorization();
    const [data, setData] = useState<any>(null);
    const [owner, setOwner] = useState<any>(null);
    const [inventory, setInventory] = useState<any>();
    const [mobile, setMobile] = useState(false);
    const [followChk , setFollowChk] = useState<boolean>();

    const history = useHistory();

    

    // var checkFavorite:any = owner.favourite.includes(data._id);
    useEffect(() => {
        resize();
        async function init() {
            var dataDetail = await getDetailProduct(product_id);
            if (dataDetail) {
                setData(dataDetail);
                var getFollowChk = await getFollowCheck(dataDetail.owner);
                if (getFollowChk) {
                    setFollowChk(getFollowChk.value);
                    console.log(getFollowChk)
                }
            }
            
            var getUser: any = await getUserData();
            if (getUser) {
                setOwner(getUser);
            }
            var getInventory = await getMyInventory();
            if (getInventory) {
                setInventory(getInventory);
            }
        }
        init();
    }, [])

    const [checkFavoritetmp, setCheckFavoritetmp] = useState<boolean>();
    useEffect(() => {
        if (owner != null && data != null) {
            setCheckFavoritetmp(owner.favourite.includes(data._id))
        }
    }, [data, owner])

    var forOwner = 0;
    if (data && owner) {
        if (data.owner == owner._id) {
            forOwner = 1;
        }
    }

    window.addEventListener("resize", resize);
    function resize() {
        if (window.innerWidth < 600) {
            setMobile(true)
        } else {
            setMobile(false)
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
        photoPost = <ProductPost onBgClick={closePhoto} photoLink={data.pictures[posiitonPhoto]} />
    }

    const [selectTrade, setSelectTrade] = useState<any>(null);
    function clickRequest() {
        if (owner.inventories.length == 0) {
            window.alert("คุณยังไม่มีสิ่งของเลย ไปเพิ่มก่อนสิ")
        } else {
            setSelectTrade("Click")
        }
    }
    function closeRequest() {
        setSelectTrade(null)
    }
    let requestTrade = null;
    if (!!selectTrade) {
        requestTrade = <SelectTrade onClose={closeRequest} array={inventory} detailItem={data} />
    }

    const [requireDetail, SetRequireDetail] = useState<any>();
    const [tmpRequireDetailShow, setTmpRequireDetailShow] = useState<any>("m-0");
    function changeRequireDetail(index: any) {
        SetRequireDetail(data.require[index].detail);
        setTmpRequireDetailShow("d-none")
    }

    // Listening for Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closePhoto();
        }
    });
    // const [ favorite , setFavorite] = useState(true);
    const handleClickFavorite = () => setCheckFavoritetmp(!checkFavoritetmp);
    function favorite_btn() {
        if (!checkFavoritetmp) {
            return (
                <SolidButton onClick={() => addFavourite(data._id)} className="px-3 d-flex justify-content-center align-items-center" width="50px" height="50px" fontSize="24px" buttonColor="transparent" margin="0" style={{ boxShadow: "0 0 8px rgba(10,10,10,0.1)", color: "#ed2b3e", border: "1px solid #ed2b3e" }}>
                    <FcLike />
                </SolidButton>
            );
        } else {
            return (
                <SolidButton onClick={() => deleteFavourite(data._id, checkpath)} className="px-3 d-flex justify-content-center align-items-center" width="50px" height="50px" fontSize="24px" buttonColor="transparent" margin="0" style={{ boxShadow: "0 0 8px rgba(10,10,10,0.1)", backgroundColor: "#ed2b3e", border: "1px solid #ed2b3e", color: "#fff" }}>
                    <FcLike style={{ filter: "brightness(10)" }} />
                </SolidButton>
            );
        }
    }



    const handleClickFollow = () => setFollowChk(!followChk);
    function follow_btn() {
        if(!followChk){
            return (
                <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0" onClick={() => onFollow(data.owner)}>
                    Follow
                </TransparentButton>
            );
        }else{
            return (
                <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0" onClick={() => unFollow(data.owner)}>
                    unFollow
                </TransparentButton>
            );
        }
    }
    if (!data) {
        <div style={{ width: "100vw", height: "100vh", }}>
            <h5>ROR pap</h5>
        </div>
    }

    if (data && owner) {
        var checkpath = window.location.pathname;

        const wantCate = data.require.map((data: any, index: any) => {
            return (
                <div key={index}
                    onClick={() => changeRequireDetail(index)}
                    className="bagde bagde-sm rounded-pill px-2 m-1 py-1"
                    style={{ backgroundColor: "#EDF2F4" }}>
                    <p className="m-0">{data.reqCat.parentCategoryEn} : {data.reqCat.childCategoryEn}</p>
                </div>
            );
        })
        const tmpRequireDetail = data.require[0].detail;
        // console.log(data.pictures)
        return (
            <div>
                {photoPost}
                {requestTrade}
                <Navbar image={owner.profilePic} />
                <Block height="auto" backgroundColor="#f7fafc">
                    {/* <div className="py-3 px-5 my-3 bg-white"> */}
                    <div className={mobile ? "py-2 px-2 my-3 bg-white" : "py-3 px-5 my-3 bg-white"}>


                        <div className="row mx-auto" style={{ width: "100%" }}>
                            <div className="col-lg py-3">
                                <div className="mb-3 full-width" style={{ height: "auto" }}>
                                    <div style={{ aspectRatio: "6/4", height: "auto", backgroundColor: "#F1F1F1", padding: "0", ...backgroundImageStyles, backgroundImage: `url(${data.pictures[0]})` }} onClick={() => clickPhoto(0)}>
                                        {/* <img className="my-auto" src={data.pictures[0]} style={{ width: "100%", height: "100%", cursor: "zoom-in" }}  /> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-around" style={{ width: "auto", height: "120px", backgroundColor: "#F1F1F1" }}>
                                    {data.pictures.map((data: any, index: any) => {

                                        // console.log(data);
                                        return (
                                            <div key={index} className="pointer" style={{ aspectRatio: "6/4", height: "auto", backgroundColor: "#F1F1F1", padding: "0", ...backgroundImageStyles, backgroundImage: `url(${data})`, minHeight: "100%"}} onClick={() => clickPhoto(index)}>
                                                {/* <img className="my-auto" src={data.pictures[0]} style={{ width: "100%", height: "100%", cursor: "zoom-in" }}  /> */}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>

                            <div className="col-lg" style={{ width: "100%" }}>
                                <h4 className="m-0">{data.name}</h4>
                                <div className="d-flex align-items-center">
                                    <BsStarFill />
                                    <p className="m-0 mx-2">0</p>
                                    <p className="m-0">Favorites</p>
                                </div>
                                <div className="d-flex mt-3 border border-secondary rounded-3">
                                    <p className="m-0 rounded-left px-4 fw-bold p-1 d-flex justify-content-center align-items-center" style={{ color: "white", backgroundColor: "#F66464" }}>Category</p>
                                    <div className="d-inline-block bagde bagde-sm rounded-pill px-2 m-1 py-1" style={{ backgroundColor: "#1c64eb", }}><p className="m-0 text-white px-3">{data.category.parentCategoryEn} : {data.category.childCategoryEn}</p></div>
                                </div>
                                <div className="mt-2 px-3 py-1 border border-secondary rounded-3" style={{ height: "150px", overflow: "auto" }}>
                                    <p className="mb-1 fw-bold" style={{ color: "black" }}>Detail</p>
                                    <p className="m-0">{data.detail}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-around mt-3" style={{ backgroundColor: "#F1F1F170", padding: "10px 0", borderRadius: "7px", boxShadow: "0 0 8px rgba(10,10,10,0.1)" }}>
                                    <div className="d-flex">
                                        <img className="rounded-circle me-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" style={{ width: "40x", height: "40px" }} />
                                        <div className="d-flex align-items-center" onClick={() => history.push(`/app/profileviewer?user_id=${data.owner}`)} style={{ cursor: "pointer" }}>
                                            <p className="m-0 p-0">
                                                <b className="me-3" style={{ color: "#000", fontSize: "25px", fontWeight: 500 }}>{data.username}</b>
                                                <span style={{ color: "#9e9e9e", fontSize: "18px" }}>N/A Followers</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={forOwner ? "d-none" : ""}>
                                        <TransparentButton className="ms-2" width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Chat</TransparentButton>
                                        {/* <TransparentButton className="ms-2" width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Follow</TransparentButton> */}
                                        <div onClick={handleClickFollow}>{follow_btn()}</div>
                                    </div>
                                </div>
                                <div className={forOwner ? "d-none" : "d-flex flew-wrap justify-content-end mt-3"}>
                                    <div className="me-3" onClick={handleClickFavorite}>{favorite_btn()}</div>
                                    <SolidButton onClick={clickRequest} className="px-3" fontSize="24px" buttonColor="limegreen" padding="5px" margin="0" style={{ boxShadow: "0 0 8px rgba(10,10,10,0.1)" }}>
                                        Trade
                                    </SolidButton>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div className="d-flex mt-3 border border-secondary rounded-3">
                                <p className="m-0 rounded-left px-4 fw-bold p-1 d-flex justify-content-center align-items-center" style={{ color: "white", backgroundColor: "#64B9F6" }}>Require</p>
                                <div className="d-flex">
                                    {wantCate}
                                </div>
                            </div>
                            <div className="mt-3 px-3 pb-4 border border-secondary rounded-3" style={{ minHeight: "250px" }}>
                                <p className="mb-1 fw-bold fs-3" style={{ color: "black" }}>Details</p>
                                <p className="m-0">{requireDetail}</p>
                                <p className={tmpRequireDetailShow}>{tmpRequireDetail}</p>
                            </div>
                        </div>
                    </div>
                </Block>
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <h4>กำลังโหลดข้อมูล</h4>
            </div>
        );
    }
}

export default Product;