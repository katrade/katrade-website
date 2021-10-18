import { Skeleton } from '@mui/material';
import { useState , useEffect } from 'react';
import ItemBlock from '../../components/Account/ItemBlock';

export default function InventoryComp(data: any) {
    const inventoryData:any = data.data;
    const [ inventoryLenght, setInventoryLenght ] = useState<any>();

    useEffect(() => {
        if(inventoryData){
            setInventoryLenght(inventoryData.length);
        }
    }, [inventoryData])

    function handleInventoryLength() {
        setInventoryLenght(inventoryLenght - 1);
    } 

    if(inventoryData){
        if(inventoryData.length == 0){
            return (
                <div className="bg-white row mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                    <div>
                        <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                        <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({inventoryLenght})</h5>
                    </div>
                    <div>
                        <a href="/app/additem"><h5 className="text-center">คุณยังไม่มีสิ่งของเลย เพิ่มสิ</h5></a>
                    </div>
                </div>
            );
        }else{
            const myInventory = inventoryData.reverse().map((data:any, index:any) => {
                return <ItemBlock data={data} key={index} manage="no" Noti={() => handleInventoryLength()}/>;
            });
            return (
                <div>
                    <div className="bg-white mx-auto mb-4 p-3" style={{ width:"100%", minHeight:"400px"}}>
                        <div className="d-flex justify-content-between" style={{padding:"0 12px"}}>
                            <div>
                                <h4 className="d-inline-block me-3 mb-4">Inventory</h4>
                                <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({inventoryLenght})</h5>
                            </div>
                            <a href="/app/additem" className="d-flex align-items-center"><h6>add item +</h6></a>
                        </div>
                        <div style={{padding:"0 12px"}}>
                            {myInventory}
                        </div>
                    </div>
                </div>
            );
        }
    }else{
        return(
            <div className="bg-white mb-4 p-3 text-center" style={{minHeight:"400px"}}>
                <Skeleton variant="rectangular" height={80} sx={{ margin: "40px 0", width: "100%", borderRadius: "10px"}} />
                <Skeleton variant="rectangular" height={80} sx={{ margin: "40px 0", width: "100%", borderRadius: "10px"}} />
                <Skeleton variant="rectangular" height={80} sx={{ margin: "40px 0", width: "100%", borderRadius: "10px"}} />
                <Skeleton variant="rectangular" height={80} sx={{ margin: "40px 0", width: "100%", borderRadius: "10px"}} />
            </div>
        );
    }
}