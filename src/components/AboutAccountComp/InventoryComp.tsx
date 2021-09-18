import ItemBlock from '../../components/Account/ItemBlock';

export default function InventoryComp(data: any) {
    const inventoryData = data.data;
    var data;
    if(!inventoryData){
        data = inventoryData;
    }
    console.log(data);
    console.log(inventoryData);

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

    if(inventoryData){
        console.log(inventoryData.length)
        if(inventoryData.length == 0){
            return (
                <div className="bg-white row mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                    <div>
                        <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                        <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({fakeData.length})</h5>
                    </div>
                    <div>
                        <a href="/app/additem"><h5 className="text-center">คุณยังไม่มีสิ่งของเลย เพิ่มสิ</h5></a>
                    </div>
                </div>
            );
        }else{
            console.log(inventoryData)
            const fakeItemBlock = inventoryData.map((data:any, index:any) => {
                // return <p>Hello</p>
                // console.log(data)
                return <ItemBlock data={data} key={index} manage="no"/>;
            });
            return (
                <div>
                    <div className="bg-white row mx-auto mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                        <div>
                            <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                            <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({inventoryData.length})</h5>
                        </div>
                        <div>
                            {fakeItemBlock}
                        </div>
                    </div>
                </div>
            );
        }
    }else{
        return(
            <div>
                <h3>ยังไม่ไดข้อมูล</h3>
            </div>
        );
    }
}