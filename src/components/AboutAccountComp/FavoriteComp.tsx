import { useState , useEffect } from 'react';
import FavoriteBlock from '../../components/Account/FavoriteBlock';
import Div from '../standard/Div';
import { H4, H5 } from '../standard/H';

export default function FavoriteComp(data: any) {
    const [ favouriteLength, setFavoriteLength] = useState<any>();
    const favouriteData:any = data.data;

    useEffect(() => {
        if(favouriteData){
            setFavoriteLength(favouriteData.length);
        }
    } , [favouriteData])

    function handleFavouriteLength(noti:any) {
        setFavoriteLength(favouriteLength - 1);
    }

    if(favouriteData){

        const Favorite = favouriteData.map((data:any, index:any) => {
            return <FavoriteBlock data={data} index={index} Noti={(index:any) => {handleFavouriteLength(index)}}/>;
        })
        // setFavoriteMap(Favorite);
        if(favouriteData.length == 0){
            return (
                <Div dynamicPair={["#fff", "#212121"]} className="row mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                    <div>
                        <H4 className="d-inline-block me-3 mb-4">Favorite</H4>
                        <H5 className="d-inline-block">({favouriteLength})</H5>
                    </div>
                    <div>
                        <H5 className="text-center">คุณยังไม่มีของที่ชอบเลย</H5>
                    </div>
                </Div>
            );
        }else{
            return (
                <div>
                    <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                        <div>  
                            <h4 className="d-inline-block me-3 mb-4">Favorite</h4>
                            <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({favouriteLength})</h5>
                        </div>
                        <div>
                            {Favorite}
                        </div>
                    </div>
                </div>
            );
        }
    }else{
        return (
            <div>
               <p>ลาดีด้าดีด้า</p>
            </div>
        );
    }
}