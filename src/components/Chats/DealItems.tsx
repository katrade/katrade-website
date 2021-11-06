import { TransparentButton } from '../../components/standard/Button'
import { AiOutlineSwap } from 'react-icons/ai';
import useAuthorization from '../../hooks/useAuthorization';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../contexts/Socket';
import { useHistory } from 'react-router';

export default function DealItems(props: any) {

    const { LockRequest, deleteMyRequestPending } = useAuthorization()
    const [disableBtn, setDisableBtn] = useState(false)
    const { duoId } = useContext(SocketContext) 
    const history = useHistory()

    const handleConfirmBtn = () => {
        if(window.confirm(`ถ้ากดแล้วจะไม่สามารถกดยกเลิกได้`)){
            LockRequest(props.data.requestId, props.data.ownerInventoryId)
            setDisableBtn(true)
        }
        // console.log(props.data)
    }
    // console.log(props.data)
    const handleCancelBtn = () => {
        if(window.confirm(`ต้องการลบคำขออีหลีถิ?`)){
            deleteMyRequestPending(props.data.requestId)
            history.push(`/app/chat?duo_id=${props.data.targetInventory.owner}&duo_username=${props.data.targetInventory.username}`)
        }
    }
    // console.log(props.data.userConfirm)
    useEffect (() => {
        // console.log("TUM LAEWWWW")
        if (props.data.userConfirm) {
            setDisableBtn(true)
        }
        else{
            setDisableBtn(false)
        }
    }, [props.data, duoId])
    
    return (
        <div className="dealHover p-2 m-2" style={{ height: "167px", borderRadius: "10px", border: "1px solid grey" }}>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <img src={props.data.sourceInventory.pictures[0]} alt="" style={{ height: "80px", borderRadius: "10px" }} />
                    <p className="ms-2">{props.data.sourceInventory.username}</p>
                </div>
                <div style={{ width: "30px" }}>
                    <AiOutlineSwap />
                </div>
                <div className="d-flex">
                    <p className="me-2"><br />{props.data.targetInventory.username}</p>
                    <img src={props.data.targetInventory.pictures[0]} alt="" style={{ height: "80px", borderRadius: "10px" }} />
                </div>
            </div>
            <div className="row m-0 p-0 mt-3">
                {disableBtn ?
                    <>
                        <div className="d-flex justify-content-center">Waiting for your duo to confirmed</div>
                    </>
                    :
                    <>
                        <div className="col-6">
                            <TransparentButton
                                buttonColor="#00CC52"
                                width="100%" margin="0" padding="0"
                                onClick={handleConfirmBtn}>
                                Confirm Trade
                            </TransparentButton>
                            {/* <button className="btn fs-4" style={{ width: "100%", border: "2px solid #00CC52", borderRadius: "10px", color:"#00CC52"}>Confirm Trade</button> */}
                        </div>
                        <div className="col-6">
                            <TransparentButton 
                                buttonColor="#E20000" 
                                width="100%" 
                                margin="0" 
                                padding="0"
                                onClick={handleCancelBtn}>
                                Cancel Trade
                            </TransparentButton>
                            {/* <button className="btn fs-4" style={{ width: "100%", border: "2px solid #E20000", borderRadius: "10px", color: "#E20000" }}>Cancel Trade</button> */}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
