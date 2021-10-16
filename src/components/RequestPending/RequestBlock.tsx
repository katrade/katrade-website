import './RequestBlock.css';
import useAuthorization from '../../hooks/useAuthorization';
import { useState } from 'react';
import { useHistory } from "react-router";

import { TransparentButton } from '../standard/Button'

import { IoMdSwap } from 'react-icons/io';

export default function RequestBlock({data, status, index}:any) {
    const history = useHistory();
    const { deleteMyRequestPending , acceptRequest , deleteMyLockRequestPending, finishTrade } = useAuthorization();
    const handleFinishBtn = () => {
        if(window.confirm("ต้องการกด finish ใช่มั้ย")){
            finishTrade(data.requestId)
        }
    };

    function findUserNameAndId() {
        if (data.userStatus == "source"){
            history.push(`/app/chat?duo_id=${data.targetInventory.owner}&duo_username=${data.targetInventory.username}`)
        }else {
            history.push(`/app/chat?duo_id=${data.sourceInventory.owner}&duo_username=${data.sourceInventory.username}`)
        }
    }

    function btnRPI(){
        if(status == 0){
            return (
                <div>
                    <TransparentButton onClick={() => acceptRequest(data.requestId)} buttonColor="limegreen">Accept Request</TransparentButton>
                    <TransparentButton onClick={() => askingDeleteRequest()} buttonColor="red">Cancel Request</TransparentButton>
                </div>
            );
        }else if(status == 1){
            return <TransparentButton onClick={() => askingDeleteRequest()} buttonColor="red">Cancel Request</TransparentButton>;
        }else if(data.state == 1){
            return (
                <div className="d-flex align-items-center">
                    <p className="fs-5 m-0">Please deal and confirm for trading in your personal chat</p>
                    <TransparentButton width="100px" onClick={findUserNameAndId} buttonColor="blue">Chat</TransparentButton>
                </div>
            );
        }else if(data.state == 2){
            return (
                <div>
                    <TransparentButton className={data.userFinish ? `d-none` : ``} onClick={() => {handleFinishBtn()}} buttonColor="limegreen">สำเร็จ</TransparentButton>
                    <TransparentButton onClick={() => askingDeleteLockRequest()} buttonColor="red">ล้มเหลว</TransparentButton>
                </div>
            );
        }else {
            return <p className="fs-5 m-0">Error</p>;
        }
    }

    function askingDeleteRequest() {
        if(window.confirm("ต้องการลบคำขออีหลีถิ?")){
            deleteMyRequestPending(data.requestId);
		}
    }

    function askingDeleteLockRequest() {
        if(window.confirm("การแลกเปลี่ยนล้มเหลว?")){
            deleteMyLockRequestPending(data.requestId);
        }
    }

    function detailProduct(data_id:any){
		history.push(`/app/product?product_id=${data_id}`);
	}

    function myProductLeft(position:any){
        if(position == "my" && data.userStatus == "source"){
            return (
                <div className="d-flex myItem-request handleHover">
                    <img src={data.sourceInventory.pictures[0]} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                    <div>
                        <h5>{data.sourceInventory.name}</h5>
                        <p>{data.sourceInventory.username}</p>
                    </div>
                </div>
            );
        }else if(position == "my" && data.userStatus == "target"){
            return (
                <div className="d-flex myItem-request handleHover">
                    <img src={data.targetInventory.pictures[0]} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                    <div>
                        <h5>{data.targetInventory.name}</h5>
                        <p>{data.targetInventory.username}</p>
                    </div>
                </div>
            );
        }else if(position == "another" && data.userStatus == "source"){
            return (
                <div className="d-flex yourItem-request handleHover">
                    <img src={data.targetInventory.pictures[0]} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                    <div>
                        <h5>{data.targetInventory.name}</h5>
                        <p>{data.targetInventory.username}</p>
                    </div>
                </div>
            );
        }else if(position == "another" && data.userStatus == "target"){
            return (
                <div className="d-flex yourItem-request handleHover">
                    <img src={data.sourceInventory.pictures[0]} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                    <div>
                        <h5>{data.sourceInventory.name}</h5>
                        <p>{data.sourceInventory.username}</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="outline p-3 mb-3">
                <div className="d-flex justify-content-between">
                    <div>
                        {/* <img src="https://www.ishida.com/images/popcorn-640x480.gif" style={{width:"45px",height:"45px",borderRadius:"50%"}}/> */}
                        <span style={{fontSize:"24px",margin:"0 20px",color:"Black"}}>{data.targetInventory.username}</span>
                    </div>
                    <p>{data.userFinish ? "รออีกฝ่ายกดดำเนินการ" : "รอดำเนินการแลกเปลี่ยน"}</p>
                </div>
                

                <hr style={{backgroundColor:"#c7c7c7"}}/>
                <div className="d-flex align-items-center justify-content-center flex-wrap zoneItem">
                    <div className="d-flex myItem-request handleHover" onClick={() => detailProduct(data.sourceInventory._id)}>
                        {myProductLeft("my")};
                    </div>
                    <div style={{minWidth:"10%",textAlign:"center",fontSize:"30px"}}>
                        <IoMdSwap/>
                    </div>
                    <div className="d-flex yourItem-request handleHover" onClick={() => detailProduct(data.targetInventory._id)}>
                        {myProductLeft("another")};
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    {btnRPI()}
                </div>
            </div>
        </div>
    );
}
