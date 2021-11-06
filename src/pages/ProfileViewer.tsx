import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router";

import useAuthorization from '../hooks/useAuthorization';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import Recommend from '../components/Recommend';
import Interest from '../components/Interest';

import { BsFillChatDotsFill } from 'react-icons/bs';

const queryString = require('query-string');

// function getRandomInt(max: number) {
//     return Math.floor(Math.random() * max);
// }

export default function ProfileViewer() {

    const { search } = useLocation();
    const { user_id } = queryString.parse(search);
    const history = useHistory();

    const { getAnotherUser, getUserFollowData, getAnotherInventory } = useAuthorization(); 
    
    const [ anotherUserData , setAnotherUserData ] = useState<any>(null);
    const [ followData , setFollowData ] = useState<any>();
    const [ anotherInventoryData , setAnotherInventoryData ] = useState<any>([]);

    useEffect(() => {
        async function init() {
            var dataOwner = await getAnotherUser(user_id);
            if (dataOwner) {
                setAnotherUserData(dataOwner);
                var getFollowerData = await getUserFollowData(user_id)  
                if (getFollowerData) {
                    setFollowData(getFollowerData)
                }
                var getInventoryById = await getAnotherInventory(user_id)
                if (getInventoryById) {
                    setAnotherInventoryData(getInventoryById)
                }
            }
        }
        init();
    }, [])

    if(anotherUserData && followData && anotherInventoryData) {
        const inventory_item = anotherInventoryData.map((item:any, index:any) => {
            return <Interest item={item} key={index} />; // ขออนุญาตให้อันนี้แปปนะเภอ เภอน่าจะกำลังทำ match อยู่ใช่ไหมครับ
            // return <Recommend item={item} key={index} />; //
        });

        return (
            <div>
                <Navbar />
                <Block height="auto" backgroundColor="#f7fafc">
                    {/* ส่วนของข้อมูลผู้ใช้ */}
                    <div className="container-profile">
                        <div className="container-profile-data">
                            <div className="full-width d-flex justify-content-center align-items-center p-5 flex-wrap">
                                <div className="d-flex justify-content-center align-items-center mt-2 mb-3">
                                    {/* <img className="rounded-circle" src={anotherUserData.profilePic} style={{ width: "130x", height: "130px", borderRadius:"50%", margin:"0 50px" }} /> */}
                                    {/* <div style={{
                                        backgroundImage: `${anotherUserData.profilePic}`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        minWidth: '130px',
                                        minHeight: '130px',
                                        borderRadius: '50%',
                                        margin: '0px 50px',
                                    }}></div> */}
                                    <div style={{
                                        minWidth: "130px",
                                        minHeight: "130px",
                                        backgroundImage: `url(${anotherUserData.profilePic})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: "50%",
                                        backgroundPosition: "center",
                                        margin:"0 50px"
                                    }}>
                                        
                                    </div>
                                </div>
                                <div >
                                    <h3 style={{ color: "#4a5659" }}>{anotherUserData.firstname} {anotherUserData.lastname}</h3>
                                    <div className="d-flex">
                                        <p style={{ color: "#86979c", fontSize:"26px" }}>@{anotherUserData.username}</p>
                                        <div className="d-flex justify-content-center align-items-center ms-3 pointer"
                                            onClick={() => history.push(`/app/chat?duo_id=${anotherUserData._id}&duo_username=${anotherUserData.username}`)} 
                                            style={{backgroundColor:"#15C777", borderRadius:"10px", width:"100px"}}>
                                            <p className="mb-0 me-2 text-white">Chat</p>
                                            <BsFillChatDotsFill style={{color:"white"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="full-width d-flex justify-content-center align-items-center px-5 mb-3 flex-wrap">
                                <div className="d-flex justify-content-center align-items-center followers mx-2 px-5 py-3 my-2">
                                    <b className="mx-2 number">{followData.follower.length} </b> followers
                                </div>
                                <div className="d-flex justify-content-center align-items-center following mx-2 px-5 py-3 my-2">
                                    <b className="mx-2 number">{followData.following.length} </b> following
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Inventory ของผู้ใช้ */}
                    <div className="my-4">
                        <h5 className="mb-3">Inventory</h5>
                        <hr></hr>
                        <div className="full-width">
                            <div>
                                <div className="d-flex flex-wrap">
                                    {inventory_item.length <= 10 ? inventory_item : inventory_item.slice(0, 10)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Block>
                <Footer />
            </div>
        )
    }else{
        return (
            <div>

            </div>
        );
    }



  
}
