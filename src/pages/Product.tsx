import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import useAuthorization from '../hooks/useAuthorization';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import ProductPost from '../components/ProductPost';
import SelectTrade from '../components/SelectTrade';

import { BsStarFill } from "react-icons/bs";
import { SolidButton, TransparentButton } from '../components/standard/Button';
import { AiOutlineConsoleSql } from 'react-icons/ai';

function Product() {
    const { search } = useLocation();
    const { product_id } = queryString.parse(search);

    const { getMyInventory , getDetailProduct , getUserData , postMyReqeust , addFavourite , deleteFavourite } = useAuthorization();    
    const [ data , setData] = useState<any>(null);
    const [ owner , setOwner ] = useState<any>(null);
    const [ inventory , setInventory ] = useState<any>();
    const [ mobile , setMobile ] = useState(false);

    // var checkFavorite:any = owner.favourite.includes(data._id);
    useEffect(() => {
        resize();
        async function init() {
            var dataDetail = await getDetailProduct(product_id);
            if (dataDetail) {
                setData(dataDetail);
            }
            var getUser:any = await getUserData();
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

    const [ checkFavoritetmp , setCheckFavoritetmp ] = useState<boolean>();
    useEffect(() => {
        if(owner != null && data != null){
            setCheckFavoritetmp(owner.favourite.includes(data._id))
        }
    } , [data,owner])

    var forOwner = 0;
    if (data && owner) {
        if (data.owner == owner._id) {
            forOwner = 1;
        }
    }

    window.addEventListener("resize", resize);
    function resize(){
        if(window.innerWidth < 600){
            setMobile(true)
        }else{
            setMobile(false)
        }
    }

    const [ selectPhoto , setSelectPhoto ] = useState<any>(null);
    const [ posiitonPhoto , setPositionPhoto ] = useState<any>(null);
    function clickPhoto(position:any) {
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

    const [ selectTrade , setSelectTrade ] = useState<any>(null);
    function clickRequest() {
        if(owner.inventories.length == 0){
            window.alert("คุณยังไม่มีสิ่งของเลย ไปเพิ่มก่อนสิ")
        }else{
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


    const [ requireDetail , SetRequireDetail ] = useState<any>();
    const [ tmpRequireDetailShow , setTmpRequireDetailShow ] = useState<any>("m-0");
    function changeRequireDetail(index:any) {
        SetRequireDetail(data.require[index].detail);
        setTmpRequireDetailShow("d-none")
    }

    function handleRequest(){
        const dataArray = {
            userId2: data.owner ,
            inventoryId1: data._id ,
            inventoryId2: "owner._iditem" ,
        }
        postMyReqeust(dataArray);
    }

    // const [ favorite , setFavorite] = useState(true);
    const handleClickFavorite = () => setCheckFavoritetmp(!checkFavoritetmp);
    function favorite_btn() {
        if(!checkFavoritetmp){
            return (
                <SolidButton onClick={() => addFavourite(data._id)} width="132px" fontSize="24px" buttonColor="red" padding="5px" margin="0">
                    Add to Favorite
                </SolidButton>
            );
        }else{
            return (
                <SolidButton onClick={() => deleteFavourite(data._id , checkpath)} width="132px" fontSize="24px" buttonColor="orange" padding="5px" margin="0">
                    Remove from Favorite
                </SolidButton>
            );
        }
    }

    if(data && owner){
        // console.log(data._id , owner.favourite)
        // console.log(owner.favourite.includes(data._id))
        var checkFavorite:any = owner.favourite.includes(data._id);
        var checkpath = window.location.pathname;

        const wantCate = data.require.map((data:any , index:any) => {
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



        return (
            <div>
                {photoPost}
                {requestTrade}
                <Navbar />
                <Block height="auto" backgroundColor="#f7fafc">
                    {/* <div className="py-3 px-5 my-3 bg-white"> */}
                    <div className={mobile ? "py-2 px-2 my-3 bg-white" : "py-3 px-5 my-3 bg-white"}>


                        <div className="row mx-auto" style={{width:"100%"}}>
                            <div className="col-lg py-3">
                                <div className="mb-3 d-flex justify-content-center" style={{ height: "auto" }}>
                                    <div style={{ width: "350px", height: "auto", backgroundColor: "#F1F1F1", padding: "30px 10px" }}>
                                        <img className="my-auto" src={data.pictures[0]} style={{ width: "100%", height: "170px", cursor: "zoom-in" }} onClick={() => clickPhoto(0)} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-around" style={{ width: "auto", height: "120px", backgroundColor: "gray" }}>
                                    { data.pictures.map((data:any , index:any) => (
                                        <div key={index}>
                                            <img className="my-auto" src={data} style={{ width: "100px", height: "100px", cursor: "zoom-in" }} onClick={() => clickPhoto(index)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
    
                            <div className="col-lg" style={{width:"100%"}}>
                                <h4 className="m-0">{data.name}</h4>
                                <div className="d-flex align-items-center">
                                    <BsStarFill />
                                    <p className="m-0 mx-2">0</p>
                                    <p className="m-0">Favorites</p>
                                </div>
                                <div className="d-flex mt-3 border border-secondary rounded-3">
                                    <p className="m-0 rounded-left px-4 fw-bold p-1" style={{ color: "white", backgroundColor: "#F66464" }}>Category</p>
                                    <div className="d-inline-block bagde bagde-sm rounded-pill px-2 m-1 py-1" style={{ backgroundColor: "#EDF2F4" }}><p className="m-0">{data.category.parentCategoryEn} : {data.category.childCategoryEn}</p></div>
                                </div>
                                <div className="mt-2 px-3 py-1 border border-secondary rounded-3" style={{height:"150px", overflow:"auto"}}>
                                    <p className="mb-1 fw-bold" style={{ color: "black" }}>Requirement Detail</p>
                                    <p className="m-0">{data.detail} lo</p>
                                </div>
                                <div className="d-flex align-s-center justify-content-around mt-3" style={{ backgroundColor: "#F1F1F1" }}>
                                    <img className="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" style={{ width: "70px", height: "70px" }} />
                                    <div>
                                        <p className="m-0 fs-3 fw-bold" style={{ color: "black" }}>{data.username}</p>
                                        <p className="m-0" style={{ color: "black" }}>2 Follow</p>
                                    </div>
                                    <div className={ forOwner ? "d-none" : ""}>
                                        <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Chat</TransparentButton>
                                        <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Follow</TransparentButton>
                                    </div>
                                </div>
                                <div className={ forOwner ? "d-none" : "d-flex flew-wrap justify-content-around mt-3"}>
                                    {/* <SolidButton className={checkFavorite? "d-none" : ""} onClick={() => addFavourite(data._id)} width="132px" fontSize="24px" buttonColor="red" padding="5px" margin="0">
                                        Add to Favorite
                                    </SolidButton>
                                    <SolidButton className={checkFavorite? "" : "d-none"} onClick={() => deleteFavourite(data._id , checkpath)} width="132px" fontSize="24px" buttonColor="orange" padding="5px" margin="0">
                                        Reomve to Favorite
                                    </SolidButton> */}
                                    <div onClick={handleClickFavorite}>{favorite_btn()}</div>
                                    <SolidButton onClick={clickRequest} width="132px" fontSize="24px" buttonColor="limegreen" padding="5px" margin="0">
                                        Request Trading
                                    </SolidButton>
                                </div>
                            </div>
                        </div>
    
                        <div className="">
                            <div className="d-flex mt-3 border border-secondary rounded-3">
                                <p className="m-0 rounded-left px-4 fw-bold p-1" style={{ color: "white", backgroundColor: "#64B9F6" }}>Require</p>
                                <div className="d-flex">
                                {wantCate}
                                </div>
                            </div>
                            <div className="mt-3 px-3 pb-4 border border-secondary rounded-3" style={{minHeight:"250px"}}>
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
    }else{
        return(
            <div>
                <h4>กำลังโหลดข้อมูล</h4>
            </div>
        );
    }    
}

export default Product;