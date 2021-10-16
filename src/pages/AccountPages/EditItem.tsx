//import './EditItem.css';
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

export default function EditItem() {
    return (
        <>
            <Navbar />
            <Block height="200px" backgroundColor="rgb(244,244,252)">
                <div className="container-edititem">
                    <div className="p-3 my-4 bg-white">
                        <h4>Edit Item</h4>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Item Name</label>
                            <div className="col-md-10">
                                <input type="text" className="form-control fs-5" value="blaaa" name="name" placeholder="Enter your item name" />
                            </div>
                        </div>

                        {/* รูป */}
                        <div className="mb-4" style={{ height: "auto", backgroundColor: "#C4C4C4", border: "2px dashed #000", borderRadius: "10px" }}>
                            <div className="px-3 py-4">
                                <p className="ms-2">Picture</p>
                                <div className="d-flex justify-content-around flex-wrap">
                                    {/* cover */}
                                    <div className=" ">
                                        <input />
                                        <img></img>
                                        <p className="d-flex justify-content-center mb-0 mt-2">cover pic</p>
                                    </div>
                                    {/* pic1 */}
                                    <div className="">
                                        <input />
                                        <img></img>
                                        <p className="d-flex justify-content-center mb-0 mt-2">Picture 1</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* my category */}
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Category</label>
                            <div className="col-md-5">
                                <Select
                                    className="fs-5"
                                    name="category"

                                    placeholder="กรุณาเลือก Category หลัก" />
                            </div>
                            <div className="col-md-5">

                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label fs-5">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control fs-5" value="" name="myDetail" rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>

                        <hr className="my-4" />
                        {/* wanted category */}
                        <div className="d-flex justify-content-between mb-3 mt-4">
                            <p className="fw-bold" style={{ fontSize: "24px" }}>Requirement</p>
                            <ImCross style={{ fontSize: "18px" }} />
                        </div>
                        {/*                         
                        { wantInputFields.map((inputField:any , index:any) => (
                            <div key={index}>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label fs-5">Require Category {index+1}</label>
                                    <div className="col-md-5">
                                        <Select options={MainCategoriesEn} 
                                            className="fs-5" name="wantMainCate" 
                                            onChange={(selectWantSubCate) => {selectWantSub(index , selectWantSubCate); 
                                                selectedSub(index, {value:undefined})}} 
                                            placeholder="กรุณาเลือก Category หลัก"/>
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
                                        <p className="m-0 px-1 text-white">Add requirement</p>
                                    </div>
                                    {/* <div className="bg-info" style={{width:"20px"}}/> 
                                    <div className="bg-warning " onClick={() => {handleRemoveItem(index)}}>
                                        <p className="m-0 px-1 text-white">Remove requirement</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        */}
                        {/* button */}
                        <hr className="my-4" />
                        <div className="d-flex justify-content-center">
                            <SolidButton width="100px" buttonColor="#15C777"><input type="submit" style={{ backgroundColor: "transparent", color: "white" }} /></SolidButton>
                            <SolidButton width="100px" buttonColor="red">Cancel</SolidButton>
                        </div>
                    </div>
                </div>
            </Block>
            <Footer />
        </>
    );
}