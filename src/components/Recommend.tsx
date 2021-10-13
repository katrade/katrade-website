import { useHistory } from 'react-router-dom';
import './Recommend.css';

function Recommend(itemData:any, match:any) {
    
    const item = itemData.item;
    const matchwith = itemData.match;

    const matchlist = matchwith.map((data:any, index:any) => {
        return (
            <div className="px-2 rounded-3 ms-2" style={{backgroundColor:"#15C777"}}>
                <p className="m-0 text-white">{data.name}</p>
            </div>
            );
    })

    const history = useHistory();
    function LinkItemData() {
        history.push(`/app/product?product_id=${item._id}`);
    }

    return (
        <div className="recommend-card" onClick={LinkItemData}>
            <div 
                className="recommend-photo-card" 
                style={{ backgroundImage: `url(${item.pictures[0]})` }}
            >
            </div>
            <div className="recommend-text-card">
                <p className="text-truncate">{item.name}</p>
                <p className="d-flex desc item-desc text-truncate">ตรงกับ : {matchlist}</p>
            </div>
            <div className="text-end px-2">
                <p style={{ color: "#00b34a", fontSize: "16px"}}>{item.username}</p>
            </div>
        </div>
    );
};

export default Recommend;