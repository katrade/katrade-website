import { useHistory } from 'react-router-dom';
import './Interest.css';
import StarIcon from '@material-ui/icons/Star';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

export default function Interest(props:any) {
    const { item, index } = props;

    const history = useHistory();
    function LinkItemData() {
        // โหมดเปลี่ยนภาษา ให้เปลี่ยนเป็น function ตัวนี้
        // history.push(`/${lang}/market`);

        history.push(`/app/market/${index}`);
    }

    return (
        <div className="interest-card" onClick={LinkItemData}>
            <div className="interest-photo-card" style={{ backgroundImage: `url(${item.photo_src})`}}>
                <StarRoundedIcon className="star"/>
            </div>
                <div className="interest-text-card py-3">
                    <p>{item.name_item}</p>
                    <p className="desc item-desc">Some quick example</p>
                </div>  
        </div>
    );
};
