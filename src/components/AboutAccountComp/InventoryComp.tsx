import ItemBlock from '../../components/Account/ItemBlock';

export default function InventoryComp(data: any) {
    const accountData = data.data;
    const fakeData = [
        {
            name: "fakeData",
            image: "https://source.unsplash.com/random?sig=1",
            tag: ["Weapon", "Fruit", "Shoes"],
        },
        {
            name: "fakeData",
            image: "https://source.unsplash.com/random?sig=1",
            tag: ["Human"],
        },
        {
            name: "fakeData",
            image: "https://source.unsplash.com/random?sig=1",
            tag: ["Weapon", "ยานพาหนะ", "Shoes"],
        },
        {
            name: "fakeData",
            image: "https://source.unsplash.com/random?sig=1",
            tag: ["Weapon", "ของเล่น"],
        },
        {
            name: "fakeData",
            image: "https://source.unsplash.com/random?sig=1",
            tag: ["Weapon", "Fruit", "Shoes"],
        },
    ]

    const fakeItemBlock = fakeData.map((data, index) => {
        return <ItemBlock data={data} key={index} manage="no"/>;
    });

    return (
        <div>
            <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                <div>
                    <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                    <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({accountData.inventories.length})</h5>
                </div>
                <div>
                    {fakeItemBlock}
                </div>
            </div>
        </div>
    );
}