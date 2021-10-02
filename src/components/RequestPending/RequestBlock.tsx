import './RequestBlock.css';
import useAuthorization from '../../hooks/useAuthorization';
import { useHistory } from "react-router";

import { TransparentButton } from '../standard/Button'

import { IoMdSwap } from 'react-icons/io';

export default function RequestBlock({data, status, index}:any) {

    const history = useHistory();
    const { deleteMyRequestPending , acceptRequest} = useAuthorization();
    function btnRPI(){
        if(status == 0){
            return (
                <div>
                    <TransparentButton onClick={() => acceptRequest(data.requestId)} buttonColor="limegreen">Accept Request</TransparentButton>
                    <TransparentButton onClick={() => askingDeleteRequest(data)} buttonColor="red">Cancel Request</TransparentButton>
                </div>
            );
        }else if(status == 1){
            return <TransparentButton onClick={() => askingDeleteRequest(data)} buttonColor="red">Cancel Request</TransparentButton>;
        }else if(status == 2){
            return (
                <div>
                    <p className="fs-5 m-0">Please deal and confirm for trading in your personal chat</p>
                    <TransparentButton onClick={() => history.push(`/app/heydude?request_id=${data.requestId}`)} buttonColor="blue">Chat หลอกๆ</TransparentButton>
                </div>
            );
        }else if(status == 3){
            return (
                <div>
                    <TransparentButton buttonColor="limegreen">Finish Trade</TransparentButton>
                    <TransparentButton buttonColor="red">Cancel Trade</TransparentButton>
                </div>
            );
        }else {
            return <p className="fs-5 m-0">Error</p>;
        }
    }

    function askingDeleteRequest(data:any) {
        if(window.confirm(`ต้องการลบคำขออีหลีถิ?`)){
            deleteMyRequestPending(data.requestId)
		}
    }

    function detailProduct(data_id:any){
		history.push(`/app/product?product_id=${data_id}`);
	}

    return (
        <div>
            <div className="outline p-3 mb-3">
                <img src="https://www.ishida.com/images/popcorn-640x480.gif" style={{width:"45px",height:"45px",borderRadius:"50%"}}/>
                <span style={{margin:"0 20px",color:"Black"}}>{data.targetInventory.username}</span>
                <hr style={{backgroundColor:"#c7c7c7"}}/>
                <div className="d-flex align-items-center justify-content-center flex-wrap zoneItem">
                    <div className="d-flex myItem-request" onClick={() => detailProduct(data.sourceInventory._id)}>
                        <img src={data.sourceInventory.pictures[0]} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                        <h5>{data.sourceInventory.name}</h5>
                    </div>
                    <div style={{minWidth:"10%",textAlign:"center",fontSize:"30px"}}>
                        <IoMdSwap/>
                    </div>
                    <div className="d-flex yourItem-request" onClick={() => detailProduct(data.targetInventory._id)}>
                        <img src={data.targetInventory.pictures[0]} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                        <h5>{data.targetInventory.name}</h5>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    {btnRPI()}
                </div>
            </div>
        </div>
    );
}
