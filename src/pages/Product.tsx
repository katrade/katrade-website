import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import useAuthorization from '../hooks/useAuthorization';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import ProductPost from '../components/ProductPost';

import { BsStarFill } from "react-icons/bs";
import { SolidButton, TransparentButton } from '../components/standard/Button';

function Product() {
    const { search } = useLocation();
    const { product_id , owner } = queryString.parse(search);
    const { getDetailProduct } = useAuthorization();    
    const [ data , setData] = useState<any>();
    const [ ownerTag , setOwnerTag ] = useState<any>();

    useEffect(() => {
        async function init() {
            var inventory = await getDetailProduct(product_id , owner);
            if (inventory) {
                setData(inventory);
                setOwnerTag(owner);
            }
        }
        init();
    }, [])

    const photoLink = {
        namePhoto: "Katom ทรงพลัง",
        link: ["https://www.aljazeera.com/wp-content/uploads/2021/08/2021-08-27T152656Z_298019127_RC2KMA70M1Q8_RTRMADP_3_SOCCER-ENGLAND-MUN-RONALDO.jpg?resize=1200%2C630",
            "https://static.posttoday.com/media/content/2017/07/28/812D33C6776043039F06467A946D474B.jpg",
        ],
    }

    const [selectPhoto, setSelectPhoto] = useState(null);

    function clickPhoto(photoLink: any) {
        setSelectPhoto(photoLink);
    }

    function closePhoto() {
        setSelectPhoto(null);
    }

    let photoPost = null;
    if (!!selectPhoto) {
        photoPost = <ProductPost onBgClick={closePhoto} photoLink={photoLink.link} />
    }

    if(data){
        const wantCate = data.require.map((data:any) => {
            console.log(data.reqCat.childCategoryEn)
            console.log(data.reqCat.parentCategoryEn)
            return (
                <div className="d-inline bagde bagde-sm rounded-pill px-2 m-1 py-1" style={{ backgroundColor: "#EDF2F4" }}>
                    <p className="m-0">{data.reqCat.parentCategoryEn} : {data.reqCat.childCategoryEn}</p>
                </div>
            );
        })
        return (
            <div>
                {photoPost}
                <Navbar />
                <Block height="auto" backgroundColor="#f7fafc">
                    <div className="py-3 px-5 my-3 bg-white">
                        <div className="d-flex justify-content-between flex-wrap">
                            {/* <div className="bg-info" style={{width:"40%",minWidth:"250px"}}> */}
                            <div className="py-3" style={{ width: "38%" }}>
                                <div className="mb-3 d-flex justify-content-center" style={{ height: "auto" }}>
                                    <div style={{ width: "350px", height: "auto", backgroundColor: "#F1F1F1", padding: "30px 10px" }}>
                                        <img className="my-auto" src={data.pictures[0]} style={{ width: "100%", height: "170px", cursor: "zoom-in" }} onClick={() => { clickPhoto(photoLink) }} />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-center" style={{ width: "auto", height: "100px", backgroundColor: "gray" }}>
                                        <h4>พื้นที่ใส่สไลด์รูปภาพ</h4>
                                    </div>
                                </div>
                            </div>
    
                            {/* <div className="bg-white" style={{width:"60%",minWidth:"450px"}}> */}
                            <div className="bg-white" style={{ width: "60%" }}>
                                <h4 className="m-0">{data.name}</h4>
                                <div className="d-flex align-items-center">
                                    <BsStarFill />
                                    <p className="m-0 mx-2">24019</p>
                                    <p className="m-0">Favorites</p>
                                </div>
                                <div className="d-flex mt-3 border border-secondary rounded-3">
                                    <p className="m-0 rounded-left px-4 fw-bold p-1" style={{ color: "white", backgroundColor: "#F66464" }}>Require</p>
                                    {wantCate}
                                    {/* ############################### Not Responsive ########################### ทำยังไงครับได้โปรดสอนข้าพเจ้าด้วย*/}
                                </div>
                                <div className="mt-2 px-3 py-1 border border-secondary rounded-3" style={{height:"150px", overflow:"auto"}}>
                                    <p className="mb-1 fw-bold" style={{ color: "black" }}>Requirement Detail</p>
                                    <p className="m-0">{data.require[0].detail}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-around mt-3" style={{ backgroundColor: "#F1F1F1" }}>
                                    <img className="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" style={{ width: "70px", height: "70px" }} />
                                    <div>
                                        <p className="m-0 fs-3 fw-bold" style={{ color: "black" }}>Franky</p>
                                        <p className="m-0" style={{ color: "black" }}>2 Follow</p>
                                    </div>
                                    <div className={ ownerTag == "yes" ? "d-none" : ""}>
                                        <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Chat</TransparentButton>
                                        <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Follow</TransparentButton>
                                    </div>
                                </div>
                                <div className={ ownerTag == "yes" ? "d-none" : "d-flex flew-wrap justify-content-around mt-3"}>
                                    <SolidButton width="132px" fontSize="24px" buttonColor="red" padding="5px" margin="0">
                                        Add to Favorite
                                    </SolidButton>
                                    <SolidButton width="132px" fontSize="24px" buttonColor="limegreen" padding="5px" margin="0">Request Trading</SolidButton>
                                </div>
                            </div>
                        </div>
    
                        <div className="">
                            <div className="d-flex mt-3 border border-secondary rounded-3">
                                <p className="m-0 rounded-left px-4 fw-bold p-1" style={{ color: "white", backgroundColor: "#64B9F6" }}>Category</p>
                                <div className="d-inline-block bagde bagde-sm rounded-pill px-2 m-1 py-1" style={{ backgroundColor: "#EDF2F4" }}><p className="m-0">{data.category.parentCategoryEn} : {data.category.childCategoryEn}</p></div>
                                {/* ############################### Not Responsive ############################### */}
                            </div>
                            <div className="mt-3 px-3 pb-4 border border-secondary rounded-3" style={{minHeight:"250px"}}>
                                <p className="mb-1 fw-bold fs-3" style={{ color: "black" }}>Details</p>
                                <p className="m-0">{data.detail}</p>
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