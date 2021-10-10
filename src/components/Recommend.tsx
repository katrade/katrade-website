import { useHistory } from 'react-router-dom';
import './Recommend.css';

function Recommend(itemData:any) {
    
    const item = itemData.item;
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
            <div className="recommend-text-card py-3">
                <p className="text-truncate">{item.name}</p>
                <p className="desc item-desc text-truncate">{item.detail}</p>
            </div>
        </div>
    );
};

export default Recommend;