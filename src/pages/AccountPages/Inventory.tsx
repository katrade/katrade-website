import MenuAccount from '../../templates/MenuAccount';

import './Inventory.css';

import ItemBlock from '../../components/Account/ItemBlock';
import { CgPlayListAdd } from 'react-icons/cg';

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
        return <ItemBlock data={data} key={index} manage="no"/>;
    });

    return (
        <>
            <MenuAccount>
                <div className="container-inventory">
                    <div className="inventory-head">
                        <h4>Your items<span className="span">({listOfItem.length})</span></h4>
                        <a href="/app/manageInventory">Manage Inventory<CgPlayListAdd /></a>
                    </div>
                    <div className="data-inventory">
                        {item_data}
                    </div>
                </div>
            </MenuAccount>
        </>
    );
}