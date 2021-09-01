import './Favorite.css';

import MenuAccount from '../../templates/MenuAccount';
import ItemBlock from '../../components/Account/ItemBlock';
import FavoriteBlock from '../../components/Account/FavoriteBlock';


export default function Account() {
    
    let listOfItem = [
        {
        name: "gun",
        image: "https://source.unsplash.com/random?sig=1",
        tag: ["Weapon", "Fruit", "Shoes"],
        },
        {
        name: "Jacky",
        image: "https://source.unsplash.com/random?sig=1",
        tag: ["Human"],
        },
        {
        name: "เรือดำน้ำ",
        image: "https://source.unsplash.com/random?sig=1",
        tag: ["Weapon", "ยานพาหนะ", "Shoes"],
        },
        {
        name: "รถถัง",
        image: "https://source.unsplash.com/random?sig=1",
        tag: ["Weapon", "ของเล่น"],
        },
        {
        name: "gun",
        image: "https://source.unsplash.com/random?sig=1",
        tag: ["Weapon", "Fruit", "Shoes"],
        },
    ];

    const item_data = listOfItem.map((data, index) => {
        return <FavoriteBlock data={data} key={index} manage="no"/>;
    });

    return (
        <>
            <MenuAccount>
                <div className="container-favorite">
                    <div className="favotite-head">
                        <h4>Your Favorite<span className="span">({listOfItem.length})</span></h4>
                        
                    </div>
                    <div>
                        {item_data}
                    </div>
                    
                </div>
            </MenuAccount>
        </>
    );
}