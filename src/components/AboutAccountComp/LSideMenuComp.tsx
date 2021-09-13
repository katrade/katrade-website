import { BsPersonFill , BsBookmarkFill , BsStarFill , BsBagFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

function AccountMenu(props:any) {

    return (
        <div>
            <p className="d-flex align-items-center fs-4 fw-bold mb-0 text-dark"><BsPersonFill />&nbsp;&nbsp;My Account</p>
            <div className="mb-3 ms-4">
                <p onClick={() => props.ChangeComponent('Account')} style={{color:"black",fontSize:"20px",margin:"0"}}>Account</p>
                <p onClick={() => props.ChangeComponent('ChangePassword')} style={{color:"black",fontSize:"20px",margin:"0"}}>Change Password</p>
            </div>
            <p className="d-flex align-items-center fs-4 fw-bold mb-0 text-dark"><BsBookmarkFill />&nbsp;&nbsp;Follow</p>
            <div className="mb-3 ms-4">
                <p onClick={() => props.ChangeComponent('Following')} style={{color:"black",fontSize:"20px",margin:"0"}}>Following</p>
                <p onClick={() => props.ChangeComponent('Followers')} style={{color:"black",fontSize:"20px",margin:"0"}}>Followers</p>
            </div>
            <p onClick={() => props.ChangeComponent('Favorite')} className="d-flex align-items-center fs-4 fw-bold mb-3 text-dark"><BsStarFill />&nbsp;&nbsp;My Favorite</p>
            <p onClick={() => props.ChangeComponent('Inventory')} className="d-flex align-items-center fs-4 fw-bold mb-3 text-dark"><BsBagFill />&nbsp;&nbsp;Inventory</p>
            <p onClick={() => props.ChangeComponent('History')} className="d-flex align-items-center fs-4 fw-bold mb-3 text-dark"><BiHistory />&nbsp;&nbsp;History</p>
        </div>
    );
}

export default AccountMenu;