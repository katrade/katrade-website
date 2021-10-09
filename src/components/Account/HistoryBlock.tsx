import { AccountBlock } from './AccountBlock' ;

import { IoMdSwap } from 'react-icons/io';

const ItemStlye = {
    width:"43%",
    padding: "20px",
    backgroundColor: "#d7d7d7",
    borderRadius: "10px",
}

export default function HistoryBlock(props:any) {
    const { data } = props;
    return (
        <div>
            <AccountBlock padding="10px">
                <div className="d-flex flex-wrap justify-content-between">
                    <div className="d-inline-block" style={ItemStlye}>
                        <h5 className="text-left text-truncate">{data.targetInventoryName}</h5>
                        <p className="text-left text-truncate">{data.targetUsername}</p>
                    </div>
                    <div className="" style={{width:"4%",fontSize:"35px",margin:"auto 0"}}>
                        <IoMdSwap />
                    </div>
                    <div className="d-inline-block" style={ItemStlye}>
                        <h5 className="text-left text-truncate">{data.sourceInventoryName}</h5>
                        <p className="text-left text-truncate">{data.sourceUsername}</p>
                    </div>
                </div>
            </AccountBlock>
        </div>
        // <div>
        //     <AccountBlock padding="10px">
        //         <div className="row" style={{ width: "100%" , margin:"0"}}>
        //             <div className="col-lg" style={ItemStlye}>
        //                 <h5 className="text-left text-truncate">{data.targetInventoryName}</h5>
        //                 <p className="text-left text-truncate">{data.targetUsername}</p>
        //             </div>
        //             <div className="col-lg" style={{width:"10%",fontSize:"35px",margin:"auto 0"}}>
        //                 <IoMdSwap />
        //             </div>
        //             <div className="col-lg" style={ItemStlye}>
        //                 <h5 className="text-left text-truncate">{data.sourceInventoryName}</h5>
        //                 <p className="text-left text-truncate">{data.sourceUsername}</p>
        //             </div>
        //         </div>
        //     </AccountBlock>
        // </div>
    );
}