import useAuthorization from '../../hooks/useAuthorization';
import { AccountBlock } from './AccountBlock' ;

import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function FavoriteBlock(data:any , key:any) {

    const { deleteFavourite } = useAuthorization();
    const favoriteData = data.data;
    // console.log(favoriteData)
    const dataTag = favoriteData.require.map((dataTag:any) => 
        // console.log(dataTag.reqCat.parentCategoryEn)
        <p className="me-2 border border-0 rounded-pill " style={{width:"100px",backgroundColor:"#EDF2F4"}}>{dataTag.reqCat.parentCategoryEn}</p>
    );
    var checkpath = window.location.pathname;
    // console.log(dataTag)

    return (
        <AccountBlock padding="10px">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={favoriteData.pictures[0]} className="me-3 d-flex" style={{minWidth:"170px", height:"110px",borderRadius:"8px"}}/>
                    <div>
                        <h5 className="d-flex justify-content-start mb-3">{favoriteData.name}</h5>
                        <div className="d-flex flex-wrap">
                            <p className="mb-0 me-2">require: </p>
                            {dataTag}
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center me-3">
                    <div className="d-flex justify-content-center align-items-center fs-3"
                        onClick={() => deleteFavourite(favoriteData._id,checkpath)} 
                        style={{width:"40px",height:"40px",color:"red",border:"2px solid red",borderRadius:"8px",cursor:"pointer"}}>
                        <AiOutlineCloseCircle />
                    </div>
                </div>
            </div>

        </AccountBlock>
        // <div>
        //     <p>Hello world</p>
        // </div>
    );
}