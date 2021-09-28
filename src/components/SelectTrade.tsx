import { ContactsOutlined } from '@material-ui/icons';
import useAuthorization from '../hooks/useAuthorization';

export default function SelectTrade({onClose,array,detailItem} : any) {

    const { postMyReqeust } = useAuthorization();    
    function handleRequest(myIdItem:any){
        const dataArray = {
            userId2: detailItem.owner ,
            inventoryId1: myIdItem ,
            inventoryId2: detailItem._id ,
        }
        // console.log(dataArray);
        postMyReqeust(dataArray);
    }

    const listMyInventory = array.map((data:any,index:any) => {
        return (
            <div className="p-2">
                <div onClick={() => {
                    handleRequest(data._id);
                }} style={{border:"1px solid rgb(112, 112, 112)",borderRadius:"6px"}}>
                    <p className="m-0 px-3">{data.name}</p>
                </div>
            </div>
        );
    })


    return (
        <div className="position-fixed" style={{zIndex:99,top:"0",bottom:"0",right:"0",left:"0"}}>
            <div className="position-absolute" onClick={onClose} style={{backgroundColor:"rgba(0,0,0,0.1)",top:"0",bottom:"0",right:"0",left:"0"}} />
            <div className="position-relative bg-white rounded-3"  style={{width:"500px",height:"500px",margin:"auto",marginTop:"100px"}}>
                <p className="m-0 pt-2 text-center fs-3">Choose your item</p>
                <hr/>
                <div className="row">
                    <div className="col">
                        <p className="m-0 text-center">Match!!</p>
                    </div>
                    <div className="col">
                        <p className="m-0 text-center">All of your inventory</p>
                    </div>
                </div>
                <hr/>
                {listMyInventory}
            </div>
        </div>      
    );
}