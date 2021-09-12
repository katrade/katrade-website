import { useState , useEffect} from 'react';

import MenuAccount from '../../templates/MenuAccount';

import profilePic from '../../pics/facebook.png';
import { useHistory } from 'react-router';
import useAuthorization from '../../hooks/useAuthorization';

interface IAccount {
    firstname: string
	lastname: string
    username: string
    password: string
	address: string
	email: string
	phoneNumber: string
	profilePic: string
	verifyEmail: number
	favourite: string
	followers: string[]
	following: string[]
	inventories: string[]
}

const defaultEmptyAccount: IAccount = {
    firstname: "",
	lastname: "",
    username: "",
    password: "",
	address: "",
	email: "",
	phoneNumber: "",
	profilePic: "",
	verifyEmail: 0,
	favourite: "",
	followers: [],
	following: [],
	inventories: [],
}

function Account() {

    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const [getUserData] = useAuthorization();
    const history = useHistory();

    useEffect(() => {
        async function init() {
            var userData = await getUserData();
            if (userData) {
                setAccount(userData);
            }
            else {
                console.clear();
                history.push('/app/signin');
            }
        }
        init();
    }, [])

    return (

        <div>
            <MenuAccount data={account}>
                <div className="bg-white row mx-auto mb-4" style={{width:"100%"}}>
                    
                    {/* ส่วนของรูปโปรไฟล์ */}
                    <div className="col-md-4 order-md-2 p-3">
                        <div className="d-flex justify-content-center mt-2 mb-3">
                            <img src={account.profilePic == "" ? "https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" : account.profilePic } style={{width:"150px",borderRadius:"50%"}}/>
                        </div>
                        <p className="m-0 d-flex justify-content-center">file size: Maximum 1 MB</p>
                        <p className="m-0 d-flex justify-content-center">supported files: .JPEG, .PNG</p>

                    </div>

                    {/* ส่วนของข้อมูล */}
                    <div className="col-md-8 order-md-1 p-3">
                        <h4 className="mb-4">Profile</h4>
                        <div className="row" style={{width:"100%"}}>
                            <p className="col-md-3">Username</p>
                            <p className="col-md-8 border border-secondary rounded-3 mx-3" style={{color:"black"}}>{account.username}</p>
                        </div>
                        <div className="row" style={{width:"100%"}}>
                            <p className="col-md-3">Firstname</p>
                            <p className="col-md-8 border border-secondary rounded-3 mx-3" style={{color:"black"}}>{account.firstname}</p>
                        </div>
                        <div className="row" style={{width:"100%"}}>
                            <p className="col-md-3">Lastname</p>
                            <p className="col-md-8 border border-secondary rounded-3 mx-3" style={{color:"black"}}>{account.lastname}</p>
                        </div>

                        <h4 className="mb-3 mt-4">Contact</h4>
                        <div className="row" style={{width:"100%"}}>
                            <p className="col-md-3">Email</p>
                            <p className="col-md-8 border border-secondary rounded-3 mx-3" style={{color:"black"}}>{account.email}</p>
                        </div>
                        <div className="row" style={{width:"100%"}}>
                            <p className="col-md-3">Mobile</p>
                            <p className="col-md-8 border border-secondary rounded-3 mx-3" style={{color:"black"}}>{account.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </MenuAccount>
        </div>
    );
}

export default Account;