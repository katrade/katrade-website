import { useHistory } from 'react-router-dom';
import './Interest.css';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

export default function Interest(props:any) {
    const { item , index } = props;
    const history = useHistory();

    function LinkItemData() {
        history.push(`/app/product?product_id=${item._id}`);
    }

    return (
        <div className="interest-card" onClick={LinkItemData}>
            <div className="interest-photo-card" style={{ backgroundImage: `url(${item.pictures[0]})`}}>
                <StarRoundedIcon className="star"/>
            </div>
                <div className="interest-text-card py-3">
                    <p>{item.name}</p>
                    <p className="desc item-desc">Some quick example</p>
                </div>  
        </div>
    );
};
