import MenuAccount from '../../templates/MenuAccount';

import './ManageInventory.css';

import { AccountBlock } from '../../components/Account/AccountBlock';
import ItemBlock from '../../components/Account/ItemBlock';

import { BiCheck } from 'react-icons/bi';
import { GrAdd } from 'react-icons/gr';

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
        return <ItemBlock data={data} key={index} manage="yes"/>;
    });
    
    return (
        <>
            <MenuAccount>
                <div className="container-manage">
                    <h4>Manage Inventory</h4>
                    <p>save changes<BiCheck /></p>
                    <div className="data-manage">
                        <a href="#">
                            <AccountBlock padding="10px">
                                <div className="add-block">
                                    <br/>
                                    <p className="gr-add"><GrAdd /></p>
                                    <p className="add">Add</p>
                                </div>
                            </AccountBlock>
                        </a>
                        {item_data}
                    </div>
                </div>
            </MenuAccount>
        </>
    );
}