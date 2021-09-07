import { useState , useEffect} from 'react';

import MenuAccount from '../../templates/MenuAccount';

import profilePic from '../../pics/facebook.png';

function Account() {

    const account = {
        username: "FranKydeSU",
        firstname: "Napasin",
        lastname: "Saengthong",
        following: "1066",
        followers: "2",
        email: "frankydesu@hotmail.com",
        mobile: "08********",
    }

    const [mobile, setMobile] = useState(false);

    window.addEventListener("resize", resize);
    // resize();
    function resize() {

        if (window.innerWidth < 600) {
            if (mobile) {
                return
            }
            return setMobile(true) 
        }
        else {
            if (!mobile) {
                return
            }
            return setMobile(false)
        }
    }

    useEffect(() => {
        resize();
    }, [])

    if (mobile) {
        return <AccountMobile data={account}/>
    }

    return (

        <div>
            <MenuAccount>
                <div className="d-flex flex-wrap-reverse bg-white" style={{padding:"10px 30px 30px 30px"}}>
                    <div className="pe-3 bg-white" style={{width:"70%"}} >
                            <div>
                                <h4 className="mb-4">Account</h4>
                                <div className="d-flex justify-content-between" >
                                    <p className="d-flex flex-wrap me-3" >Username</p>
                                    <p className="px-3 border border-secondary rounded-3" style={{width:"400px", color:"black"}}>{account.username}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="me-3">Firstname</p>
                                    <p className="px-3 border border-secondary rounded-3" style={{width:"400px", color:"black"}}>{account.firstname}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="me-3">Lastname</p>
                                    <p className="px-3 border border-secondary rounded-3" style={{width:"400px", color:"black"}}>{account.lastname}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="">Contact</h4>
                                <div className="d-flex justify-content-between">
                                    <p className="me-3">Email Address</p>
                                    <p className="" style={{width:"400px", color:"black"}}>{account.email}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="me-3">Mobile</p>
                                    <p className="" style={{minWidth:"400px",maxWidth:"400px", color:"black"}}>{account.mobile}</p>
                                </div>
                            </div>
                    </div>
                    <div className="ms-5" style={{width:"200px"}}>
                        <div>
                            <div className="d-flex justify-content-center mt-2">
                                <img src={profilePic} style={{width:"150px"}}/>
                            </div>
                            <div>
                                <p>file size: Maximum 1 MB</p>
                                <p>supported files: .JPEG, .PNG</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MenuAccount>
        </div>
    );
}

function AccountMobile({data}:any) {
    return (
        <div>
            <MenuAccount>
                <div className="bg-white mb-3">
                    <div>
                        <div className=" d-flex justify-content-center">
                            <img src={profilePic} className="mt-3" style={{width:"150px"}}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="m-0">file size: Maximum 1 MB</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="m-0">supported files: .JPEG, .PNG</p>
                        </div>
                    </div>
                    <div className="px-3" style={{width:"100%"}} >
                        <div>
                            <h4 className="mb-4">Account</h4>
                            <div className="d-flex justify-content-between" >
                                <p className="me-4" >Username</p>
                                <p className="px-3 border border-secondary rounded-3" style={{width:"400px", color:"black"}}>{data.username}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="me-4">Firstname</p>
                                <p className="px-3 border border-secondary rounded-3" style={{width:"400px", color:"black"}}>{data.firstname}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="me-4">Lastname</p>
                                <p className="px-3 border border-secondary rounded-3" style={{width:"400px", color:"black"}}>{data.lastname}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="">Contact</h4>
                            <div className="d-flex justify-content-between">
                                <p className="me-4">Email Address</p>
                                <p className="px-3" style={{width:"400px", color:"black"}}>{data.email}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="me-4">Mobile</p>
                                <p className="px-3" style={{minWidth:"400px",maxWidth:"400px", color:"black"}}>{data.mobile}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MenuAccount>
        </div>
    );
}

export default Account;