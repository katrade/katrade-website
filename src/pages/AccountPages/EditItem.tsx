import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '../../utils/useForm';
import Select from 'react-select';
import useAuthorization from '../../hooks/useAuthorization';

import Block from '../../components/Block';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadImg from '../../components/Account/UploadImg';
import { SolidButton } from '../../components/standard/Button'
import useLoading from '../../hooks/useLoading';
import { IAccount, defaultEmptyAccount } from '../../interfaces/IUser';
import { ContactSupportOutlined, LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useLocation } from 'react-router-dom'
import { IndexKind } from 'typescript';
const queryString = require("query-string");


interface IProductDetail {
    category: ICategory
    detail: string
    name: string
    owner: string
    pictures: string[]
    require: IRequire
    username: string
    _id: string

}

interface ICategory {
    childCategoryEn: string
    childCategoryTh: string
    parentCategoryEn: string
    parentCategoryTh: string
}

interface IRequire {
    detail: string
    reqCat: IReqCat
    _id: string
}

interface IReqCat {
    childCategoryEn: string
    childCategoryTh: string
    parentCategoryEn: string
    parentCategoryTh: string
}

const defaultEmptyProductDetail: IProductDetail = {
    category: {
        childCategoryEn: "",
        childCategoryTh: "",
        parentCategoryEn: "",
        parentCategoryTh: "",
    },
    detail: "",
    name: "",
    owner: "",
    pictures: [],
    require: {
        detail: "",
        reqCat: {
            childCategoryEn: "",
            childCategoryTh: "",
            parentCategoryEn: "",
            parentCategoryTh: "",
        },
        _id: ""
    },
    username: "",
    _id: "",
}
export default function EditItem() {

    const [category, setCategory] = useState<any>();
    const { getCategory, addItem, getDetailProduct } = useAuthorization();
    const [productDetail, setProductDetail] = useState<IProductDetail>(defaultEmptyProductDetail);
    const { search } = useLocation();
    const { product_id } = queryString.parse(search);
    const [show, hide] = useLoading();

    useEffect(() => {
        async function init() {
            show("Loading");
            var CategoryData = await getCategory();
            if (CategoryData) {
                setCategory(CategoryData);
                hide();
            }

            if (window.location.pathname.split("/")[2] === "edititem") {
                var productData = await getDetailProduct(product_id);

                if (productData) {
                    setDataName(productData.name)
                    setProductDetail(productData);
                    setCover(productData.pictures[0]);
                    setDataCover(productData.pictures[0]);
                    if (productData.pictures[1]) {
                        setPicture1(productData.pictures[1])
                        setDataPicture1(productData.pictures[1])
                    }
                    setFinalMyMainCate(productData.category.parentCategoryEn)
                    setFinalMySubCate(productData.category.childCategoryEn)
                    setFinalMyMainCateTh(productData.category.parentCategoryTh)
                    setFinalMyMSubCateTh(productData.category.childCategoryTh)
                    SetWantInputFields(productData.require)

                    hide();
                }
            }
        }
        init();
    }, []);

    // ยังไม่พร้อมใช้งานในโหมดภาษาไทย ขี้เกียจงับ
    // ยังไม่พร้อมใช้งานในโหมดภาษาไทย ขี้เกียจงับ
    // ยังไม่พร้อมใช้งานในโหมดภาษาไทย ขี้เกียจงับ

    var MainCategoriesEn: any;
    var MainCategoriesTh: any;
    var SubCategoriesEn: any = [];
    var SubCategoriesTh: any = [];
    var MainCateLangTh: any = [];
    var SubCateLangTh: any = [];
    SubCategoriesEn.push([{ value: 'Please select a main category', label: 'Please select a main category' },]);
    SubCategoriesTh.push([{ value: 'กรุณาเลือกหมวดหมู่หลักก่อน', label: 'กรุณาเลือกหมวดหมู่หลักก่อน' },]);

    if (category) {
        MainCategoriesEn = category.map((data: any, index: any) => {
            var cCatEn = data.childCategoryEn
            SubCategoriesEn.push(cCatEn.map((data: any, index: any) => {
                return { value: data, 'label': data, indexC: index }
            }))
            var cCatTh = data.childCategoryTh
            SubCategoriesTh.push(cCatTh.map((data: any, index: any) => {
                return { value: data, 'label': data, indexC: index }
            }))
            var pCatEn = data.parentCategoryEn
            return { value: pCatEn, 'label': pCatEn, indexC: index }
        });

        MainCategoriesTh = category.map((data: any, index: any) => {
            var pCatTh = data.childCategoryTh
            var pCatEn = data.parentCategoryEn
            MainCateLangTh.push(data.parentCategoryTh);
            return { value: pCatEn, 'label': pCatTh, indexC: index }
        });

        SubCateLangTh.push(category.map((data: any, index: any) => {
            var tmp: any = [];
            (data.childCategoryTh.map((subdata: any, index: any) => {
                tmp.push(subdata);
            }));
            return tmp;
        }))
    }

    // ------------------------------------------------------------------

    const [finalMyMainCate, setFinalMyMainCate] = useState();
    const [finalMySubCate, setFinalMySubCate] = useState();
    const [finalMyMainCateTh, setFinalMyMainCateTh] = useState();
    const [finalMySubCateTh, setFinalMyMSubCateTh] = useState();
    // ------------------------เพิ่มมา----------
    const [MainCat, setMainCat] = useState<any>({
        Mvalue: "",
        MindexC: -1
    });
    const [SubCat, setSubCat] = useState<any>({
        Svalue: "",
        SindexC: -1
    });
    //  const [IndexMainCat, setIndexMainCat] = useState<any>(null)
    //  const [IndexSubCat, setIndexSubCat] = useState<any>(null)
    useEffect(() => {

        show();
        if (productDetail._id && MainCategoriesEn && SubCategoriesEn) {
            const main = MainCategoriesEn.filter((e: any) => e.value === productDetail.category.parentCategoryEn)
            setMainCat({ ...MainCat, Mvalue: productDetail.category.parentCategoryEn, MindexC: main[0].indexC });
            hide();

        }

    }, [productDetail])



    // ------------------------เพิ่มมา----------

    var mySubCateTag = "unSelect";
    var mySubCateIndex = -1;

    function findMySubCate() {
        if (productDetail._id) {
            const main = MainCategoriesEn.filter((e: any) => e.value === productDetail.category.parentCategoryEn)
            mySubCateIndex = main[0].indexC
            mySubCateTag = main[0].value
            var godhelpme = SubCategoriesEn[mySubCateIndex + 1];
            var placeholderString = `กรุณาเลือก Category ย่อย ของ ${mySubCateTag}`;
            if (mySubCateIndex == -1) {
                return <Select options={godhelpme} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category หลักก่อน" />;
            } else {
                return <Select options={godhelpme} className="fs-5" name="mySubCate" onChange={(sel: any) => { selectMySubTh(sel) }} placeholder={placeholderString} defaultValue={{ value: productDetail.category.childCategoryEn, label: `${productDetail.category.childCategoryEn}` }} />;
            }
        }
    }

    function subcate() {
        mySubCateIndex = MainCat.MindexC
        return (
            <Select options={SubCategoriesEn[mySubCateIndex + 1]} className="fs-5" name="mySubCate"
                onChange={(sel: any) => { selectMySubTh(sel) }}
                placeholder={`${productDetail.category.childCategoryEn}`}
                defaultValue={{ value: productDetail.category.childCategoryEn, label: `${productDetail.category.childCategoryEn}` }} />);
    }

    function selectMySub(selectMySubCate: any) {
        mySubCateTag = selectMySubCate.value;
        mySubCateIndex = selectMySubCate.indexC;
        setFinalMyMainCate(selectMySubCate.value);
        setFinalMyMainCateTh(MainCateLangTh[mySubCateIndex]);
        setProductDetail({ ...productDetail, category: { ...productDetail.category, parentCategoryEn: mySubCateTag } })
    }
    function selectMySubTh(event: any) {
        setFinalMySubCate(event.value)
        setFinalMyMSubCateTh(SubCateLangTh[0][mySubCateIndex][event.indexC])
        setProductDetail({ ...productDetail, category: { ...productDetail.category, childCategoryEn: event.value } })
    }
    const [myItemSubCate, setMyItemSubCate] = useState<any>();

    // ------------------------------------------------------------------

    const [loading, setLoading] = useState<boolean>(true);
    const [MainCatReq0, setMainCatreq0] = useState<any>(null)
    const [countRequire, setCountRequire] = useState<any>(1);
    const [countWantCate, setCountWantCate] = useState<any>(1);
    const [wantInputFields, SetWantInputFields] = useState<any>([
        {
            reqCat: {
                parentCategoryEn: "",
                parentCategoryTh: "",
                childCategoryEn: "",
                childCategoryTh: ""
            },
            detail: ""
        },
    ]);
    useEffect(() => {
        if (productDetail._id && MainCategoriesEn && SubCategoriesEn && (wantInputFields)) {

            const ind = []
            const value = [...wantInputFields]

            for (let index = 0; index < wantInputFields.length; index++) {

                const mainreq = MainCategoriesEn.filter((e: any) => e.value === value[index]["reqCat"]["parentCategoryEn"]);
                ind.push(mainreq[0])

            }
            setCountRequire(wantInputFields.length)
            setCountWantCate(wantInputFields.length)
            setMainCatreq0(ind)
            setLoading(false)



        }
    }, [wantInputFields])


    const handleChangeDynamic = (index: any, event: any) => {
        const values = [...wantInputFields];
        values[index][event.target.name] = event.target.value;
        SetWantInputFields(values);
    }


    const handleAddItem = () => {
        setCountRequire(countRequire + 1);
        setMainCatreq0([...MainCatReq0, { value: "", label: "", indexC: -1 }])
        SetWantInputFields([...wantInputFields, {
            reqCat: {
                parentCategoryEn: "",
                parentCategoryTh: "",
                childCategoryEn: "",
                childCategoryTh: ""
            },
            detail: ""
        }])

    }

    const handleRemoveItem = (index: any) => {
        if (countRequire == 1) {
            return 0;
        }
        setCountRequire(countRequire - 1);
        const values = [...wantInputFields];
        values.splice(index, 1);
        SetWantInputFields(values);
    }

    var wantSubCateTag = "unSelect";
    var wantSubCateIndex = 0;
    // const [ arrayOfWantSubIndex, setArrayOfWantSubIndex ] = useState<any>([0, 0, 0, 0, 0]);
    const [godHelpMe0, setGodHelpMe0] = useState<any>(<Select options={SubCategoriesEn[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />);
    const [godHelpMe1, setGodHelpMe1] = useState<any>(<Select options={SubCategoriesEn[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />);
    const [godHelpMe2, setGodHelpMe2] = useState<any>(<Select options={SubCategoriesEn[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />);
    const [godHelpMe3, setGodHelpMe3] = useState<any>(<Select options={SubCategoriesEn[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />);
    const [godHelpMe4, setGodHelpMe4] = useState<any>(<Select options={SubCategoriesEn[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />);

    function changesub(index: any) {

        wantSubCateIndex = MainCatReq0[index].indexC
        wantSubCateTag = MainCatReq0[index].value
        var placeholderString = "กรุณาเลือก Category ย่อย ของ " + wantSubCateTag;


        if (index == 0) {
            return (<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => {

                    selectedSub(index, event);
                }}
                placeholder={placeholderString}
                defaultValue={{ value: wantInputFields[index]["reqCat"]["childCategoryEn"], label: `${wantInputFields[index]["reqCat"]["childCategoryEn"]}` }} />);
        } else if (index == 1) {
            return (<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => {

                    selectedSub(index, event);
                }}
                placeholder={placeholderString}
                defaultValue={{ value: wantInputFields[index]["reqCat"]["childCategoryEn"], label: `${wantInputFields[index]["reqCat"]["childCategoryEn"]}` }} />);
        } else if (index == 2) {
            return (<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => {

                    selectedSub(index, event);
                }}
                placeholder={placeholderString}
                defaultValue={{ value: wantInputFields[index]["reqCat"]["childCategoryEn"], label: `${wantInputFields[index]["reqCat"]["childCategoryEn"]}` }} />);
        } else if (index == 3) {
            return (<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => {

                    selectedSub(index, event);
                }}
                placeholder={placeholderString}
                defaultValue={{ value: wantInputFields[index]["reqCat"]["childCategoryEn"], label: `${wantInputFields[index]["reqCat"]["childCategoryEn"]}` }} />);
        } else if (index == 4) {
            return (<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => {

                    selectedSub(index, event);
                }}
                placeholder={placeholderString}
                defaultValue={{ value: wantInputFields[index]["reqCat"]["childCategoryEn"], label: `${wantInputFields[index]["reqCat"]["childCategoryEn"]}` }} />);
        }



    }

    function selectWantSub(index: any, event: any) {
        const values = [...wantInputFields];
        values[index]["reqCat"]["parentCategoryEn"] = event.value;
        SetWantInputFields(values);
        wantSubCateTag = event.value;
        wantSubCateIndex = event.indexC;
        const val = [...MainCatReq0]
        val[index]["indexC"] = wantSubCateIndex
        val[index]["value"] = wantSubCateTag
        // var tmp = arrayOfWantSubIndex;
        // tmp[index] = wantSubCateIndex;
        // setArrayOfWantSubIndex(tmp);

        values[index]["reqCat"]["parentCategoryTh"] = MainCateLangTh[wantSubCateIndex];


        var placeholderString = "กรุณาเลือก Category ย่อย ของ " + wantSubCateTag;
        if (index == 0) {
            setGodHelpMe0(<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => selectedSub(index, event)}
                placeholder={placeholderString} />);
        } else if (index == 1) {
            setGodHelpMe1(<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => selectedSub(index, event)}
                placeholder={placeholderString} />);
        } else if (index == 2) {
            setGodHelpMe2(<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => selectedSub(index, event)}
                placeholder={placeholderString} />);
        } else if (index == 3) {
            setGodHelpMe3(<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => selectedSub(index, event)}
                placeholder={placeholderString} />);
        } else if (index == 4) {
            setGodHelpMe4(<Select options={SubCategoriesEn[wantSubCateIndex + 1]}
                className="fs-5" name="wantSubCate" onChange={(event) => selectedSub(index, event)}
                placeholder={placeholderString} />);
        }
    }
    // console.log(arrayOfWantSubIndex)
    // console.log(MainCategoriesEn)

    function selectedSub(index: any, event: any) {
        console.log(wantSubCateIndex, event)
        const values = [...wantInputFields];
        values[index]["reqCat"]["childCategoryEn"] = event.value;
        values[index]["reqCat"]["childCategoryTh"] = SubCateLangTh[0][MainCatReq0[index].indexC][event.indexC];
        SetWantInputFields(values);

    }

    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const { getUserData } = useAuthorization();

    useEffect(() => {
        async function init() {
            const u = await getUserData();
            if (u) {
                setAccount(u);
            }
            else {
                alert("Can't get user data.");
            }
        }
        init();
    }, [])

    const coverPictureRef = useRef<HTMLInputElement>(null);
    const picture1Ref = useRef<HTMLInputElement>(null);

    const [cover, setCover] = useState("https://via.placeholder.com/120")
    const [dataCover, setDataCover] = useState<File>()
    const [picture1, setPicture1] = useState("https://via.placeholder.com/120")
    const [dataPicture1, setDataPicture1] = useState<File>()
    const handleCover = (e: any) => {
        const file = e.target.files[0];
        setDataCover(file);
        const fileURL = URL.createObjectURL(file);
        setCover(fileURL);
    }
    const handlePicture1 = (e: any) => {
        const file = e.target.files[0];
        setDataPicture1(file);
        const fileURL = URL.createObjectURL(file);
        setPicture1(fileURL);
    }

    const [dataItem, handleDataItem] = useForm();
    const [dataName, setDataName] = useState<any>();
    const nameFocus = useRef<HTMLInputElement>(null);

    function handleUnload(event: any) {
        event.preventDefault();
        var arrayOfPicture: File[] = [];

        const data = {
            name: productDetail.name,
            detail: productDetail.detail,
            category: {
                parentCategoryEn: finalMyMainCate,
                parentCategoryTh: finalMyMainCateTh,
                childCategoryEn: finalMySubCate,
                childCategoryTh: finalMySubCateTh
            },
            pictures: [],
            require: wantInputFields
        }

        var checkReqCat = true;
        var checkReqDetail = true;

        for (let i = 0; i < wantInputFields.length; i++) {
            if (!wantInputFields[i].reqCat.childCategoryEn) {
                checkReqCat = false;
            }
            if (!wantInputFields[i].detail) {
                checkReqDetail = false;
            }
        }
        // arrayOfPicture.push(dataCover)
        console.log(data, arrayOfPicture)
        console.log(finalMyMainCate, finalMySubCate)

        if (dataCover && finalMyMainCate && finalMySubCate && data.name && checkReqCat && checkReqDetail) {
            arrayOfPicture.push(dataCover)
            console.log("Edit success!")
            if (dataPicture1) {
                arrayOfPicture.push(dataPicture1)
            }
            // addItem(data, arrayOfPicture);

        }
        else if (!data.name) {
            nameFocus.current?.focus();
            alert("กรุณาเพิ่มชื่อสิ่งของ")
        } else if (!finalMyMainCate || !finalMySubCate || !data.detail) {
            alert("คุณใส่ Category ของตัวเองไม่ถูกต้อง โปรดตรวจสอบใหม่อีกครั้ง");
        } else if (!dataCover) {
            alert("กรุณาเพิ่มรูปหน้าปก");
        } else if (!checkReqCat) {
            alert("กรุณาเลือกหมวดหมู่ให้ถูกต้อง (จำเป็นต้องมี)");
        } else if (!checkReqDetail) {
            alert("กรุณาใส่รายละเอียดของที่ต้องการให้ครบทุกช่อง (จำเป็นต้องมี)");
        }
    }
    if (!MainCategoriesEn || !productDetail._id || !SubCategoriesEn || !MainCatReq0) {
        return null
    }

    return (
        <div>
            <Navbar image={account.profilePic} />
            <Block height="auto" backgroundColor="#f7fafc">
                <form onSubmit={handleUnload}>
                    <div className="p-3 my-4 bg-white">
                        {/* ชื่อ */}
                        <h5 className="mb-4">Edit Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Item Name</label>
                            <div className="col-md-10">
                                <input type="text" ref={nameFocus} className="form-control fs-5" value={productDetail.name} onChange={(name) => setProductDetail({ ...productDetail, name: name.target.value })} placeholder="Enter your item name" />
                            </div>
                        </div>



                        {/* รูป */}
                        <div className="mb-4" style={{ height: "auto", backgroundColor: "#C4C4C4", border: "2px dashed #000", borderRadius: "10px" }}>
                            <div className="px-3 py-4">
                                <p className="ms-2">Picture</p>
                                <div className="d-flex justify-content-around flex-wrap">
                                    {/* Cover Picture */}
                                    <div className="position-relative">
                                        <input type="file" ref={coverPictureRef} name="Cover Picture" accept="image/*" onChange={handleCover} style={{ display: "none" }} />
                                        <img src={cover} style={{ width: "120px", height: "120px", cursor: "pointer" }}
                                            onClick={() => {
                                                coverPictureRef.current?.click();
                                            }}
                                        ></img>
                                        <p className="d-flex justify-content-center mb-0 mt-2">Cover Pictue</p>
                                        <ImCross className={dataCover ? "position-absolute rounded-circle bg-secondary pointer" : "d-none"}
                                            onClick={() => { setCover("https://via.placeholder.com/120"); setDataCover(undefined); }}
                                            style={{ top: "-7px", right: "-8px", width: "24px", height: "24px" }} />
                                    </div>
                                    {/* Picture 1 */}
                                    <div className="position-relative">
                                        <input type="file" ref={picture1Ref} name="Cover Picture" accept="image/*" onChange={handlePicture1} style={{ display: "none" }} />
                                        <img src={picture1} style={{ width: "120px", height: "120px", cursor: "pointer" }}
                                            onClick={() => {
                                                picture1Ref.current?.click();
                                            }}
                                        ></img>
                                        <p className="d-flex justify-content-center mb-0 mt-2">Picture 1</p>
                                        <ImCross className={dataPicture1 ? "position-absolute rounded-circle bg-secondary pointer" : "d-none"}
                                            onClick={() => { setPicture1("https://via.placeholder.com/120"); setDataPicture1(undefined); }}
                                            style={{ top: "-7px", right: "-8px", width: "24px", height: "24px" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ประเภทของเรา */}
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Category</label>
                            <div className="col-md-5">
                                <Select options={MainCategoriesEn}
                                    className="fs-5"
                                    name="category"
                                    onChange={(selectSubcate) => {
                                        selectMySub(selectSubcate)

                                    }}
                                    placeholder="กรุณาเลือก Category หลัก"
                                    defaultValue={{ value: finalMyMainCate, label: `${productDetail.category.parentCategoryEn}` }} />
                            </div>
                            <div className="col-md-5">
                                {subcate()}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" value={productDetail.detail} name="myDetail" onChange={(e) => setProductDetail({ ...productDetail, detail: e.target.value })} rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>



                        <hr className="my-4" />
                        {/* ประเภทที่ต้องการ */}
                        <div className="d-flex justify-content-between mb-3 mt-4">
                            <p className="fw-bold" style={{ fontSize: "24px" }}>Requirement</p>
                            <ImCross style={{ fontSize: "18px" }} />
                        </div>
                        {wantInputFields.map((inputField: any, index: any) => (
                            <div key={index}>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label fs-5">Require Category {index + 1}</label>
                                    <div className="col-md-5">
                                        <Select options={MainCategoriesEn}
                                            className="fs-5" name="wantMainCate"
                                            onChange={(selectWantSubCate) => {
                                                selectWantSub(index, selectWantSubCate);
                                                // selectedSub(index, { value: undefined })
                                            }}
                                            placeholder="กรุณาเลือก Category หลัก"
                                            defaultValue={{ value: inputField.reqCat.parentCategoryEn, label: `${inputField.reqCat.parentCategoryEn}` }} />

                                    </div>
                                    <div className="col-md-5">
                                        {changesub(index)}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label fs-5">Requirement Details</label>
                                    <div className="col-md-10">
                                        <textarea className="form-control fs-5" value={inputField.detail} name="detail" onChange={(event) => handleChangeDynamic(index, event)} rows={5} placeholder="Enter requirement details"></textarea>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    {/* <div className={countWantCate == 1 ? "d-none" : "bg-warning pointer"} onClick={() => { handleRemoveItem(index); setCountWantCate(countWantCate - 1) }}>
                                        <p className="m-0 px-1 text-white">Remove requirement</p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                        {/* <div className={countWantCate >= 5 ? "d-none" : "bg-info me-4 pointer"} onClick={() => {
                            handleAddItem(); setCountWantCate(countWantCate + 1);
                        }}>
                            <p className="m-0 px-1 text-white">Add requirement</p>
                        </div> */}
                        <p className="fs-5 text-mute text-right mt-3 mb-0">*เนื่องจากการแสดงผลที่ไม่สมบูรณ์ จึงขอความร่วมมือผู้ใช้งานค่อยๆทำการเลือกแต่ละรายการอย่างใจเย็น</p>


                        {/* ปุ่มยืนยัน */}
                        <hr className="my-4" />
                        <div className="d-flex justify-content-center">
                            <SolidButton width="100px" buttonColor="#15C777"><input type="submit" value="Submit" style={{ backgroundColor: "transparent", color: "white" }} /></SolidButton>
                            <SolidButton width="100px" buttonColor="red"><a href="/app/aboutaccount?component=inventory" style={{ textDecoration: "none", color: "white" }}>Cancel</a></SolidButton>
                        </div>
                    </div>
                </form>
            </Block>
            <Footer />
        </div>
    );
}