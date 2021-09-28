import ItemBlock from '../../components/Account/ItemBlock';

export default function InventoryComp(data: any) {
    const inventoryData = data.data;
    console.log(inventoryData);
    console.log(inventoryData);

    if(inventoryData){
        if(inventoryData.length == 0){
            return (
                <div className="bg-white row mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                    <div>
                        <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                        <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({inventoryData.length})</h5>
                    </div>
                    <div>
                        <a href="/app/additem"><h5 className="text-center">คุณยังไม่มีสิ่งของเลย เพิ่มสิ</h5></a>
                    </div>
                </div>
            );
        }else{
            // console.log(inventoryData)
            const myInventory = inventoryData.reverse().map((data:any, index:any) => {
                return <ItemBlock data={data} key={index} manage="no"/>;
            });
            return (
                <div>
                    <div className="bg-white mx-auto mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                                <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({inventoryData.length})</h5>
                            </div>
                            {/* <h5 className="d-flex" onClick={}>add item +</h5> */}
                            <a href="/app/additem" className="d-flex align-items-center"><h6>add item +</h6></a>
                        </div>
                        <div>
                            {myInventory}
                        </div>
                    </div>
                </div>
            );
        }
    }else{
        return(
            <div className="bg-white mb-4 p-3 text-center" style={{minHeight:"400px"}}>
                <h4 className="m-0">กำลังโหลดข้อมูล...</h4>
            </div>
        );
    }
}