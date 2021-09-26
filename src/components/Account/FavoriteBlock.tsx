import { AccountBlock } from './AccountBlock' ;

import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function FavoriteBlock(props:any) {
    const { data , index } = props;

    const dataTag = data.tag.map((dataTag:any) => 
        <p className="me-2 border border-0 rounded-pill " style={{width:"100px",backgroundColor:"#EDF2F4"}}>{dataTag}</p>
    );

    return (
        <AccountBlock padding="10px">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={data.image} className="me-3 d-flex" style={{minWidth:"170px", height:"110px",borderRadius:"8px"}}/>
                    <div>
                        <h5 className="d-flex justify-content-start mb-3">{data.name}</h5>
                        <div className="d-flex flex-wrap">
                            <p>require: </p>
                            {dataTag}
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center me-3">
                    <div className="d-flex justify-content-center align-items-center fs-3"
                        onClick={() => console.log("กดแล้ว")} 
                        style={{width:"40px",height:"40px",color:"red",border:"2px solid red",borderRadius:"8px"}}>
                        <AiOutlineCloseCircle />
                    </div>
                </div>
            </div>
        </AccountBlock>
    );
}