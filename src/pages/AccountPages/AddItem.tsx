import React , { useState , useEffect } from 'react';
import Select from 'react-select';

import Block from '../../components/Block';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadImg from '../../components/Account/UploadImg';
import { SolidButton } from '../../components/standard/Button'

export default function AddItem() {

    // Main Category
    const MainCategories = [
        { value: 'Textbook', label: 'Textbook' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Music Instrument', label: 'Music Instrument' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Cartoon', label: 'Cartoon' },
        { value: 'Stationery', label: 'Stationery' },
    ]

    // Sub Category
    const SubCategories = [
        [
            { value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'},
        ],
        [
            { value: 'วิศวกรรมศาสตร์Faculty of Engineering', label: 'วิศวกรรมศาสตร์Faculty of Engineering' },
            { value: 'ประมงFaculty of Fisheries', label: 'ประมงFaculty of Fisheries' },
            { value: 'เกษตรFaculty of Agriculture', label: 'เกษตรFaculty of Agriculture' },
            { value: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine', label: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine' },
            { value: 'บริหารธุรกิจFaculty of Business Administration', label: 'บริหารธุรกิจFaculty of Business Administration' },
            { value: 'มนุษย์ศาสตร์Faculty of Humanities', label: 'มนุษย์ศาสตร์Faculty of Humanities' },
        ],
        [
            { value: 'Headphone', label: 'Headphone' },
            { value: 'Monitor', label: 'Monitor' },
            { value: 'Keyboard', label: 'Keyboard' },
            { value: 'Speaker', label: 'Speaker' },
            { value: 'Gaming Gear', label: 'Gaming Gear' },
        ],
    ]

    var mySubCateTag = "unSelect";
    function findMySubCate() {
        switch(mySubCateTag) {
            case "unSelect":
                return <Select options={SubCategories[0]} name="mySubCate" placeholder="กรุณาเลือก Category ย่อย" />;
            case "Textbook":
                return <Select options={SubCategories[1]} name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            case "Electronics":
                return <Select options={SubCategories[2]} name="mySubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
        }
    }
    function selectMySub(selectSubCate:any) { 
        mySubCateTag = selectSubCate.value;
        setMyItemSubCate(findMySubCate);
    }
    const [ myItemSubCate , setMyItemSubCate ] = useState(findMySubCate);

    var wantSubCateTag = "unSelect";
    function findWantSubCate() {
        switch(wantSubCateTag) {
            case "unSelect":
                return <Select options={SubCategories[0]} name="wantSubCate" placeholder="กรุณาเลือก Category ย่อย" />;
            case "Textbook":
                return <Select options={SubCategories[1]} name="wantSubCate" placeholder="กรุณาเลือก Category ย่อย ของ Textbook" />;
            case "Electronics":
                return <Select options={SubCategories[2]} name="wantSubCate" placeholder="กรุณาเลือก Category ย่อย ของ Electronics" />;
        }
    }
    function selectWantSub(selectWantSubCate:any) { 
        wantSubCateTag = selectWantSubCate.value;
        console.log("เลือก "+wantSubCateTag)
        setWantItemSubCate(findWantSubCate);
    }
    const [ wantItemSubCate , setWantItemSubCate ] = useState(findWantSubCate);

    return (
        <div>
            <Navbar />
            <Block height="auto" backgroundColor="#f7fafc">
                <form action="https://httpbin.org/post" method="POST">
                    <div className="py-3 px-5 my-3 bg-white">
                        <h5>Add New Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Item Name</label>
                            <div className="col-md-10">
                                <input type="text" className="form-control" name="nameItem" placeholder="Enter your item name" />
                            </div>
                        </div>
                        <div className="mb-3" style={{height:"auto",backgroundColor:"#C4C4C4",border:"2px dashed #000",borderRadius:"10px"}}>
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
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Category</label>
                            <div className="col-md-5">
                                <Select options={MainCategories} name="myMainCate" onChange={(selectSubCate) => selectMySub(selectSubCate)} placeholder="กรุณาเลือก Category หลัก"/>
                            </div>
                            <div className="col-md-5">
                                {myItemSubCate}
                            </div>

                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control" name="myDetails" rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>
                        <p className="mb-0 mt-4 fw-bold">Requirement</p>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Require Category</label>
                            <div className="col-md-5">
                                <Select options={MainCategories} name="wantMainCate" onChange={(selectSubCate) => selectWantSub(selectSubCate)} placeholder="กรุณาเลือก Category หลัก"/>
                            </div>
                            <div className="col-md-5">
                                {wantItemSubCate}
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Requirement Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control" name="wantDetails" rows={5} placeholder="Enter requirement details"></textarea>
                            </div>
                        </div>
                        <SolidButton width="100px" buttonColor="limegreen"><input type="submit" value="Submit" style={{backgroundColor:"transparent",color:"white"}}/></SolidButton>
                        <SolidButton width="100px" buttonColor="red"><a href="/app/manageInventory" style={{textDecoration:"none",color:"white"}}>Cancel</a></SolidButton>
                    </div>
                </form>
            </Block>
            <Footer />
        </div>
    );
}