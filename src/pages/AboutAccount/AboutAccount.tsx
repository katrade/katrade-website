import './AboutAccount.css';

import React , { useState, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom'

import { useHistory } from 'react-router';
import useAuthorization from '../../hooks/useAuthorization';
import { TransparentButton } from '../../components/standard/Button';
import ImageUploading, { ImageListType } from 'react-images-uploading';

// import NavbarSpare from '../../components/NavbarSpare';
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
import { getAllJSDocTagsOfKind } from 'typescript';
import useLoading from '../../hooks/useLoading';

const queryString = require('query-string');

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

function reducer(state:any, action:any) {
    if (action.type === "Account") {
        return { dest: "Account" };
    }else if (action.type === "ChangePassword") {
        return { dest: "ChangePassword" };
    }else if (action.type === "Following") {
        return { dest: "Following" };
    }else if (action.type === "Followers") {
        return { dest: "Followers" };
    }else if (action.type === "Favorite") {
        return { dest: "Favorite" };
    }else if (action.type === "Inventory") {
        return { dest: "Inventory" };
    }else if (action.type === "History") {
        return { dest: "History" };
    }
    return state;
}

type DestCompContextType = {
    destCompState: any,
    destCompDispatch: any,
}

const DestCompContext = React.createContext<DestCompContextType  | any >(null);

function AboutAccount(userData:any) {
    const { search } = useLocation();
    const { component } = queryString.parse(search);

    const [ destCompState, destCompDispatch] = useReducer(reducer, "");

    const { getUserData, 
        updateProfilePic, 
        getMyInventory, 
        getFavourite, 
        getFollow, 
        getUserIdArray, 
        getHistory } = useAuthorization();    
    const [ accountData, setAccountData ] = useState<IAccount>(defaultEmptyAccount);
    const [ favoriteData, setFavoriteData ] = useState<any>();
    const [ inventoryData, setInventoryData ] = useState<any>();
    const [ followData, setFollowData ] = useState<any>();
    const [ historyData, setHistoryData ] = useState<any>();
    const [ followingUserArrayData, setFollowingUserArrayData ] = useState<any>();
    const [ followerUserArrayData, setFollowerUserArrayData ] = useState<any>();
    const [show, hide] = useLoading();
    const history = useHistory();

    useEffect(() => {
        async function init() {
            show();
            var userData = await getUserData();
            var follow = await getFollow();
            if (userData) {
                setAccountData(userData);
                hide();
            }
            else {
                console.clear();
                history.push('/app/signin');
            }
            
            if (follow) {
                setFollowData(follow);
                var followingUserDataArray = await getUserIdArray(follow.following) 
                if (followingUserDataArray){
                    setFollowingUserArrayData(followingUserDataArray)
                }     
                var followerUserDataArray = await getUserIdArray(follow.follower)
                if (followerUserDataArray) {
                    setFollowerUserArrayData(followerUserDataArray)
                }
            }
            var inventory = await getMyInventory();
            if (inventory) {
                setInventoryData(inventory);
            }
            
            var favourite = await getFavourite();
            if (favourite) {
                setFavoriteData(favourite);
            }
            
            
            var history = await getHistory();
            if (history) {
                setHistoryData(history);
            }
        }
        init();
    }, [])

    const [ componentPage , setComponentPage ] = useState<any>(<AccountComp data={accountData}/>); 
    
    function SelectComp() {
        if(destCompState.dest === "Account"){
            setComponentPage(<AccountComp data={accountData}/>);
        }else if(destCompState.dest === "ChangePassword"){
            setComponentPage(<ChangePassComp data={accountData}/>);
        }else if(destCompState.dest === "Following"){
            setComponentPage(<FollowingComp data={followingUserArrayData}/>);
        }else if(destCompState.dest === "Followers"){
            setComponentPage(<FollowersComp data={followerUserArrayData}/>);
        }else if(destCompState.dest === "Favorite"){
            setComponentPage(<FavoriteComp data={favoriteData}/>);
        }else if(destCompState.dest === "Inventory"){
            setComponentPage(<InventoryComp data={inventoryData}/>);
        }else if(destCompState.dest === "History"){
            setComponentPage(<HistoryComp data={historyData} checkUser={accountData}/>);
        }
    }
    // จะเกิดการเปลี่ยนแปลง component ก็ต่อเมื่อมีการเปลี่ยนแปลงของ destComp
    useEffect(() => {
        SelectComp();
    }, [destCompState])
    // จะเกิดการรีเซ็ตเป็นหน้าข้อมูลaccount ก็ต่อเมื่อข้อมูลaccount มีการอัพเดท
    useEffect(() => {
        if(component == "account" || component == undefined ){
            setComponentPage(<AccountComp data={accountData}/>);
        }else if(component == "following"){
            setComponentPage(<FollowingComp data={followingUserArrayData}/>);
        }else if(component == "followers"){
            setComponentPage(<FollowersComp data={followerUserArrayData}/>);
        }else if(component == "favorite"){
            setComponentPage(<FavoriteComp data={favoriteData}/>);
        }else if(component == "inventory"){
            setComponentPage(<InventoryComp data={inventoryData}/>);
        }else if(component == "history"){
            setComponentPage(<HistoryComp data={historyData}/>);
        }
    }, [accountData,favoriteData,inventoryData])

    return (
        <DestCompContext.Provider value={{ destCompState , destCompDispatch }}>
        <div>
            <Navbar image={accountData.profilePic} handleComponent={(c:any) => console.log(c)} />
                <Block height="50" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar accountData={accountData} followData={followData}/>
                            <div className="d-flex">
                                <div className="MobileMode" style={{minWidth:"180px"}}>
                                    <LSideMenuComp/>
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
        </DestCompContext.Provider>

    );
}

export { DestCompContext };
export default AboutAccount;