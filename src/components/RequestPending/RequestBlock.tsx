import './RequestBlock.css';

import { TransparentButton } from '../standard/Button'

import { IoMdSwap } from 'react-icons/io';

export default function RequestBlock({data, index}:any) {
    return (
        <div>
            <div className="outline p-3 mb-3">
                <img src="https://www.ishida.com/images/popcorn-640x480.gif" style={{width:"45px",height:"45px",borderRadius:"50%"}}/>
                <span style={{margin:"0 20px",color:"Black"}}>{data.name}</span>
                <hr style={{backgroundColor:"#c7c7c7"}}/>
                <div className="d-flex align-items-center justify-content-center flex-wrap zoneItem">
                    <div className="d-flex myItem-request">
                        <img src={data.myItem[0].pic} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                        <h5>{data.myItem[0].nameItem}</h5>
                    </div>
                    <div style={{minWidth:"10%",textAlign:"center",fontSize:"30px"}}>
                        <IoMdSwap/>
                    </div>
                    <div className="d-flex yourItem-request">
                        <img src={data.yourItem[0].pic} style={{width:"150px",height:"100px",marginRight:"20px"}}/>
                        <h5>{data.yourItem[0].nameItem}</h5>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <TransparentButton buttonColor="limegreen">Accept Request</TransparentButton>
                    <TransparentButton buttonColor="red">Cancel Request</TransparentButton>
                </div>
            </div>
        </div>
    );
}