import { useHistory } from 'react-router-dom';
import './Recommend.css';

function Recommend(props:any) {
    const { item, index } = props;

    const history = useHistory();
    function LinkItemData() {
        // โหมดเปลี่ยนภาษา ให้เปลี่ยนเป็น function ตัวนี้
        // history.push(`/${lang}/market`);

        history.push(`/app/market/${index}`);
    }

    console.log(index);

    return (
        <div className="recommend-card" onClick={LinkItemData}>
                <img className="recommend-photo-card" src={item.photo_src}/>
                <div className="recommend-text-card py-3">
                    <p>{item.name_item}</p>
                    <p className="desc item-desc">Some quick example</p>
                </div>  
        </div>
    );
};

export default Recommend;