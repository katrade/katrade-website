import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useAuthorization from '../../hooks/useAuthorization';
import { TransparentButton } from '../../components/standard/Button';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Block from '../../components/Block';
import Accountbar from "../../components/Account/Accountbar";
import LSideMenuComp from "../../components/AboutAccountComp/LSideMenuComp";

import AccountComp from '../../components/AboutAccountComp/AccountComp';
import ChangePassComp from '../../components/AboutAccountComp/ChangePassComp';
import FollowingComp from '../../components/AboutAccountComp/FollowingComp';
import FollowersComp from '../../components/AboutAccountComp/FollowersComp';
import FavoriteComp from '../../components/AboutAccountComp/FavoriteComp';
import InventoryComp from '../../components/AboutAccountComp/InventoryComp';
import HistoryComp from '../../components/AboutAccountComp/HistoryComp';

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

export default function AboutAccount() {

    const [ accountData , setAccountData ] = useState<IAccount>(defaultEmptyAccount);
    const [ componentPage , setComponentPage ] = useState<any>(); 
    const { getUserData , updateProfilePic } = useAuthorization();    
    const history = useHistory();

    useEffect(() => {
        async function init() {
            var userData = await getUserData();
            if (userData) {
                setAccountData(userData);
            }
            else {
                console.clear();
                history.push('/app/signin');
            }
        }
        init();
    }, [])
    const [ destComp , setDestComp ] = useState("Account");
    function SelectComp() {
        if(destComp === "Account"){
            setComponentPage(<AccountComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }else if(destComp === "ChangePassword"){
            setComponentPage(<ChangePassComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }else if(destComp === "Following"){
            setComponentPage(<FollowingComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }else if(destComp === "Followers"){
            setComponentPage(<FollowersComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }else if(destComp === "Favorite"){
            setComponentPage(<FavoriteComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }else if(destComp === "Inventory"){
            setComponentPage(<InventoryComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }else if(destComp === "History"){
            setComponentPage(<HistoryComp data={accountData}/>);
            console.log("เปลี่ยนหน้าเรียบร้อย");
        }
    }
    useEffect(() => {
        SelectComp();
    }, [destComp])

    return (
        <div>
            <Navbar image={accountData.profilePic} />
                <Block height="50" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar data={accountData}/>
                            <div className="d-flex">
                                <div style={{minWidth:"180px"}}>
                                    <LSideMenuComp ChangeComponent={(destComp:any) => setDestComp(destComp)}/>
                                </div>
                                <div style={{width:"100%"}}>
                                    {componentPage}
                                </div>

                            </div>
                        </div>
                    </div>
                </Block>
            <Footer/>
        </div>
    );
}