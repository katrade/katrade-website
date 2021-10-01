import React , { useState , useEffect , useRef } from 'react';
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

export default function AddItem() {

    const [ category , setCategory ] = useState<any>();
    const { getCategory , addItem } = useAuthorization();

    useEffect(() => {
        async function init() {
            var CategoryData = await getCategory();
            if (CategoryData) {
                setCategory(CategoryData);
            }
        }
        init();
    }, []);

    // ยังไม่พร้อมใช้งานในโหมดภาษาไทย ขี้เกียจงับ
    // ยังไม่พร้อมใช้งานในโหมดภาษาไทย ขี้เกียจงับ
    // ยังไม่พร้อมใช้งานในโหมดภาษาไทย ขี้เกียจงับ

    var MainCategoriesEn:any;
    var MainCategoriesTh:any;
    var SubCategoriesEn:any = [];
    var SubCategoriesTh:any = [];
    var MainCateLangTh:any = [];
    var SubCateLangTh:any = [];
    SubCategoriesEn.push([{ value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},]);
    SubCategoriesTh.push([{ value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},]);
    if(category){
        MainCategoriesEn = category.map((data:any, index:any) => {
            var cCatEn = data.childCategoryEn
            SubCategoriesEn.push(cCatEn.map((data:any, index:any) => {
                return { value: data, 'label': data, indexC: index }
            }))
            var cCatTh = data.childCategoryTh
            SubCategoriesTh.push(cCatTh.map((data:any, index:any) => {
                return { value: data, 'label': data, indexC: index }
            }))
            var pCatEn = data.parentCategoryEn
            return { value: pCatEn, 'label': pCatEn, indexC: index}
        });

        MainCategoriesTh = category.map((data:any, index:any) => {
            var pCatTh = data.childCategoryTh
            var pCatEn = data.parentCategoryEn
            MainCateLangTh.push(data.parentCategoryTh);
            return { value: pCatEn, 'label': pCatTh, indexC: index}
        });

        SubCateLangTh.push(category.map((data:any, index:any) => {
            var tmp:any = [];
            (data.childCategoryTh.map((subdata:any, index:any) => {
                tmp.push(subdata);
            }));
            return tmp;
        }))
    }

    // ------------------------------------------------------------------

    const [ finalMyMainCate , setFinalMyMainCate ] = useState();
    const [ finalMySubCate , setFinalMySubCate ] = useState();
    const [ finalMyMainCateTh , setFinalMyMainCateTh ] = useState();
    const [ finalMySubCateTh , setFinalMyMSubCateTh ] = useState();

    var mySubCateTag = "unSelect";
    var mySubCateIndex = 0;
    function findMySubCate() {
        var placeholderString = "กรุณาเลือก Category ย่อย ของ " + mySubCateTag;
        var godhelpme = SubCategoriesEn[mySubCateIndex+1];
        if(mySubCateIndex == 0){
            return <Select options={godhelpme} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category หลักก่อน" />;
        }else{
            return <Select options={godhelpme} className="fs-5" name="mySubCate" onChange={(sel:any) => {selectMySubTh(sel)}} placeholder={placeholderString} />;
        }
    }

    function selectMySub(selectMySubCate:any) { 
        mySubCateTag = selectMySubCate.value;
        mySubCateIndex = selectMySubCate.indexC;
        setFinalMyMainCate(selectMySubCate.value);
        setFinalMyMainCateTh(MainCateLangTh[mySubCateIndex]);
        setMyItemSubCate(findMySubCate);
    }
    function selectMySubTh(event:any) {
        setFinalMySubCate(event.value)
        setFinalMyMSubCateTh(SubCateLangTh[0][mySubCateIndex][event.indexC])
    }
    const [ myItemSubCate , setMyItemSubCate ] = useState(findMySubCate);

    // ------------------------------------------------------------------
    
    const [ wantInputFields , SetWantInputFields ] = useState<any>([
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

    const handleChangeDynamic = (index:any , event:any) => {
        const values = [...wantInputFields];
        values[index][event.target.name] = event.target.value;
        SetWantInputFields(values);
    }

    const handleAddItem = () => {
        SetWantInputFields([...wantInputFields , {
            reqCat: { 
                parentCategoryEn: "",
                parentCategoryTh: "",
                childCategoryEn: "",
                childCategoryTh: ""
            },
            detail: ""
        }])
    }

    const handleRemoveItem = (index:any) => {
        // const values = [...wantInputFields];
        // values.splice(index , 1);
        // SetWantInputFields(values);
        window.alert("ยังไม่พร้อมใช้งาน")
    }

    var wantSubCateTag = "unSelect";
    var wantSubCateIndex = 0;
    var [ godHelpMe , setGodHelpMe ] = useState<any>(<Select options={SubCategoriesEn[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category หลักก่อน" />);

    function selectWantSub(index:any , event:any) { 
        const values = [...wantInputFields];
        values[index]["reqCat"]["parentCategoryEn"] = event.value;
        SetWantInputFields(values);

        wantSubCateTag = event.value;
        wantSubCateIndex = event.indexC;
        values[index]["reqCat"]["parentCategoryTh"] = MainCateLangTh[wantSubCateIndex];

        setGodHelpMe(<Select options={SubCategoriesEn[wantSubCateIndex+1]} className="fs-5" name="wantSubCate" onChange={(event) => selectedSub(index , event)} placeholder="กรุณาเลือก Category หลักก่อน" />);
    }
    function selectedSub(index:any , event:any) {
        const values = [...wantInputFields];
        values[index]["reqCat"]["childCategoryEn"] = event.value;
        values[index]["reqCat"]["childCategoryTh"] = SubCateLangTh[0][wantSubCateIndex][event.indexC];
        SetWantInputFields(values);
    }

    const [ account , setAccount] = useState<IAccount>(defaultEmptyAccount);
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

    const [ cover, setCover ] = useState("https://via.placeholder.com/120")
    const [ dataCover, setDataCover ] = useState<File>()
    const [ picture1, setPicture1 ] = useState("https://via.placeholder.com/120")
    const [ dataPicture1, setDataPicture1 ] = useState<File>()

    const handleCover = (e:any) => {
        const file = e.target.files[0];
        setDataCover(file);
        const fileURL = URL.createObjectURL(file);
        setCover(fileURL);
    }
    const handlePicture1 = (e:any) => {
        const file = e.target.files[0];
        setDataPicture1(file);
        const fileURL = URL.createObjectURL(file);
        setPicture1(fileURL);
    }

    const [dataItem, handleDataItem] = useForm();

    function handleUnload(event:any){ 
        event.preventDefault();
        var arrayOfPicture:File[] = [];
        dataCover ? arrayOfPicture.push(dataCover) : alert("Need cover photo");
        dataPicture1 ? arrayOfPicture.push(dataPicture1) : alert("Need picture(s)");
    
        
        const data = {
            name: dataItem.name,
            detail: dataItem.myDetail,
            category: {
                parentCategoryEn: finalMyMainCate,
                parentCategoryTh: finalMyMainCateTh,
                childCategoryEn: finalMySubCate,
                childCategoryTh: finalMySubCateTh
            },
            pictures: [],
            require: wantInputFields
        }
        // console.log(data);
        addItem(data, arrayOfPicture);
    }

    return (
        <div>
            <Navbar image={account.profilePic}/>
            <Block height="auto" backgroundColor="#f7fafc">
                <form onSubmit={handleUnload}>
                    <div className="p-3 my-4 bg-white">
                        {/* ชื่อ */}
                        <h5 className="mb-4">Add New Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Item Name</label>
                            <div className="col-md-10">
                                <input type="text" className="form-control fs-5" value={dataItem.name || ""} name="name" onChange={handleDataItem} placeholder="Enter your item name" />
                            </div>
                        </div>



                        {/* รูป */}
                        <div className="mb-4" style={{height:"auto",backgroundColor:"#C4C4C4",border:"2px dashed #000",borderRadius:"10px"}}>
                            <div className="px-3 py-4">
                                <p className="ms-2">Picture</p>
                                <div className="d-flex justify-content-around flex-wrap">
                                    {/* Cover Picture */}
                                    <div className="">
                                        <input type="file" ref={coverPictureRef} name="Cover Picture" accept="image/*" onChange={handleCover} style={{display:"none"}}/>
                                        <img src={cover} style={{width:"120px",height:"120px",cursor:"pointer"}}
                                        onClick={() => {
                                            coverPictureRef.current?.click();
                                        }}
                                        ></img>
                                        <p className="d-flex justify-content-center mb-0 mt-2">Cover Pictue</p>
                                    </div>
                                    {/* Picture 1 */}
                                    <div className="">
                                        <input type="file" ref={picture1Ref} name="Cover Picture" accept="image/*" onChange={handlePicture1} style={{display:"none"}}/>
                                        <img src={picture1} style={{width:"120px",height:"120px",cursor:"pointer"}}
                                        onClick={() => {
                                            picture1Ref.current?.click();
                                        }}
                                        ></img>
                                        <p className="d-flex justify-content-center mb-0 mt-2">Picture 1</p>
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
                                    onChange={(selectSubCate) => {selectMySub(selectSubCate)}} 
                                    placeholder="กรุณาเลือก Category หลัก"/>
                            </div>
                            <div className="col-md-5">
                                {myItemSubCate}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" value={dataItem.myDetail || ""} name="myDetail" onChange={handleDataItem} rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>



                        <hr className="my-4"/>
                        {/* ประเภทที่ต้องการ */}
                        <p className="mb-0 mt-4 fw-bold">Requirement</p>
                        { wantInputFields.map((inputField:any , index:any) => (
                            <div key={index}>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label fs-5">Require Category {index+1}</label>
                                    <div className="col-md-5">
                                        <Select options={MainCategoriesEn} className="fs-5" name="wantMainCate" onChange={(selectWantSubCate) => selectWantSub(index , selectWantSubCate)} placeholder="กรุณาเลือก Category หลัก"/>
                                    </div>
                                    <div className="col-md-5">
                                        {godHelpMe}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label fs-5">Requirement Details</label>
                                    <div className="col-md-10">
                                        <textarea className="form-control fs-5" value={inputField.detail} name="detail" onChange={(event) => handleChangeDynamic(index , event)} rows={5} placeholder="Enter requirement details"></textarea>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="bg-info me-4" onClick={()=>{handleAddItem();}}>
                                        <p className="m-0 px-1">Add requirement</p>
                                    </div>
                                    {/* <div className="bg-info" style={{width:"20px"}}/> */}
                                    <div className="bg-warning " onClick={() => {handleRemoveItem(index)}}>
                                        <p className="m-0 px-1">Remove requirement</p>
                                    </div>
                                </div>
                            </div>
                        ))}



                        {/* ปุ่มยืนยัน */}
                        <hr className="my-4"/>
                        <div className="d-flex justify-content-center">
                            <SolidButton width="100px" buttonColor="limegreen"><input type="submit" value="Submit" style={{backgroundColor:"transparent",color:"white"}}/></SolidButton>
                            <SolidButton width="100px" buttonColor="red"><a href="/app/aboutaccount?component=inventory" style={{textDecoration:"none",color:"white"}}>Cancel</a></SolidButton>
                        </div>
                    </div>
                </form>
            </Block>
            <Footer />
        </div>
    );
}