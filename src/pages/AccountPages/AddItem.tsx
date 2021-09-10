import React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';

import Block from '../../components/Block';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UploadImg from '../../components/Account/UploadImg';

export default function AddItem() {

    // Main Category
    const optionsMain = [
        { value: 'Textbook', label: 'Textbook' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Music Instrument', label: 'Music Instrument' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Cartoon', label: 'Cartoon' },
        { value: 'Stationery', label: 'Stationery' },
    ]

    // Sub Category
    const unSelect = [
        { value: 'กรุณาเลือก Category หลักก่อน', label: 'กรุณาเลือก Category หลักก่อน'}
    ]
    const Textbook = [
        { value: 'วิศวกรรมศาสตร์Faculty of Engineering', label: 'วิศวกรรมศาสตร์Faculty of Engineering' },
        { value: 'ประมงFaculty of Fisheries', label: 'ประมงFaculty of Fisheries' },
        { value: 'เกษตรFaculty of Agriculture', label: 'Music Instrument' },
        { value: 'สัตวแพทยศาสตร์Faculty of Veterinary Medicine', label: 'Accessories' },
        { value: 'บริหารธุรกิจFaculty of Business Administration', label: 'Cartoon' },
        { value: 'มนุษย์ศาสตร์Faculty of Humanities', label: 'Stationery' },
    ]
    const Electronics = [
        { value: 'Headphone', label: 'Textbook' },
        { value: 'Monitor', label: 'Electronics' },
        { value: 'Keyboard', label: 'Music Instrument' },
        { value: 'Speaker', label: 'Accessories' },
        { value: 'Gaming Gear', label: 'Cartoon' },
    ]

    
    var subCateTag = "unSelect";
    function findSubCate() {
        if (subCateTag == "unSelect"){
            console.log("You choose Textbook.");
            return <Select options={unSelect}></Select>;
        }
    }

    function selectSubCate(selectSub:any) { 
        subCateTag = selectSub.value;
    }

    return (
        <div>
            <Navbar />
            <Block height="auto" backgroundColor="#f7fafc">
                <form action="">
                    <div className="py-3 px-5 my-3 bg-white">
                        <h5>Add New Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Item Name</label>
                            <div className="col-md-10">
                                <input type="email" className="form-control" id="inputName" placeholder="Enter your item name" />
                            </div>
                        </div>
                        <div className="mb-3" style={{height:"auto",backgroundColor:"#C4C4C4",border:"2px solid #000",borderRadius:"10px"}}>
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
                                <Select id="MyItem" options={optionsMain} onChange={(selectSub) => selectSubCate(selectSub)}/>
                            </div>
                            <div className="col-md-5">
                                {findSubCate()}
                            </div>

                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>
                        <p className="mb-0 mt-4 fw-bold">Requirement</p>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Require Category</label>
                            <div className="col-md-5">
                                <Select options={optionsMain} />
                            </div>
                            <div className="col-md-5">
                                {/* <Select options={optionsSub} /> */}
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Requirement Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} placeholder="Enter requirement details"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </Block>
            <Footer />
        </div>
    );
}