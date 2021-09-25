import MenuAccount from '../../templates/MenuAccount';
import FavoriteBlock from '../../components/Account/FavoriteBlock';


export default function Favorite() {

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
        return <FavoriteBlock data={data} key={index} manage="no" />;
    });

    return (
        <div>
            <MenuAccount>
                <div className="bg-white mb-3" style={{padding:"10px 30px 30px 30px"}}>
                    <div>
                        <h4 className="d-inline-block me-3">Favorite</h4>
                        <h5 className="d-inline-block" style={{ color: "#95bddfd5" }}>({listOfItem.length})</h5>
                    </div>
                    <div>
                        {item_data}
                    </div>
                </div>
            </MenuAccount>
        </div>
    );
}