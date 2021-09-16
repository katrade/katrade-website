import React , { useState , useEffect } from 'react';
import Select from 'react-select';
import useAuthorization from '../../hooks/useAuthorization';

import Block from '../../components/Block';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadImg from '../../components/Account/UploadImg';
import { SolidButton } from '../../components/standard/Button'
import { ContactSupportOutlined } from '@material-ui/icons';

export default function AddItem() {

    const [ category , setCategory ] = useState<any>();
    const { getCategory } = useAuthorization();

    useEffect(() => {
        async function init() {
            var CategoryData = await getCategory();
            if (CategoryData) {
                setCategory(CategoryData);
            }
        }
        init();
    }, []);

    var MainCategoriesEn;
    var MainCategoriesTh;
    var SubCategoriesEn:any = [];
    var SubCategoriesTh:any = [];
    SubCategoriesEn.push([{ value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},]);
    SubCategoriesTh.push([{ value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},]);
    if(category){
        MainCategoriesEn = category.map((data:any, index:any) => {
            var cCatEn = data.childCategoryEn
            SubCategoriesEn.push(cCatEn.map((data:any, index:any) => {
                return { value: data, label: data }
            }))
            var cCatTh = data.childCategoryTh
            SubCategoriesTh.push(cCatEn.map((data:any, index:any) => {
                return { value: data, label: data }
            }))
            var pCatEn = data.parentCategoryEn
            return { value: pCatEn, label: pCatEn}
        });
        MainCategoriesTh = category.map((data:any, index:any) => {
            var pCatTh = data.childCategoryTh
            return { value: pCatTh, label: pCatTh}
        });
    }

    // // Sub Category
    // const SubCategories = [
    //     [
    //         { value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},
    //     ],
    //     [
    //         { value: 'วิศวกรรมศาสตร์Faculty of Engineering', label: 'วิศวกรรมศาสตร์Faculty of Engineering' },
    //         { value: 'ประมงFaculty of Fisheries', label: 'ประมงFaculty of Fisheries' },
    //         { value: 'เกษตรFaculty of Agriculture', label: 'เกษตรFaculty of Agriculture' },
    //         { value: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine', label: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine' },
    //         { value: 'บริหารธุรกิจFaculty of Business Administration', label: 'บริหารธุรกิจFaculty of Business Administration' },
    //         { value: 'มนุษย์ศาสตร์Faculty of Humanities', label: 'มนุษย์ศาสตร์Faculty of Humanities' },
    //     ],
    //     [
    //         { value: 'Headphone', label: 'Headphone' },
    //         { value: 'Monitor', label: 'Monitor' },
    //         { value: 'Keyboard', label: 'Keyboard' },
    //         { value: 'Speaker', label: 'Speaker' },
    //         { value: 'Gaming Gear', label: 'Gaming Gear' },
    //     ],
    // ]

    const testCat = [{
        Textbook: [
            { value: 'วิศวกรรมศาสตร์Faculty of Engineering', label: 'วิศวกรรมศาสตร์Faculty of Engineering' },
            { value: 'ประมงFaculty of Fisheries', label: 'ประมงFaculty of Fisheries' },
            { value: 'เกษตรFaculty of Agriculture', label: 'เกษตรFaculty of Agriculture' },
            { value: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine', label: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine' },
            { value: 'บริหารธุรกิจFaculty of Business Administration', label: 'บริหารธุรกิจFaculty of Business Administration' },
            { value: 'มนุษย์ศาสตร์Faculty of Humanities', label: 'มนุษย์ศาสตร์Faculty of Humanities' },
        ]
    }]
    console.log(testCat);

    var mySubCateTag = "unSelect";
    function findMySubCate() {
        var placeholderString = "กรุณาเลือก Category ย่อย ของ " + mySubCateTag;
        var godhelpme = testCat[0].Textbook;

        return <Select options={godhelpme} className="fs-5" name="mySubCate" placeholder={placeholderString} />;
        
        // switch(mySubCateTag) {
            
            // case "unSelect":
            //     return <Select options={SubCategoriesEn[0]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย" />;
            // case "Man Clothes":
            //     return <Select options={SubCategoriesEn[1]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Man Clothes" />;
            // case "Woman Clothes":
            //     return <Select options={SubCategoriesEn[2]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Woman Clothes" />;
            // case "Beauty":
            //     return <Select options={SubCategoriesEn[3]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Beauty" />;
            // case "Textbook":
            //     return <Select options={SubCategoriesEn[4]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            // case "Electronics":
            //     return <Select options={SubCategoriesEn[5]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
            // case "Music Instruments":
            //     return <Select options={SubCategoriesEn[6]} className="fs-5" name="mySubCate" placeholder={placeholderString} />;
            // case "Textbook":
            //     return <Select options={SubCategoriesEn[7]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            // case "Electronics":
            //     return <Select options={SubCategoriesEn[8]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
            // case "unSelect":
            //     return <Select options={SubCategoriesEn[9]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย" />;
            // case "Textbook":
            //     return <Select options={SubCategoriesEn[10]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            // case "Electronics":
            //     return <Select options={SubCategoriesEn[11]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
            // case "Textbook":
            //     return <Select options={SubCategoriesEn[12]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            // case "Electronics":
            //     return <Select options={SubCategoriesEn[13]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
            // case "unSelect":
            //     return <Select options={SubCategoriesEn[14]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย" />;
            // case "Textbook":
            //     return <Select options={SubCategoriesEn[15]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            // case "Electronics":
            //     return <Select options={SubCategoriesEn[16]} className="fs-5" name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
        // }
    }
    function selectMySub(selectSubCate:any) { 
        mySubCateTag = selectSubCate.value;
        setMyItemSubCate(findMySubCate);
    }
    const [ myItemSubCate , setMyItemSubCate ] = useState(findMySubCate);

    // var wantSubCateTag = "unSelect";
    // function findWantSubCate() {
    //     switch(wantSubCateTag) {
    //         case "unSelect":
    //             return <Select options={SubCategories[0]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category ย่อย" />;
    //         case "Textbook":
    //             return <Select options={SubCategories[1]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
    //         case "Electronics":
    //             return <Select options={SubCategories[2]} className="fs-5" name="wantSubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
    //     }
    // }
    // function selectWantSub(selectWantSubCate:any) { 
    //     wantSubCateTag = selectWantSubCate.value;
    //     console.log("เลือก "+wantSubCateTag)
    //     setWantItemSubCate(findWantSubCate);
    // }
    // const [ wantItemSubCate , setWantItemSubCate ] = useState(findWantSubCate);

    return (
        <div>
            <Navbar />
            <Block height="auto" backgroundColor="#f7fafc">
                <form action="https://httpbin.org/post" method="POST">
                    <div className="p-3 my-4 bg-white">
                        {/* ชื่อ */}
                        <h5 className="mb-4">Add New Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Item Name</label>
                            <div className="col-md-10">
                                <input type="text" className="form-control fs-5" name="nameItem" placeholder="Enter your item name" />
                            </div>
                        </div>

                        {/* รูป */}
                        <div className="mb-4" style={{height:"auto",backgroundColor:"#C4C4C4",border:"2px dashed #000",borderRadius:"10px"}}>
                            <div className="px-3 py-4">
                                <p className="ms-2">Picture</p>
                                <div className="d-flex justify-content-around flex-wrap">
                                    <UploadImg positionPic={"Cover Picture"}/>
                                    <UploadImg positionPic={"Picture 1"}/>
                                    <UploadImg positionPic={"Picture 2"}/>
                                    <UploadImg positionPic={"Picture 3"}/>
                                    <UploadImg positionPic={"Picture 4"}/>
                                </div>
                            </div>
                        </div>

                        {/* ประเภทของเรา */}
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Category</label>
                            <div className="col-md-5">
                                <Select options={MainCategoriesEn} className="fs-5" name="myMainCate" onChange={(selectSubCate) => selectMySub(selectSubCate)} placeholder="กรุณาเลือก Category หลัก"/>
                            </div>
                            <div className="col-md-5">
                                {myItemSubCate}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" name="myDetails" rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>

                        {/* ประเภทที่ต้องการ */}
                        <p className="mb-0 mt-4 fw-bold">Requirement</p>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Require Category</label>
                            <div className="col-md-5">
                                {/* <Select options={MainCategories} className="fs-5" name="wantMainCate" onChange={(selectSubCate) => selectWantSub(selectSubCate)} placeholder="กรุณาเลือก Category หลัก"/> */}
                            </div>
                            <div className="col-md-5">
                                {/* {wantItemSubCate} */}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Requirement Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" name="wantDetails" rows={5} placeholder="Enter requirement details"></textarea>
                            </div>
                        </div>

                        {/* ปุ่มยืนยัน */}
                        <div className="d-flex justify-content-center mt-5">
                            <SolidButton width="100px" buttonColor="limegreen"><input type="submit" value="Submit" style={{backgroundColor:"transparent",color:"white"}}/></SolidButton>
                            <SolidButton width="100px" buttonColor="red"><a href="/app/manageInventory" style={{textDecoration:"none",color:"white"}}>Cancel</a></SolidButton>
                        </div>
                    </div>
                </form>
            </Block>
            <Footer />
        </div>
    );
}