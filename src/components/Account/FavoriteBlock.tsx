import useAuthorization from '../../hooks/useAuthorization';
import { useHistory } from "react-router";
import { AccountBlock } from './AccountBlock' ;

import { AiOutlineCloseCircle } from 'react-icons/ai';

const backgroundImageStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
}

export default function FavoriteBlock(data:any , key:any) {

    const { deleteFavourite } = useAuthorization();
    const history = useHistory();

    const favoriteData = data.data;
    const dataTag = favoriteData.require.map((dataTag:any) => {
        return (
            <div className="d-flex mx-2 px-2" style={{backgroundColor:"rgb(21, 199, 119)", borderRadius:"8px"}}>
                <p className="m-0 text-white">{dataTag.reqCat.parentCategoryEn} :</p>
                <p className="m-0 text-white">&nbsp;{dataTag.reqCat.childCategoryEn}</p>
            </div>
        );
    });
    var checkpath = window.location.pathname;

    function detailProduct(){
		history.push(`/app/product?product_id=${favoriteData._id}`);
	}

    console.log(favoriteData);
    return (
        <AccountBlock padding="15px">
            <div className="d-flex flex-wrap position-relative">
				<div className="p-0" onClick={detailProduct} style={{width:"170px", height:"110px", cursor:"pointer", ...backgroundImageStyles, backgroundImage: `url(${favoriteData.pictures[0]})`}} />
                <div className="ps-3 text-start col-md-9" style={{borderRadius:"8px",cursor:"pointer"}} onClick={detailProduct}>
					<h5 className="mb-3">{favoriteData.name}</h5>
					<div className="d-flex flex-wrap">
						<p className="m-0">require : </p>
						{dataTag}
					</div>
				</div>

                {/* <div className="d-flex align-items-center me-3"> */}
				<div className="position-absolute" style={{top:"30px",right:"0"}}>
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