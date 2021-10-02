import { useHistory } from 'react-router-dom';
import './Interest.css';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import P from './standard/P';

import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';

export default function Interest(props: any) {
    const { item, index } = props;
    const history = useHistory();
    const { theme } = useContext(ThemeContext);
    function LinkItemData() {
        history.push(`/app/product?product_id=${item._id}`);
    }

    return (
        <div className={theme === "light" ? "interest-card" : "interest-card-dark"} onClick={LinkItemData}>
            <div className="interest-photo-card" style={{ backgroundImage: `url(${item.pictures[0]})` }}>
                <StarRoundedIcon className="star" />
            </div>
            <div className="interest-text-card pt-3">
                <P>{item.name}</P>
                <P className="desc item-desc text-truncate">{item.detail}</P>
            </div>
            <div className="text-end px-2">
                <p style={{ color: "#00b34a", fontSize: "16px"}}>{item.username}</p>
            </div>
        </div>
    );
};
